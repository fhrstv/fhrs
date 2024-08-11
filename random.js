// Define the directories to watch
const dirs = ['watch/movies', 'watch/series'];

// Function to get a random directory
function getRandomDir() {
  return dirs[Math.floor(Math.random() * dirs.length)];
}

// Get the random button element
const randomButton = document.getElementById('randomButton');

// Add an event listener to the random button
randomButton.addEventListener('click', function() {
  // Get a random directory
  const randomDir = getRandomDir();

  // Redirect to the random directory
  window.location.href = randomDir;
});