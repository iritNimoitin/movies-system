const jfile = require('jsonfile');

let usersPath = __dirname + '/users.json';


const getUsers = function () {
    return new Promise((resolve, reject) => {
        jfile.readFile(usersPath, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const addUser = function (obj) {

    return new Promise((resolve, reject) => {
        jfile.writeFile(usersPath, obj, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Succeeded')
            }
        })

    })
}


module.exports = { getUsers, addUser };