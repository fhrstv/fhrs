function getRandomFile(files) {
    const randomIndex = Math.floor(Math.random() * files.length);
    return files[randomIndex];
}

function chooseRandomFile() {
    fetch('get_files.php')
        .then(response => response.json())
        .then(data => {
            const movies = data.movies;
            const series = data.series;

            if (movies.length === 0 && series.length === 0) {
                console.error('No files found.');
                return;
            }

            const randomMovie = getRandomFile(movies);
            const randomSeries = getRandomFile(series);
            const randomChoice = Math.random() < 0.5 ? randomMovie : randomSeries;

            window.location.href = randomChoice;
        })
        .catch(error => console.error('Error fetching file list:', error));
}

document.getElementById('randomButton').addEventListener('click', chooseRandomFile);