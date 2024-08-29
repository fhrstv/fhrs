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

function updateShowList(shows, query) {
    const sortedShows = sortShows(shows, query);
    const showList = document.querySelector('.movie-list');
    showList.innerHTML = '';

    sortedShows.forEach(show => {
        const showItem = document.createElement('li');
        showItem.className = 'movie-item'; // يمكن تغيير الاسم إلى 'show-item' إذا كنت تريد التفرقة
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

let inputTimeout; // تعريف متغير لتخزين الـ timeout

document.getElementById('search-input').addEventListener('input', async (event) => {
    clearTimeout(inputTimeout); // إلغاء أي timeout سابق
    const query = event.target.value.trim();
    
    inputTimeout = setTimeout(async () => { // إنشاء timeout جديد
        if (query.length > 0) {
            allShows = await searchShows(query); // تغيير "searchMovies" إلى "searchShows"
            updateShowList(allShows, query); // تغيير "updateMovieList" إلى "updateShowList"
            document.querySelector('.movie-list').style.display = 'block';
        } else {
            // إذا كان مربع البحث فارغًا، إخفاء القائمة المنسدلة
            document.querySelector('.movie-list').style.display = 'none';
            allShows = [];
        }
    }, 300); // تأخير لمدة 300 مللي ثانية (يمكنك تعديلها حسب الحاجة)
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
        const url = `watch_serie?tmdb_id=${tmdbId}`;
        window.location.href = url;
    });
}

// جلب المسلسلات التي تُعرض اليوم
async function fetchAiringTodayShows() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US`);
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

window.onload = async () => {
    // قم بإزالة .html من جميع الروابط في الصفحة
    document.querySelectorAll('a').forEach(anchor => {
        anchor.href = anchor.href.replace('.html', '');
    });

    fetchAiringTodayShows(); // استدعاء الوظيفة الجديدة لجلب المسلسلات المعروضة اليوم
    displayShows();
};

// وظيفة لتحديث قائمة المسلسلات (تأكد من أنها متوافقة مع المسلسلات)
function displayShows() {
    // تأكد من تكامل هذه الوظيفة مع طريقة العرض الحالية
}