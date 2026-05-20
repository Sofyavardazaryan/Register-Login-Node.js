const bcrypt = require("bcryptjs");
const { getUsers, saveUsers } = require("../models/userModel");

class AuthController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login");
  }

  async register(req, res) {
    const { name, age, email, password } = req.body;
    if (!name || !age || !email || !password) {
      return res.send("All fields required");
    }
    const users = getUsers();
    const emailExists = users.find((user) => user.email === email);
    if (emailExists) {
      return res.send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      name,
      age,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    saveUsers(users);
    res.redirect("/login");
  }

  async login(req, res) {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find((user) => user.email === email);
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
