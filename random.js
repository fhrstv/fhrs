const randomButton = document.getElementById('randomButton');
            randomButton.addEventListener('click', function() {
                if (links.length > 0) {
                    const randomIndex = Math.floor(Math.random() * links.length);
                    const randomLink = links[randomIndex].href;
                    console.log("Navigating to: " + randomLink);
                    window.location.href = randomLink;
                } else {
                    console.error("No links available.");
                }
            });
        })
        .catch(error => console.error('Error:', error));
});