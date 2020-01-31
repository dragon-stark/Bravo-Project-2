var db = require("../models");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    db.reviews.findAll({}).then(function(results) {
      res.render("index", {
        employees: results
      });
    });
  });

  // app.get("/employees", function(req, res) {
  //   db.reviews.findAll({}).then(function(results) {
  //     res.render("employees", { employees: results });
  //   });
  // });

  // Load example page and pass in an example by id
  app.get("/employees/:id", function(req, res) {
    db.reviews
      .findOne({ where: { id: req.params.employee_id } })
      .then(function(result) {
        res.render("employees", {
          employee: result
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
