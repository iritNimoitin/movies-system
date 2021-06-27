const { request } = require('express');
var express = require('express');
var router = express.Router();
const moviesJson = require('../DAL/MovieDAL');
const moviesBL = require('../models/MoviesBL');

router.get('/', function (req, res, next) {

    if (req.session.authenticated) {
        res.render('searchMoviePage', {});
    }
    else {
        res.redirect("/login")
    }
});

router.post('/', async function (req, res, next) {
    if (req.session.authenticated) {
        if (!req.session.admin) {
            req.session.dailyActions++;
            if (req.session.dailyActions >= req.session.maxDailyActions) {
                req.session.authenticated = false;
                res.redirect('login');
            }
        }
    } else {
        res.redirect('login');
    }
    let allMoviesRest = await moviesBL.getMovies();
    let allMoviesJson = await moviesJson.getMovies();
    let allMovies = allMoviesRest.concat(allMoviesJson);
    let moviesResult = allMovies;
    if (req.body.name !== "") {
        moviesResult = moviesResult.filter(movie => movie.name.toLowerCase().includes(req.body.name.toLowerCase()));
    }
    if (req.body.language !== "") {
        moviesResult = moviesResult.filter(movie => movie.language.toLowerCase() === req.body.language.toLowerCase());
    }
    if (req.body.genres !== "") {
        moviesResult = moviesResult.filter(movie => movie.genres.includes(req.body.genres));
    }
    let moviesGenre = moviesResult.map(movie => allMovies.filter(m => movie.genres.every(g => m.genres?.includes(g)) && m.id !== movie.id));
    res.render('movieDataPage', { moviesResult: moviesResult, moviesGenre: moviesGenre });
});


module.exports = router;