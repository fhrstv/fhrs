document.addEventListener('DOMContentLoaded', function() {
    console.log("Document is ready");

    var randomButton = document.getElementById('randomButton');
    if (randomButton) {
        console.log("Random button found");
        randomButton.addEventListener('click', function() {
            console.log("Random button clicked");

            // قائمة لجمع الروابط
            let allLinks = [];

            // إرسال طلب لجلب محتوى صفحة "Movies"
            fetch('Movies')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok for Movies');
                    }
                    return response.text();
                })
                .then(text => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    // استخراج الروابط من العناصر ذات الصنف "movie-item"
                    const movieLinks = Array.from(doc.querySelectorAll('.movie-item a'))
                        .map(a => a.getAttribute('href'))
                        .filter(href => href.startsWith('watch/movies'));

                    allLinks = [...allLinks, ...movieLinks];

                    // إرسال طلب لجلب محتوى صفحة "Series"
                    return fetch('Series')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok for Series');
                            }
                            return response.text();
                        });
                })
                .then(text => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    // استخراج الروابط من العناصر ذات الصنف "movie-item"
                    const seriesLinks = Array.from(doc.querySelectorAll('.movie-item a'))
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