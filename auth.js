window.Auth = {
  usersKey: "learningApp_users",
  currentKey: "learningApp_currentUser",

  getUsers() {
    return JSON.parse(localStorage.getItem(this.usersKey) || "{}");
  },

  saveUsers(users) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  },

  signup(username, password) {
    const users = this.getUsers();

    if (users[username]) {
      alert("Username already exists");
      return false;
    }

    users[username] = {
      password: password
    };

    this.saveUsers(users);
    localStorage.setItem(this.currentKey, username);

    return true;
  },

  login(username, password) {
    const users = this.getUsers();

    if (!users[username] || users[username].password !== password) {
      alert("Wrong username or password");
      return false;
    }

    localStorage.setItem(this.currentKey, username);
    return true;
  },

  getCurrentUser() {
    return localStorage.getItem(this.currentKey);
  }
};

window.addEventListener("load", () => {
  const user = Auth.getCurrentUser();

  const box = document.getElementById("helloUser");
  if (user && box) {
    box.textContent = "Hello, " + user;
  }
});
