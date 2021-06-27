
const axios = require('axios');

const getMoviesRest = function () {

    return axios.get("https://api.tvmaze.com/shows");
}
const getOneMovieRest = function (id) {

    return axios.get("https://api.tvmaze.com/shows" + "/" + id);
}

module.exports = { getMoviesRest, getOneMovieRest };