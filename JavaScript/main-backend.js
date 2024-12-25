import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzfi1k8VTMwmWewkdmTF9hYCUTdzMa-lg",
  authDomain: "login-form-sc.firebaseapp.com",
  projectId: "login-form-sc",
  storageBucket: "login-form-sc.firebasestorage.app",
  messagingSenderId: "897799090943",
  appId: "1:897799090943:web:74e87ccbe04fe6b62f52ca"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Helper function to show messages
function showMessage(message, divId, isError = true) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.textContent = message;
  messageDiv.style.color = isError ? "red" : "green";
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}

// Utility for email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sign Up functionality
document.getElementById("submitSignUp").addEventListener("click", async () => {
  const fname = document.getElementById("signup-fname").value.trim();
  const lname = document.getElementById("signup-lname").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!fname || !lname || !email || !password) {
    showMessage("All fields are required", "signUpMessage");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage("Invalid email format", "signUpMessage");
    return;
  }

  if (password.length < 8) {
    showMessage("Password must be at least 8 characters long", "signUpMessage");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), { fname, lname, email });
    localStorage.setItem("loggedInUserId", user.uid);
    showMessage("Account Created Successfully", "signUpMessage", false);
    setTimeout(() => location.replace("https://quizleapsbooks.github.io/SkyCode/templates/dashboard.html"), 2000);
  } catch (error) {
    console.error(error);
    const errorMessage = error.code === "auth/email-already-in-use"
      ? "Email Address Already Exists"
      : "Unable to create User. Please try again.";
    showMessage(errorMessage, "signUpMessage");
  }
});

// Login functionality
document.getElementById("submitSignIn").addEventListener("click", async () => {
  const email = document.getElementById("signIn-email").value.trim();
  const password = document.getElementById("signIn-password").value;

  if (!email || !password) {
    showMessage("All fields are required", "signInMessage");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage("Invalid email format", "signInMessage");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("loggedInUserId", userCredential.user.uid);
    showMessage("Logged in Successfully", "signInMessage", false);
    setTimeout(() => location.replace("https://quizleapsbooks.github.io/SkyCode/templates/dashboard.html"), 2000);
  } catch (error) {
    console.error(error);
    showMessage("Login Failed. Email or Password is incorrect.", "signInMessage");
  }
});
