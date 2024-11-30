import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore();

// Check if user is logged in and load data
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const loggedInUserId = user.uid;
    localStorage.setItem("loggedInUserId", loggedInUserId);

    try {
      const userDoc = await getDoc(doc(db, "users", loggedInUserId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("loggedUserfname").innerText = userData.fname || "User";
        document.getElementById("loggedUserlname").innerText = userData.fname || "User";
        document.getElementById("loggedUserfname").innerText = userData.fname || "User";
      } else {
        console.log("No user data found.");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  } else {
    // If user is not logged in, redirect to the login page
    localStorage.removeItem("loggedInUserId");
    window.location.href = "/templates/index.html";
  }
});

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("loggedInUserId");
      window.location.href = "/templates/index.html";
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
});
