async function getRandomFile() {
    const repoOwner = 'fhrstv';
    const repoName = 'fhrs';
    const folders = ['watch/movies', 'watch/series'];

    let allFiles = [];

    for (const folder of folders) {
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folder}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error('Failed to fetch files from:', url, 'Status:', response.status);
                continue;
            }
            const data = await response.json();

            if (Array.isArray(data)) {
                const files = data
                    .filter(item => item.type === 'file')
                    .map(file => `https://fhrstv.github.io/${repoName}/${folder}/${file.name}`);

                allFiles = allFiles.concat(files);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    }

    if (allFiles.length > 0) {
        const randomFile = allFiles[Math.floor(Math.random() * allFiles.length)];
        console.log('Redirecting to:', randomFile);
        window.location.href = randomFile;
    } else {
        console.error('No files found in any folder.');
    }
}

document.getElementById('randomButton').addEventListener('click', getRandomFile);