const apiKey = 'cf64a661774f647b7513facb9f1e55e5';
let hideTimeout;
let searchTimeout;
let popularMovies = [];

async function searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching data from TMDB', error);
        return [];
    }
}

async function fetchPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&region=US`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        popularMovies = data.results || [];
        updateMovieList(popularMovies, '');
    } catch (error) {
        console.error('Error fetching popular movies', error);
    }
}

function sortMovies(movies, query) {
    const lowerCaseQuery = query.toLowerCase();
    return movies.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aExactMatch = aTitle === lowerCaseQuery;
        const bExactMatch = bTitle === lowerCaseQuery;

        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;

        return b.popularity - a.popularity;
    });
}

function updateMovieList(movies, query) {
    const sortedMovies = sortMovies(movies, query);
    const movieList = document.querySelector('.movie-list');
    movieList.innerHTML = '';

    sortedMovies.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.className = 'movie-item';
        movieItem.style.display = 'flex';
        movieItem.style.alignItems = 'center';
        movieItem.style.justifyContent = 'space-between';

        const poster = document.createElement('img');
        poster.src = movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'default_poster.png';
        poster.alt = `${movie.title} Poster`;
        poster.style.width = '75px';
        poster.style.height = '100px';
        poster.style.marginLeft = '10px';

        const movieText = document.createElement('span');
        movieText.textContent = `${movie.title || 'Unnamed Movie'} (${new Date(movie.release_date).getFullYear() || ''})`;
        movieText.style.flexGrow = '1';
        movieText.style.textAlign = 'center';

        movieItem.appendChild(movieText);
        movieItem.appendChild(poster);
        movieItem.dataset.id = movie.id;

        movieItem.addEventListener('click', () => {
            window.location.href = `watch_movie?tmdb_id=${movie.id}`;
        });

        movieList.appendChild(movieItem);
    });

    movieList.style.display = sortedMovies.length ? 'block' : 'none';
    movieList.scrollTop = 0;
}

function debounce(func, delay) {
    return function(...args) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => func.apply(this, args), delay);
    };
}

document.getElementById('search-input').addEventListener('input', debounce(async (event) => {
    const query = event.target.value.trim();
    if (hideTimeout) clearTimeout(hideTimeout);
    if (query.length > 0) {
        const allMovies = await searchMovies(query);
        updateMovieList(allMovies, query);
        document.querySelector('.movie-list').style.display = 'block';
    } else {
        hideTimeout = setTimeout(() => {
            updateMovieList(popularMovies, '');  // عرض أحدث الأفلام الشعبية عند عدم وجود استعلام
        }, 200);
    }
}, 300));

// إخفاء القائمة عند النقر خارجها
document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('search-input');
    const movieList = document.querySelector('.movie-list');

    if (!searchInput.contains(event.target) && !movieList.contains(event.target)) {
        hideTimeout = setTimeout(() => {
            movieList.style.display = 'none';
        }, 200); 
    }
});

// جلب الأفلام الشعبية عند تحميل الصفحةasync function fetchPopularShows() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US`);
        if (!response.ok) throw new Error('فشل في جلب المسلسلات.');
        const data = await response.json();
        shows = data.results;
        if (shows.length > 0) {
            updatePoster(shows[0]);
            updateButtonStates();
        }
    } catch (error) {
        console.error('خطأ في جلب المسلسلات:', error);
    }
}

// جلب المسلسلات عند تحميل الصفحة
window.onload = async () => {
    fetchPopularShows();
    displayShows();
};

// وظيفة لتحديث قائمة المسلسلات (تأكد من أنها متوافقة مع المسلسلات)
function displayShows() {
    // تأكد من تكامل هذه الوظيفة مع طريقة العرض الحالية
}