const userDAL = require('../DAL/usersDAL');


exports.isUserValid = async function (userName, password) {
    let userData = await userDAL.getUsers();
    let user = userData.find(x => x.username === userName && x.password === password);
    if (user.username == "Admin" && user.password == "admin") {
        return obj = {
            password: user.password,
            username: user.username,
            valid: true,
            admin: true
        }
    }
    if (user.dailyActions <= user.maxDailyActions) {
        return obj = {
            id: user.id,
            username: user.username,
            password: user.password,
            valid: true,
            admin: false,
            maxDailyActions: user.maxDailyActions,
            dailyActions: user.dailyActions
        }
    }
    return obj = { valid: false, admin: false };
}

