const fs = require('fs');
const path = require('path');

// Define the directories to watch
const dirs = ['watch/movies', 'watch/series'];

// Function to get a random directory
function getRandomDir() {
  return dirs[Math.floor(Math.random() * dirs.length)];
}

// Get a random directory
const randomDir = getRandomDir();

// Log the random directory
console.log(`Random directory: ${randomDir}`);

// Change into the random directory
process.chdir(randomDir);

console.log(`Current working directory: ${process.cwd()}`);