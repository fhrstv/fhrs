document.addEventListener('DOMContentLoaded', function() {
    const randomButton = document.getElementById('randomButton');

    if (randomButton) {
        randomButton.addEventListener('click', function() {
            // احصل على جميع الروابط من قائمة الأفلام
            const links = Array.from(document.querySelectorAll('#movie-list .movie-item a'));

            if (links.length > 0) {
                // اختر رابطًا عشوائيًا
                const randomIndex = Math.floor(Math.random() * links.length);
                const randomLink = links[randomIndex].href;
                console.log("Navigating to: " + randomLink);

                // الانتقال إلى الرابط العشوائي
                window.location.href = randomLink;
            } else {
                console.error("No links available.");
            }
        });
    } else {
        console.error("Random button not found");
    }
});