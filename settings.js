// Mobile Menu Toggle
      const menuBtn = document.getElementById("menuBtn");
      const mobileMenu = document.getElementById("mobileMenu");

      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      // Popup function
      function showPopup(message) {
        const popup = document.getElementById("popup");
        popup.textContent = message;
        popup.classList.remove("hidden");

        setTimeout(() => {
          popup.classList.add("hidden");
        }, 2500);
      }

      // Save Settings Button
      document.getElementById("saveSettings").addEventListener("click", () => {
        // You can later store these in localStorage or backend
        showPopup("Settings saved successfully!");
      });