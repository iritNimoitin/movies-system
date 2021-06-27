var express = require('express');
var router = express.Router();
const usersDAL = require('../DAL/usersDAL');

router.get('/', async function (req, res, next) {
    if (req.session.admin) {
        let resp = await usersDAL.getUsers();
        res.render('usersManagementPage', { users: resp });
    }
    // else {
    //     res.redirect("/login")
    // }
});

module.exports = router;