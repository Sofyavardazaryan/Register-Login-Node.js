const bcrypt = require("bcryptjs");
const userSchema = require("../schema/userschema");
const { getUsers, saveUsers } = require("../models/userModel");

class AuthController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login");
  }

  async register(req, res) {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }

    const { name, age, email, password } = req.body;
    const users = getUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return res.send("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      id: Date.now(),
      name,
      age,
      email,
      password: hashedPassword,
    });

    saveUsers(users);

    res.redirect("/login");
  }

  async login(req, res) {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Wrong password");
    }

    req.session.user = user;
    res.redirect("/profile");
  }
}

module.exports = new AuthController();
