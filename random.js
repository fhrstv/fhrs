document.addEventListener('DOMContentLoaded', function() {
    console.log("Document is ready");

    var randomButton = document.getElementById('randomButton');
    if (randomButton) {
        console.log("Random button found");
        randomButton.addEventListener('click', function() {
            console.log("Random button clicked");

            // إرسال طلب لجلب محتوى صفحة "Movies"
            fetch('Movies')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok for Movies');
                    }
                    return response.text();
                })
                .then(text => {
                    // تحليل النص للحصول على الروابط
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    const movieLinks = Array.from(doc.querySelectorAll('a'))
                        .map(a => a.href)
                        .filter(href => href.startsWith('watch/movies'));

                    console.log('Movie links:', movieLinks);

                    // إرسال طلب لجلب محتوى صفحة "Series"
                    return fetch('Series')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok for Series');
                            }
                            return response.text();
                        })
                        .then(text => {
                            // تحليل النص للحصول على الروابط
                            const doc = parser.parseFromString(text, 'text/html');
                            const seriesLinks = Array.from(doc.querySelectorAll('a'))
                                .map(a => a.href)
                                .filter(href => href.startsWith('watch/series'));

                            console.log('Series links:', seriesLinks);

                            // دمج الروابط من الصفحتين
                            const allLinks = [...movieLinks, ...seriesLinks];

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
                        .catch(error => console.error('Error fetching Series page:', error));
                })
                .catch(error => console.error('Error fetching Movies page:', error));
        });
    } else {
        console.error("Random button not found");
    }
});