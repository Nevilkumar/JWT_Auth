const { localsName } = require('ejs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'nevildalsania', async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            else {
                console.log(decodedToken);
                next();
            }

        });
    }
    else {
        res.redirect('/login');
    }

};

const checkUser = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'nevildalsania', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken.id);
                const temp_id = decodedToken.id;
                let user = await User.findById(temp_id);
                console.log('local user :', user);
                res.locals.user = user;
                next();
            }

        });
    }
    else {
        res.locals.user = null;
        next();
    }

};


module.exports = { requireAuth, checkUser };