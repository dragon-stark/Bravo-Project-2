var db = require("../models");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/employees", function(req, res) {
    res.render("employees");
  });

  // app.get("/employees", function(req, res) {
  //   db.reviews.findAll({}).then(function(results) {
  //     res.render("employees", { employees: results });
  //   });
  // });

  // Load example page and pass in an example by id
  app.get("/employees/:id", function(req, res) {
    res.render("employees");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
