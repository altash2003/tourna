const express = require("express");

const router = express.Router();

router.get("/admin/login", (req, res) => {
  return res.render("admin/login", {
    title: "Admin Login",
    error: null
  });
});

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.isAdmin = true;
    return res.redirect("/admin");
  }

  return res.render("admin/login", {
    title: "Admin Login",
    error: "Invalid credentials."
  });
});

router.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/");
  });
});

module.exports = router;
