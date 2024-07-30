document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('randomButton').addEventListener('click', function() {
        // قائمة الروابط
        const links = [
            'Anime',
            'Series',
            'Movies',
            
        ];

        // اختيار رابط عشوائي
        const randomLink = links[Math.floor(Math.random() * links.length)];

        // الانتقال إلى الرابط العشوائي
        window.location.href = randomLink;
    });
});