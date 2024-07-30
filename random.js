document.addEventListener('DOMContentLoaded', function() {
    console.log("Document is ready");

    var randomButton = document.getElementById('randomButton');
    if (randomButton) {
        console.log("Random button found");
        randomButton.addEventListener('click', function() {
            console.log("Random button clicked");

            // إرسال طلب لجلب محتوى صفحة "Movies"
            fetch('Movies')
                .then(response => response.text())
                .then(text => {
                    // تحليل النص للحصول على الروابط
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    const movieLinks = Array.from(doc.querySelectorAll('a'))
                        .map(a => a.href)
                        .filter(href => href.startsWith('watch/movies'));

                    // إرسال طلب لجلب محتوى صفحة "Series"
                    return fetch('Series')
                        .then(response => response.text())
                        .then(text => {
                            // تحليل النص للحصول على الروابط
                            const doc = parser.parseFromString(text, 'text/html');
                            const seriesLinks = Array.from(doc.querySelectorAll('a'))
                                .map(a => a.href)
                                .filter(href => href.startsWith('watch/series'));

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
                        });
                })
                .catch(error => console.error('Error fetching pages:', error));
        });
    } else {
        console.error("Random button not found");
    }
});