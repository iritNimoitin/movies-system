const usersDAL = require('../DAL/usersDAL');
// let today = new Date().toLocaleDateString()
let today = new Date().toISOString().slice(0, 10)


exports.addUSer = async function (user) {

    let users = await usersDAL.getUsers();
    let obj = { username: user.username, password: user.password, date: today, transactions: user.transactions };
    users.push(obj);
    await usersDAL.writeFile(users);

}

exports.deleteUser = async function (username) {

    let users = await usersDAL.getUsers()
    let index = users.map(x => x.username).indexOf(username);
    users.splice(index)
    let result = await usersDAL.writeFile(users);

    return result;
}

exports.updateUser = async function (username, obj) {
    await this.deleteUser(username);
    await this.addUSer(obj);
}


