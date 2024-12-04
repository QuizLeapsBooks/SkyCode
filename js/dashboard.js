import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
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
          document.getElementById("loggedUseremail").innerText = userData.fname || "User";
          document.getElementById("loggedUserpassword").innerText = userData.fname || "User";
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
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("loggedInUserId");
        window.location.href = "/templates/index.html";
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  });
});
