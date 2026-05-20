const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

function getUsers() {
  const data = fs.readFileSync(filePath, "utf-8");

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

module.exports = {
  getUsers,
  saveUsers,
};
