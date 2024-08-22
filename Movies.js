const apiKey = 'cf64a661774f647b7513facb9f1e55e5';
let allMovies = [];
let hideTimeout;
let movies = [];
let currentIndex = 0;
let displayedMovies = [];


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

// البحث عند الكتابة في مربع البحث
document.getElementById('search-input').addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    if (hideTimeout) clearTimeout(hideTimeout);
    if (query.length > 0) {
        allMovies = await searchMovies(query);
        updateMovieList(allMovies, query);
        document.querySelector('.movie-list').style.display = 'block';
    } else {
        hideTimeout = setTimeout(() => {
            document.querySelector('.movie-list').style.display = 'none';
        }, 200); // تأخير اختفاء القائمة قليلاً للسماح بتحديث البيانات
    }
});

// إخفاء القائمة عند النقر خارجها
document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('search-input');
    const movieList = document.querySelector('.movie-list');

    if (!searchInput.contains(event.target) && !movieList.contains(event.target)) {
        hideTimeout = setTimeout(() => {
            movieList.style.display = 'none';
        }, 200); // تأخير اختفاء القائمة قليلاً للسماح بالنقر على عناصر القائمة
    }
});








// تحديث حالة الأزرار
function updateButtonStates() {
    document.getElementById('prev-button').disabled = false;
    document.getElementById('next-button').disabled = false;
}

// الانتقال إلى اليسار
document.getElementById('prev-button').addEventListener('click', () => {
    if (movies.length > 1) {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = movies.length - 1;
        }
        updatePoster(movies[currentIndex]);
        updateButtonStates();
    }
});

// الانتقال إلى اليمين
document.getElementById('next-button').addEventListener('click', () => {
    if (movies.length > 1) {
        currentIndex++;
        if (currentIndex >= movies.length) {
            currentIndex = 0;
        }
        updatePoster(movies[currentIndex]);
        updateButtonStates();
    }
});

// تحديث البوستر
function updatePoster(movie) {
    document.getElementById('current-poster').src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-year').textContent = movie.release_date ? movie.release_date.split('-')[0] : 'غير متوفر';

    const rank = movies.indexOf(movie) + 1;
    document.getElementById('poster-rank').textContent = `المرتبة : ${rank}`;

    document.getElementById('current-poster').addEventListener('click', () => {
        const tmdbId = movie.id;
        const url = `watch.html?tmdbId=${tmdbId}`;
        window.location.href = url;
    });
}

// جلب الأفلام المتاحة حاليًا
async function fetchNowPlayingMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en`);
        if (!response.ok) throw new Error('فشل في جلب الأفلام.');
        const data = await response.json();
        movies = data.results;
        if (movies.length > 0) {
            updatePoster(movies[0]);
            updateButtonStates();
        }
    } catch (error) {
        console.error('خطأ في جلب الأفلام:', error);
    }
}

// جلب الأفلام عند تحميل الصفحة
window.onload = async () => {
    fetchNowPlayingMovies();
    displayMovies();
};


function sortMovies(movies, query) {
    const lowerCaseQuery = query.toLowerCase();
    return movies.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aExactMatch = aTitle === lowerCaseQuery;
        const bExactMatch = bTitle === lowerCaseQuery;

        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;

        const titleComparison = aTitle.localeCompare(bTitle);
        if (titleComparison !== 0) {
            return titleComparison;
        }

        const aYear = a.release_date ? new Date(a.release_date).getFullYear() : 0;
        const bYear = b.release_date ? new Date(b.release_date).getFullYear() : 0;
        return aYear - bYear;
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