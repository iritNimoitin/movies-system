const userDAL = require('../DAL/usersDAL');


exports.isUserValid = async function (userName, password) {
    let userData = await userDAL.getUsers();
    let user = userData.find(x => x.username === userName && x.password === password);
    if (user && user.username === "Admin" && user.password === "admin") {
        return obj = {
            password: user.password,
            username: user.username,
            valid: true,
            admin: true
        }
    }
    if (user) {// && user.dailyActions <= user.transactions
        return obj = {
            username: user.username,
            password: user.password,
            valid: true,
            admin: false,
            maxDailyActions: user.transactions,
            dailyActions: 1
        }
    }
    return obj = { valid: false, admin: false };
}

