import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzfi1k8VTMwmWewkdmTF9hYCUTdzMa-lg",
  authDomain: "login-form-sc.firebaseapp.com",
  projectId: "login-form-sc",
  storageBucket: "login-form-sc.appspot.com",
  messagingSenderId: "897799090943",
  appId: "1:897799090943:web:74e87ccbe04fe6b62f52ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Get logged-in user's ID
const userId = localStorage.getItem("loggedInUserId");

async function loadUserProfile() {
  try {
    const loadingDiv = document.getElementById("loading");
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
      const userData = userDoc.data();

      document.getElementById("profile-name").textContent = `${userData.fname} ${userData.lname}`;
      document.getElementById("profile-email").textContent = userData.email;

      // Display profile image or placeholder
      const profileImage = userData.profileImage || "https://via.placeholder.com/150";
      document.getElementById("profile-img").src = profileImage;

      loadingDiv.textContent = "";
    } else {
      loadingDiv.textContent = "User profile not found!";
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    document.getElementById("loading").textContent = "Failed to load profile.";
  }
}

function setupProfileImageUpload() {
  const uploadInput = document.getElementById("upload-image");
  const uploadButton = document.getElementById("upload-btn");
  const removeButton = document.getElementById("remove-btn");
  const profileImage = document.getElementById("profile-img");

  uploadButton.addEventListener("click", () => uploadInput.click());

  uploadInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profile-images/${userId}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update Firestore with the download URL
      await updateDoc(doc(db, "users", userId), { profileImage: downloadURL });

      profileImage.src = downloadURL; // Update image preview
      alert("Profile image updated!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  });

  removeButton.addEventListener("click", async () => {
    const storageRef = ref(storage, `profile-images/${userId}`);
    try {
      await deleteObject(storageRef); // Remove image from storage
      await updateDoc(doc(db, "users", userId), { profileImage: "" });

      profileImage.src = "https://via.placeholder.com/150";
      alert("Profile image removed!");
    } catch (error) {
      console.error("Error removing profile image:", error);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (userId) {
    loadUserProfile();
    setupProfileImageUpload();
  } else {
    document.getElementById("loading").textContent = "User not logged in!";
  }
});
