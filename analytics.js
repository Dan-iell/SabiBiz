// ---------------- MOBILE MENU ----------------
const mobileMenu = document.getElementById("mobileMenu");
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// ---------------- POPUP SYSTEM ----------------
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");

function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = "flex";
}
function closePopup() {
  popup.style.display = "none";
}

// ---------------- LOAD DATA ----------------
let sales = JSON.parse(localStorage.getItem("salesData")) || [];
let expenses = JSON.parse(localStorage.getItem("expensesData")) || [];

// Extract numeric values (because data is stored as objects)
sales = sales.map(item => parseFloat(item.amount) || 0);
expenses = expenses.map(item => parseFloat(item.amount) || 0);

// Calculate totals
const totalSales = sales.reduce((a, b) => a + b, 0);
const totalExpenses = expenses.reduce((a, b) => a + b, 0);
const profit = totalSales - totalExpenses;

// ---------------- UPDATE SUMMARY CARDS ----------------
document.getElementById("salesAmount").textContent = "₦" + totalSales.toLocaleString();
document.getElementById("expensesAmount").textContent = "₦" + totalExpenses.toLocaleString();
document.getElementById("profitAmount").textContent = "₦" + profit.toLocaleString();

// ---------------- PIE CHART ----------------
new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels: ["Profit", "Expenses"],
    datasets: [{
      data: [
        profit > 0 ? profit : 0,  // Prevent negative profit in pie chart
        totalExpenses
      ],
      backgroundColor: ["#2606D2", "#FF3B30"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => ctx.label + ": ₦" + ctx.raw.toLocaleString()
        }
      }
    }
  }
});

// ---------------- SALES TREND CHART ----------------
new Chart(document.getElementById("salesChart"), {
  type: "line",
  data: {
    labels: sales.map((_, i) => "Sale " + (i + 1)),
    datasets: [{
      label: "Sales",
      data: sales,
      borderColor: "#2606D2",
      backgroundColor: "#2606D2",
      tension: 0.3,
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } }
  }
});

// ---------------- EXPENSE TREND CHART ----------------
new Chart(document.getElementById("expensesChart"), {
  type: "line",
  data: {
    labels: expenses.map((_, i) => "Expense " + (i + 1)),
    datasets: [{
      label: "Expenses",
      data: expenses,
      borderColor: "#FF3B30",
      backgroundColor: "#FF3B30",
      tension: 0.3,
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } }
  }
});
