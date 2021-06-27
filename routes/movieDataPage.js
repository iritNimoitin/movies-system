
var express = require('express');
var router = express.Router();
const moviesJson = require('../DAL/MovieDAL');
const moviesBL = require('../models/MoviesBL');

router.get('/', async function (req, res, next) {
    if (req.session.authenticated) {
        let allMoviesRest = await moviesBL.getMovies();
        let allMoviesJson = await moviesJson.getMovies();
        let allMovies = allMoviesRest.concat(allMoviesJson);
        res.render('movieDataPage', { allMovies: allMovies });
    }
    else {
        res.redirect("/login")
    }
});

router.get('/:id', async function (req, res, next) {
    if (req.session.authenticated) {
        if (!req.session.admin) {
            req.session.dailyActions++;
            if (req.session.dailyActions > req.session.maxDailyActions) {
                req.session.authenticated = false;
            }
        }
    } else {
        res.redirect('login');
    }
    let movieId = req.params.id;
    console.log(req.params.id);
    let movie = await moviesBL.getOneMovieFromRestAndJson(movieId);
    res.render('oneMoviePage', { movie: movie });
});
module.exports = router;