// Password toggle
function togglePassword(fieldId, eyeId) {
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(eyeId);
  
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      passwordField.type = "password";
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
  }
  
  // Show Sign Up Form
  function showSignUpForm() {
    document.getElementById("signup-page").classList.remove("hidden");
    document.getElementById("login-page").classList.add("hidden");
  }
  
  // Show Login Form
  function showLoginForm() {
    document.getElementById("login-page").classList.remove("hidden");
    document.getElementById("signup-page").classList.add("hidden");
  }
  