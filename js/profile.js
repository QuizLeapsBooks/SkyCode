import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzfi1k8VTMwmWewkdmTF9hYCUTdzMa-lg",
  authDomain: "login-form-sc.firebaseapp.com",
  projectId: "login-form-sc",
  storageBucket: "login-form-sc.appspot.com",
  messagingSenderId: "897799090943",
  appId: "1:897799090943:web:74e87ccbe04fe6b62f52ca",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Get user ID from localStorage
const userId = localStorage.getItem("loggedInUserId");
if (!userId) {
  alert("User not logged in!");
  window.location.href = "/login.html";
}

// Fetch and display user profile data
async function loadUserProfile() {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      document.getElementById("profile-name").textContent = `${userData.fname} ${userData.lname}`;
      document.getElementById("profile-email").textContent = userData.email;
    } else {
      alert("User profile not found!");
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

// Logout functionality
document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("loggedInUserId");
    window.location.href = "/login.html";
  } catch (error) {
    console.error("Error logging out:", error);
  }
});

// Initialize profile view
loadUserProfile();
