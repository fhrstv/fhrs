const apiKey = 'cf64a661774f647b7513facb9f1e55e5';
let allTVShows = [];
let displayedTVShows = [];
let debounceTimer;

async function searchTVShows(query) {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching data from TMDB', error);
        return [];
    }
}

function sortTVShows(tvShows, query) {
    const lowerCaseQuery = query.toLowerCase();

    return tvShows.sort((a, b) => {
        const aTitle = a.name.toLowerCase();
        const bTitle = b.name.toLowerCase();

        const aExactMatch = aTitle === lowerCaseQuery;
        const bExactMatch = bTitle === lowerCaseQuery;

        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;

        // Sorting alphabetically first
        const titleComparison = aTitle.localeCompare(bTitle);
        if (titleComparison !== 0) {
            return titleComparison;
        }

        // Sorting by year if titles are the same
        const aYear = a.first_air_date ? new Date(a.first_air_date).getFullYear() : 0;
        const bYear = b.first_air_date ? new Date(b.first_air_date).getFullYear() : 0;
        return aYear - bYear;
    });
}

function updateTVShowList(tvShows, query) {
    const sortedTVShows = sortTVShows(tvShows, query);
    const tvShowList = document.querySelector('.movie-list');
    tvShowList.innerHTML = '';

    sortedTVShows.forEach(show => {
        const tvShowItem = document.createElement('li');
        tvShowItem.className = 'movie-item';
        tvShowItem.style.display = 'flex';
        tvShowItem.style.alignItems = 'center';
        tvShowItem.style.justifyContent = 'flex-start'; // Align items to the start

        const poster = document.createElement('img');
        poster.src = show.poster_path ? `https://image.tmdb.org/t/p/w92${show.poster_path}` : 'default_poster.png';
        poster.alt = `${show.name} Poster`;
        poster.style.width = '75px';
        poster.style.height = '100px';
        poster.style.marginLeft = '10px'; // Margin between text and poster

        const showText = document.createElement('span');
        showText.textContent = `${show.name || 'Unnamed Show'} (${new Date(show.first_air_date).getFullYear() || ''})`;
        showText.style.flexGrow = '1';
        showText.style.textAlign = 'center';

        tvShowItem.appendChild(showText);
        tvShowItem.appendChild(poster); // Append poster last to align it to the right
        tvShowItem.dataset.id = show.id;

        tvShowItem.addEventListener('click', () => {
            window.location.href = `watch_serie?tmdb_id=${show.id}`;
        });

        tvShowList.appendChild(tvShowItem);
    });

    tvShowList.style.display = sortedTVShows.length ? 'block' : 'none';
    tvShowList.scrollTop = 0;
}

function debounce(func, delay) {
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}

document.getElementById('search-input').addEventListener('input', debounce(async (event) => {
    const query = event.target.value.trim();
    const tvShowList = document.querySelector('.movie-list');

    if (query.length > 0) {
        allTVShows = await searchTVShows(query);
        updateTVShowList(allTVShows, query);
        tvShowList.style.display = 'block'; // Show dropdown list when text is entered
    } else {
        tvShowList.style.display = 'none'; // Hide dropdown list when text is cleared
    }
}, 300)); // Adjust debounce delay if necessary

document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('search-input');
    const tvShowList = document.querySelector('.movie-list');

    // Check if click is outside search input or dropdown list
    if (!searchInput.contains(event.target) && !tvShowList.contains(event.target)) {
        tvShowList.style.display = 'none';
    }
});

async function fetchLatestTVShows() {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to load latest TV shows');
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching latest TV shows', error);
        return [];
    }
}

async function displayLatestTVShows() {
    const tvShows = await fetchLatestTVShows();
    const filmContainer = document.getElementById('film-container');
    filmContainer.innerHTML = '';

    for (const show of tvShows) {
        const filmBox = document.createElement('div');
        filmBox.className = 'film-box';
        filmBox.dataset.tmdbId = show.id;

        const releaseYear = new Date(show.first_air_date).getFullYear();
        const filmTitle = document.createElement('span');
        filmTitle.textContent = `${show.name || 'Unnamed Show'} ${releaseYear || ''}`;
        filmBox.appendChild(filmTitle);

        filmBox.addEventListener('click', () => {
            window.location.href = `watch_serie?tmdb_id=${show.id}`;
        });

        filmContainer.appendChild(filmBox);
    }
}

window.onload = displayLatestTVShows;
