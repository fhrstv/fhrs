// انتظر حدوث الحدث "input" على مربع البحث
document.getElementById("searchInput").addEventListener("input", function () {
    // الحصول على قيمة مربع البحث
    var searchTerm = this.value.toLowerCase();
    
    // الحصول على قائمة الأفلام
    var movieList = document.getElementsByClassName("movie-item");

    // عرض أو إخفاء الأفلام بناءً على البحث
    for (var i = 0; i < movieList.length; i++) {
        var movieName = movieList[i].innerText.toLowerCase();
        if (movieName.includes(searchTerm)) {
            movieList[i].style.display = "block"; // إظهار العنصر
        } else {
            movieList[i].style.display = "none"; // إخفاء العنصر
        }
    }
});




// القائمة المكونة من الأخبار
var newsList = [
  "خبر 1: هذا هو الخبر الأول",
  "خبر 2: هذا هو الخبر الثاني",
  "خبر 3: هذا هو الخبر الثالث",
  // يمكنك إضافة المزيد من الأخبار هنا
];

// متغير لتتبع الخبر الحالي
var currentNewsIndex = 0;

// عرض الخبر الأول عند بدء التحميل
showCurrentNews();

// انتظر حدوث الحدث "input" على مربع البحث
document.getElementById("searchInput").addEventListener("input", function () {
    // الحصول على قيمة مربع البحث
    var searchTerm = this.value.toLowerCase();

    // الحصول على العناصر الخاصة بالأخبار
    var newsBox = document.getElementById("newsBox");

    // عرض أو إخفاء الأخبار بناءً على البحث
    if (newsList[currentNewsIndex].toLowerCase().includes(searchTerm)) {
        newsBox.style.display = "block"; // إظهار العنصر
    } else {
        newsBox.style.display = "none"; // إخفاء العنصر
    }
});

// عرض الخبر الحالي
function showCurrentNews() {
    var newsBox = document.getElementById("newsBox");
    newsBox.innerText = newsList[currentNewsIndex];
}

// التبديل بين الأخبار
document.getElementById("nextNewsButton").addEventListener("click", function () {
    // زيادة الفهرس لعرض الخبر التالي
    currentNewsIndex = (currentNewsIndex + 1) % newsList.length;
    showCurrentNews();
});









document.getElementById('randomButton').addEventListener('click', getRandomTitle);

function getRandomTitle() {
    const apiKey = 'cf64a661774f647b7513facb9f1e55e5'; // مفتاح API الخاص بك
    const page = Math.floor(Math.random() * 500) + 1; // TMDB يحتوي على 500 صفحة من الأفلام

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            const randomIndex = Math.floor(Math.random() * results.length);
            const randomMovie = results[randomIndex];
            
            displayResult(randomMovie);
        })
        .catch(error => console.error('Error:', error));
}

function displayResult(movie) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <p>Release Date: ${movie.release_date}</p>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
    `;
}






