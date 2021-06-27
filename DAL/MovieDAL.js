const jfile = require('jsonfile');


let moviePath = __dirname + '/newMovies.json';


const getMovies = function () {
    return new Promise((resolve, reject) => {
        jfile.readFile(moviePath, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}


const addMovie = function (movie) {

    return new Promise((resolve, reject) => {
        jfile.writeFile(path, obj, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Succeeded')
            }
        })

    })
}



module.exports = { addMovie, getMovies };