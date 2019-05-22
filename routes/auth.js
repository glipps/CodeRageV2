var auth = require('../utils/auth');

// Routes for authentication (signup, login, logout)
module.exports = function(app, passport) {

  app.get('/signup', auth.alreadyLoggedIn, function(req, res, next) {

    res.render('signup', { message: req.flash('signupMessage') });

  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true // Allow flash messages
  }));

  app.get('/login', auth.alreadyLoggedIn, function(req, res, next) {

    res.render('login', { message: req.flash('loginMessage') });

  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true // Allow flash messages
  }));

  function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}

  app.get('/profile',checkAuthentication,function(req,res){
    //do something only if user is authenticated
});



  app.get('/logout', function(req, res, next) {

    req.logout();
    res.redirect('/');

  });

};
