var express = require('express');
var router = express.Router();
const session = require('express-session');
const moviesBL = require('../models/MoviesBL');

router.get('/', function (req, res, next) {
    if (req.session.authenticated) {
        res.render('createMoviePage', {});
    } else {
        res.redirect('login');
    }

});

router.post('/newMovie', async function (req, res, next) {
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
    try {
        let genres = [];
        if (typeof req.body.genres === "string") {
            genres.push(req.body.genres);
        } else {
            genres = req.body.genres;
        }
        let movieId = await moviesBL.getMoviesID();
        let movie = { id: movieId, name: req.body.name, language: req.body.language, genres: genres };
        await moviesBL.addMovie(movie);
        res.render('menu', { username: req.session.username });
    } catch (err) {
        console.log(err);
    }

});
module.exports = router;
