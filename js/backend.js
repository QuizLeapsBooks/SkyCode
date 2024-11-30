import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8ef9-NADIy4tVnHkZs_KnixoOxi0D9Ew",
  authDomain: "food-menu-login.firebaseapp.com",
  projectId: "food-menu-login",
  storageBucket: "food-menu-login.appspot.com",
  messagingSenderId: "332861655682",
  appId: "1:332861655682:web:7586788668a96caa2e829b"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Helper function to show messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}

// Sign Up functionality
document.getElementById('submitSignUp').addEventListener('click', async (event) => {
  const fname = document.getElementById('signup-fname').value;
  const lname = document.getElementById('signup-lname').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), { fname, lname, email });
    localStorage.setItem("loggedInUserId", user.uid);
    showMessage("Account Created Successfully", "signUpMessage");
    setTimeout(() => { window.location.href = "/templates/dashboard.html"; }, 2000);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Email Address Already Exists", "signUpMessage");
    } else {
      showMessage("Unable to create User", "signUpMessage");
    }
  }
});

// Login functionality
document.getElementById('submitSignIn').addEventListener('click', async (event) => {
  const email = document.getElementById('signIn-email').value;
  const password = document.getElementById('signIn-password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("loggedInUserId", userCredential.user.uid);
    showMessage("Logged in Successfully", "signInMessage");
    setTimeout(() => { window.location.href = "/templates/dashboard.html"; }, 2000);
  } catch (error) {
    showMessage("Login Failed. Email or Password is incorrect.", "signInMessage");
  }
});
