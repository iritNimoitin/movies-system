
let movieDAL = require('../DAL/MovieDAL');
const jfile = require('jsonfile');
let restDAL = require('../DAL/RestDAL');


const getMovies = async function () {
    let resp = await restDAL.getMoviesRest();
    let movies = resp.data;
    return movies;
}
const getOneMovieFromRestAndJson = async function (id) {
    let resp = await restDAL.getOneMovieRest(id);
    let restMovie = resp.data;
    if (!restMovie) {
        let jsonMovies = await movieDAL.getMovies();
        let jsonMovie = jsonMovies.find(x => x.id === id);
        console.log(jsonMovie);
        return jsonMovie;
    }
    return restMovie;
}

const addMovie = async function (movie) {
    let movies = await movieDAL.getMovies();
    let obj = { id: movie.id, name: movie.name, language: movie.language, genres: movie.genres };
    movies.push(obj);
    return new Promise((resolve, reject) => {
        jfile.writeFile('DAL/newMovies.json', movies, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Succeeded')
            }
        })

    })

}

const getMoviesID = async function () {
    let moviesDAL = await movieDAL.getMovies();
    let lengthDAL = moviesDAL.length;
    let moviesREST = await restDAL.getMoviesRest();
    let lengthREST = moviesREST.data[moviesREST.data.length - 1].id;
    let id = lengthDAL + lengthREST + 1;
    return id;

}

const getMoviesNames = async function (name) {
    let resp = await movieDAL.getMovies();
    let movies = resp.data;
    let names = movies.filter(movie => movie.name.toLowerCase().includes(name.toLowerCase()));
    return names;
}

const getMoviesGenres = async function (genre) {
    let moviesDAL = await movieDAL.getMovies();
    let moviesFromJson = moviesDAL.data;
    let moviesREST = await restDAL.getMoviesRest();
    let moviesFromRest = moviesREST.data;
    let allMovies = moviesFromRest.concat(moviesFromJson);
    let genres = allMovies.filter(movie => movie.genres.includes(genre));
    return genres;
}

const getMoviesLanguage = async function (language) {
    let resp = await movieDAL.getMovies();
    let movies = resp.data;
    let languages = movies.filter(movie => movie.language.toLowerCase() == language.toLowerCase());
    return languages;
}

module.exports = { getMovies, addMovie, getMoviesID, getMoviesNames, getMoviesGenres, getMoviesLanguage, getOneMovieFromRestAndJson };