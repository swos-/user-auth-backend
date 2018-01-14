module.exports = function(app, passport) {
    app.get('/profile', isLoggedIn, (req, res) => {
        res.status(200).send(req.user);
    });

    app.get('/users', isLoggedIn, (req, res) => {

    });

    app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
        res.status(200).send(req.user);
    });

    app.post('/login', passport.authenticate('local-login'), (req, res) => {
        res.status(200).send(req.user);
    });

    app.post('/logout', (req, res) => {
        req.logout();
        res.status(200).send({ message: 'The user is successfully logged out.' });
    })
}

function isLoggedIn(req, res, next) {
    // Passport adds isAuthenticated() to req
    if (req.isAuthenticated()) {
        return next();
    };

    res.status(401).send({ message: 'Unauthorized' });
}