const popup = document.getElementById("popup");
      const popupMessage = document.getElementById("popupMessage");

      function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = "flex";
      }

      function closePopup() {
        popup.style.display = "none";
      }

      document.getElementById("signupBtn").addEventListener("click", () => {
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!fullname || !email || !password) {
          return showPopup("Please fill in all fields.");
        }

        if (fullname.length < 3) {
          return showPopup("Full name must be at least 3 characters.");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          return showPopup("Invalid email address.");
        }

        if (password.length < 6) {
          return showPopup("Password must be at least 6 characters.");
        }

        showPopup("Account created successfully! Redirecting...");

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      });
      const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", () => {
  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!fullname || !email || !password) {
    alert("Please fill in all fields");
    return;
  }

  // NEW CHANGE: Save user data to localStorage
  localStorage.setItem("userName", fullname);

  // Optionally, you can also save email/password (if needed)
  // localStorage.setItem("userEmail", email);

  // Redirect to dashboard
  window.location.href = "./dashboard.html";
});
