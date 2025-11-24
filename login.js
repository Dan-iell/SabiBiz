  const popup = document.getElementById("popup");
      const popupMessage = document.getElementById("popupMessage");

      function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = "flex";
      }

      function closePopup() {
        popup.style.display = "none";
      }

      document.getElementById("loginBtn").addEventListener("click", () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
          return showPopup("Please fill in all fields.");
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          return showPopup("Invalid email address.");
        }

        if (password.length < 6) {
          return showPopup("Password must be at least 6 characters.");
        }

        // Fake authentication simulation
        showPopup("Login successful! Redirecting...");

        setTimeout(() => {
          window.location.href = "dashboard.html"; // Change later
        }, 1500);
      });