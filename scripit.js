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




<script type='text/javascript' src='//pl26581173.profitableratecpm.com/63/6d/6c/636d6cacab6b497056f9cd121ec3e176.js'></script>









