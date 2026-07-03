window.LearningApp = window.LearningApp || {};

LearningApp.storage = {
  USERS_KEY: "learningApp_users",
  CURRENT_USER_KEY: "learningApp_currentUser",

  getUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || "{}");
  },

  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  setCurrentUser(username) {
    localStorage.setItem(this.CURRENT_USER_KEY, username);
  },

  getCurrentUser() {
    return localStorage.getItem(this.CURRENT_USER_KEY);
  },

  clearCurrentUser() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
};

console.log("Part 1_1 loaded: storage system ready"); 
