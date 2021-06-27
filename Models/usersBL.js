const usersDAL = require('../DAL/usersDAL');

exports.addUSer = async function (user) {

    let users = await usersDAL.getUsers();
    let obj = { username: user.username, password: user.password, date: user.date, transactions: user.transactions };
    users.push(obj);
    await usersDAL.addUser(users);

}

