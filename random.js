document.addEventListener('DOMContentLoaded', function() {
    console.log("Document is ready");

    var randomButton = document.getElementById('randomButton');
    if (randomButton) {
        console.log("Random button found");
        randomButton.addEventListener('click', function() {
            console.log("Random button clicked");

            // قائمة الروابط
            const links = [
                'watch/movies/2012',
                'watch/movies/2012',
                'watch/movies/2012',
                'watch/movies/2012'
            ];

            // اختيار رابط عشوائي
            const randomLink = links[Math.floor(Math.random() * links.length)];
            console.log("Navigating to: " + randomLink);

            // الانتقال إلى الرابط العشوائي
            window.location.href = randomLink;
        });
    } else {
        console.error("Random button not found");
    }
});
