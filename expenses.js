// ==========================
// MOBILE MENU
// ==========================
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// ==========================
// ALERT POPUP
// ==========================
function showAlert(message, type = "success") {
  const alert = document.createElement("div");
  alert.className =
    "fixed top-5 right-5 px-4 py-3 rounded-xl shadow-lg text-white text-sm " +
    (type === "success" ? "bg-green-600" : "bg-red-600");

  alert.textContent = message;
  document.body.appendChild(alert);

  setTimeout(() => alert.remove(), 2000);
}

// ==========================
// GET EXPENSES FROM STORAGE
// ==========================
function getExpenses() {
  return JSON.parse(localStorage.getItem("expensesData")) || [];
}

// ==========================
// SAVE EXPENSES TO STORAGE
// ==========================
function saveExpenses(expenses) {
  localStorage.setItem("expensesData", JSON.stringify(expenses));
}

// ==========================
// LOAD EXPENSES ON PAGE LOAD
// ==========================
function loadExpenses() {
  const expenseList = document.getElementById("expenseList");
  const expenses = getExpenses();

  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    expenseList.innerHTML =
      `<p class="text-gray-500 text-center py-4">No expenses recorded yet.</p>`;
    return;
  }

  expenses.forEach((exp, index) => {
    const item = document.createElement("div");
    item.className = "p-3 border rounded-xl flex justify-between items-center";

    item.innerHTML = `
      <div>
        <p class="font-medium">${exp.desc}</p>
        <p class="text-xs text-gray-500">${exp.category} • ${exp.date}</p>
      </div>
      <div class="flex items-center gap-3">
        <p class="font-semibold">₦${parseFloat(exp.amount).toLocaleString()}</p>

        <!-- DELETE BUTTON -->
        <button class="text-red-500 text-xs font-semibold deleteBtn" data-id="${index}">
          Delete
        </button>
      </div>
    `;

    expenseList.appendChild(item);
  });
}

// ==========================
// DELETE EXPENSE
// ==========================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = e.target.getAttribute("data-id");

    const expenses = getExpenses();
    expenses.splice(id, 1); // remove item
    saveExpenses(expenses);

    loadExpenses();
    showAlert("Expense deleted", "success");
  }
});

// ==========================
// ADD NEW EXPENSE
// ==========================
const form = document.getElementById("expenseForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const desc = document.getElementById("desc").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!desc || !amount || !category || !date) {
    showAlert("Please fill all fields", "error");
    return;
  }

  const expenses = getExpenses();

  expenses.push({
    desc,
    amount,
    category,
    date,
  });

  saveExpenses(expenses);
  loadExpenses();
  form.reset();

  showAlert("Expense added successfully!", "success");
});

// Load expenses immediately when page opens
loadExpenses();
