document.addEventListener('DOMContentLoaded', function() {
    console.log("Document is ready");

    var randomButton = document.getElementById('randomButton');
    if (randomButton) {
        console.log("Random button found");
        randomButton.addEventListener('click', function() {
            console.log("Random button clicked");

            // قائمة لجمع الروابط
            let allLinks = [];

            // إرسال طلب لجلب محتوى صفحة "Movies" و "Series" بشكل متزامن
            Promise.all([
                fetch('watch/movies').then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok for Movies');
                    }
                    return response.text();
                }),
                fetch('watch/series').then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok for Series');
                    }
                    return response.text();
                })
            ])
            .then(responses => {
                const [moviesText, seriesText] = responses;

                // معالجة نصوص صفحات "Movies" و "Series"
                const parser = new DOMParser();

                // استخراج الروابط من عناصر "Movies"
                const moviesDoc = parser.parseFromString(moviesText, 'text/html');
                const movieLinks = Array.from(moviesDoc.querySelectorAll('.movie-item a'))
                    .map(a => a.getAttribute('href'))
                    .filter(href => href.startsWith('watch/movies'));

                allLinks = [...allLinks, ...movieLinks];

                // استخراج الروابط من عناصر "Series"
                const seriesDoc = parser.parseFromString(seriesText, 'text/html');
                const seriesLinks = Array.from(seriesDoc.querySelectorAll('.movie-item a'))
                    .map(a => a.getAttribute('href'))
                    .filter(href => href.startsWith('watch/series'));

                allLinks = [...allLinks, ...seriesLinks];

                // اختيار رابط عشوائي
                if (allLinks.length > 0) {
                    const randomLink = allLinks[Math.floor(Math.random() * allLinks.length)];
                    console.log("Navigating to: " + randomLink);

                    // الانتقال إلى الرابط العشوائي
                    window.location.href = randomLink;
                } else {
                    console.error("No valid links found.");
                }
            })
            .catch(error => console.error('Error fetching pages:', error));
        });
    } else {
        console.error("Random button not found");
    }
});