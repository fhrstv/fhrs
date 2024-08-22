const apiKey = 'cf64a661774f647b7513facb9f1e55e5';
let allShows = [];
let hideTimeout;
let shows = [];
let currentIndex = 0;
let displayedShows = [];

// بحث عن المسلسلات
async function searchShows(query) {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching data from TMDB', error);
        return [];
    }
}

// ترتيب المسلسلات
function sortShows(shows, query) {
    const lowerCaseQuery = query.toLowerCase();

    return shows.sort((a, b) => {
        const aTitle = a.name.toLowerCase();
        const bTitle = b.name.toLowerCase();

        const aExactMatch = aTitle === lowerCaseQuery;
        const bExactMatch = bTitle === lowerCaseQuery;

        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;

        return b.popularity - a.popularity;
    });
}

// تحديث قائمة المسلسلات
function updateShowList(shows, query) {
    const sortedShows = sortShows(shows, query);
    const showList = document.querySelector('.movie-list');
    showList.innerHTML = '';

    sortedShows.forEach(show => {
        const showItem = document.createElement('li');
        showItem.className = 'movie-item';
        showItem.style.display = 'flex';
        showItem.style.alignItems = 'center';
        showItem.style.justifyContent = 'space-between';

        const poster = document.createElement('img');
        poster.src = show.poster_path ? `https://image.tmdb.org/t/p/w92${show.poster_path}` : 'default_poster.png';
        poster.alt = `${show.name} Poster`;
        poster.style.width = '75px';
        poster.style.height = '100px';
        poster.style.marginLeft = '10px';

        const showText = document.createElement('span');
        showText.textContent = `${show.name || 'Unnamed Show'} (${new Date(show.first_air_date).getFullYear() || ''})`;
        showText.style.flexGrow = '1';
        showText.style.textAlign = 'center';

        showItem.appendChild(showText);
        showItem.appendChild(poster);
        showItem.dataset.id = show.id;

        showItem.addEventListener('click', () => {
            window.location.href = `watch_serie?tmdb_id=${show.id}`;
        });

        showList.appendChild(showItem);
    });

    showList.style.display = sortedShows.length ? 'block' : 'none';
    showList.scrollTop = 0;
}

// البحث عند الكتابة في مربع البحث
document.getElementById('search-input').addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    if (hideTimeout) clearTimeout(hideTimeout);
    if (query.length > 0) {
        allShows = await searchShows(query);
        updateShowList(allShows, query);
        document.querySelector('.movie-list').style.display = 'block';
    } else {
        hideTimeout = setTimeout(() => {
            document.querySelector('.movie-list').style.display = 'none';
        }, 200);
    }
});

// إخفاء القائمة عند النقر خارجها
document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('search-input');
    const showList = document.querySelector('.movie-list');

    if (!searchInput.contains(event.target) && !showList.contains(event.target)) {
        hideTimeout = setTimeout(() => {
            showList.style.display = 'none';
        }, 200);
    }
});

// تحديث حالة الأزرار
function updateButtonStates() {
    document.getElementById('prev-button').disabled = false;
    document.getElementById('next-button').disabled = false;
}

// الانتقال إلى اليسار
document.getElementById('prev-button').addEventListener('click', () => {
    if (shows.length > 1) {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = shows.length - 1;
        }
        updatePoster(shows[currentIndex]);
        updateButtonStates();
    }
});

// الانتقال إلى اليمين
document.getElementById('next-button').addEventListener('click', () => {
    if (shows.length > 1) {
        currentIndex++;
        if (currentIndex >= shows.length) {
            currentIndex = 0;
        }
        updatePoster(shows[currentIndex]);
        updateButtonStates();
    }
});

// تحديث البوستر
function updatePoster(show) {
    document.getElementById('current-poster').src = `https://image.tmdb.org/t/p/w500/${show.poster_path}`;
    document.getElementById('movie-title').textContent = show.name;
    document.getElementById('movie-year').textContent = show.first_air_date ? show.first_air_date.split('-')[0] : 'غير متوفر';

    const rank = shows.indexOf(show) + 1;
    document.getElementById('poster-rank').textContent = `المرتبة : ${rank}`;

    document.getElementById('current-poster').addEventListener('click', () => {
        const tmdbId = show.id;
        const url = `watch_show?tmdb_id=${tmdbId}`;
        window.location.href = url;
    });
}

// جلب المسلسلات الشعبية
async function fetchPopularShows() {
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