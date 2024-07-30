// random.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('randomButton').addEventListener('click', function() {
        // قائمة الروابط
        const links = [
            'index.html',
            'index.html',
            'index.html',
            'index.html'
        ];

        // اختيار رابط عشوائي
        const randomLink = links[Math.floor(Math.random() * links.length)];

        // الانتقال إلى الرابط العشوائي
        window.location.href = randomLink;
    });
});