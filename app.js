/* =========================
   SIMPLE LEARNING APP CORE
   (Login + Greeting + Progress)
   ========================= */

let currentUser = null;
 
/* -------- USERS -------- */

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/* -------- LOGIN / SIGNUP -------- */

function signup() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (!u || !p) {
    alert("Fill all fields");
    return;
  }
 
  let users = getUsers();

  if (users[u]) {
    alert("User already exists");
    return;
  }

  users[u] = {
    password: p,
    progress: 1
  };

  saveUsers(users);
  loginSuccess(u);
}

function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  let users = getUsers();

  if (!users[u] || users[u].password !== p) {
    alert("Wrong username or password");
    return;
  }

  loginSuccess(u);
}

/* -------- ENTER APP -------- */

function loginSuccess(username) {
  currentUser = username;
  localStorage.setItem("currentUser", username);

  // Greeting
  const hello = document.getElementById("helloUser");
  if (hello) {
    hello.textContent = "Hello, " + username;
  }

  // Show app (expects your existing IDs)
  const loginScreen = document.getElementById("loginScreen");
  const homeScreen = document.getElementById("home");

  if (loginScreen) loginScreen.style.display = "none";
  if (homeScreen) homeScreen.style.display = "block";

  unlockLessons();
}

/* -------- AUTO LOGIN -------- */

window.onload = () => {
  const saved = localStorage.getItem("currentUser");

  if (saved) {
    loginSuccess(saved);
  }
};

/* -------- LESSON LOCKING -------- */
/* Assumes your boxes have class "box" and numbers inside */

function unlockLessons() {
  const users = getUsers();
  const user = users[currentUser];

  if (!user) return;

  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box, i) => {
    const lessonNum = i + 1;

    if (lessonNum <= user.progress) {
      box.style.opacity = "1";
      box.style.pointerEvents = "auto";
    } else {
      box.style.opacity = "0.4";
      box.style.pointerEvents = "none";
    }
  });
}

/* -------- COMPLETE LESSON -------- */

function completeLesson() {
  let users = getUsers();
  let user = users[currentUser];

  if (!user) return;

  user.progress = Math.max(user.progress, 2);

  users[currentUser] = user;
  saveUsers(users);

  unlockLessons();
}
