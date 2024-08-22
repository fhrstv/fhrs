const apiKey = 'cf64a661774f647b7513facb9f1e55e5';
let allMovies = [];
let displayedMovies = [];

  async function searchMovies(query) {
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
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

// ترتيب أبجدي أولاً
const titleComparison = aTitle.localeCompare(bTitle);
if (titleComparison !== 0) {
    return titleComparison;
}

// ترتيب حسب السنة إذا كانت العناوين متساوية
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

// ارجاع موضع التمرير الى الاعلى بعد تحديث القائمة
movieList.scrollTop = 0;
}

document.addEventListener('click', function(event) {
const searchInput = document.getElementById('search-input');
const movieList = document.querySelector('.movie-list');

// تحقق إذا كان النقر خارج مربع البحث أو القائمة المنسدلة
if (!searchInput.contains(event.target) && !movieList.contains(event.target)) {
movieList.style.display = 'none';
}
});

document.getElementById('search-input').addEventListener('input', async (event) => {
const query = event.target.value.trim();
if (query.length > 0) {
allMovies = await searchMovies(query);
updateMovieList(allMovies, query);
} else {
document.querySelector('.movie-list').style.display = 'none';
}
});

async function fetchNowPlayingMovies() {
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to load now playing movies');
    }
    const data = await response.json();
    return data.results || [];
} catch (error) {
    console.error('Error fetching now playing movies', error);
    return [];
}
}

async function displayMovies() {
const movies = await fetchNowPlayingMovies();
const filmContainer = document.getElementById('film-container');
filmContainer.innerHTML = '';

for (const movie of movies) {
    const filmBox = document.createElement('div');
    filmBox.className = 'film-box';
    filmBox.dataset.tmdbId = movie.id;

    const releaseYear = new Date(movie.release_date).getFullYear();
    const filmTitle = document.createElement('span');
    filmTitle.textContent = `${movie.title || 'Unnamed Movie'} ${releaseYear || ''}`;
    filmBox.appendChild(filmTitle);

    filmBox.addEventListener('click', () => {
        window.location.href = `watch_movie?tmdb_id=${movie.id}`;
    });

    filmContainer.appendChild(filmBox);
}
}

window.onload = displayMovies;