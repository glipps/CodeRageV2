var path = require("path");
var db = require("../models/chirp");
var Chirp = require("../models/chirp.js");
var auth = require('../utils/auth');

module.exports = function (app) {

  // index route loads view.html
  app.get("/", function (req, res) {
    Chirp.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.render("index", {
        title: "Welcome!", 
        Chirps: results
      });
    });
});

  app.get("/login", function (req, res) {
    res.render("login")
  });

  app.get("/signup", function (req, res) {
    res.render("signup")
  });

  app.get("/dashboard", function (req, res) {
    res.render("dashboard");
  });

  app.get("*", function (req, res) {
    res.render("404");
  });

  app.get("profile", function (req, res) {
    res.render("profile");
  });

  app.post("/api/new", function (req, res) {

    console.log("Chirp Data:");
    console.log(req.body);

    Chirp.create({
      author: req.body.author,
      body: req.body.body,
      created_at: req.body.created_at
    }).then(function (results) {
      // `results` here would be the newly created chirp
      res.end();
    });

  });

};