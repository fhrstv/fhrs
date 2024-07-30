// random.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('randomButton').addEventListener('click', function() {
        // قائمة الروابط
        const links = [
            'watch/movies/2012',
            'watch/movies/2012',
            'watch/movies/2012',
            'watch/movies/2012'
        ];

        // اختيار رابط عشوائي
        const randomLink = links[Math.floor(Math.random() * links.length)];

        // الانتقال إلى الرابط العشوائي
        window.location.href = randomLink;
    });
});