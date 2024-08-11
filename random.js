async function getRandomHtmlFile() {
    const folders = ['watch/movies', 'watch/series'];
    let allFiles = [];

    for (const folder of folders) {
        try {
            const response = await fetch(`https://api.github.com/repos/fhrstv/fhrs/contents/${folder}`);
            const data = await response.json();

            data.forEach(file => {
                if (file.type === 'file' && file.name.endsWith('.html')) {
                    // Create the URL to load the HTML file
                    const pageUrl = `https://fhrstv.github.io/fhrs/${folder}/${file.name}`;
                    allFiles.push(pageUrl);
                }
            });
        } catch (error) {
            console.error(`Error fetching files from ${folder}:`, error);
        }
    }

    if (allFiles.length > 0) {
        const randomFile = allFiles[Math.floor(Math.random() * allFiles.length)];
        const iframe = document.createElement('iframe');
        iframe.src = randomFile;
        iframe.frameBorder = '0';
        iframe.width = '100%';
        iframe.height = '100%';
        document.body.appendChild(iframe);
    } else {
        console.error('No HTML files found.');
    }
}

document.getElementById('randomButton').addEventListener('click', getRandomHtmlFile);