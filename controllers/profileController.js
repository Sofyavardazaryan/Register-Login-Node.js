class ProfileController {
  getProfile(req, res) {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    res.render("profile", {
      user: req.session.user,
    });
  }
}

module.exports = new ProfileController();
