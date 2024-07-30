document.addEventListener('DOMContentLoaded', function() {
    console.log("Document is ready");

    var randomButton = document.getElementById('randomButton');
    if (randomButton) {
        console.log("Random button found");
        randomButton.addEventListener('click', function() {
            console.log("Random button clicked");

            // قائمة الروابط مع روابط اختبارية أخرى
            const links = [
                'watch/movies/2012',  // تأكد من أن هذا الرابط صحيح
                'watch/series/11-22-63',
                'watch/series/1899'
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