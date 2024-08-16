const axios = require('axios');

const apiUrl = 'https://vidsrc.xyz/movies/latest/page-1.json';

axios.get(apiUrl)
  .then(response => {
    const movies = response.data;
    console.log(movies); // Print the list of movies
  })
  .catch(error => {
    console.error(error);
  });