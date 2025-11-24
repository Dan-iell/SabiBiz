// =========================
// MOBILE MENU TOGGLE
// =========================
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});


// =========================
// POPUP ALERT
// =========================
function showAlert(message, type = "success") {
  const popup = document.createElement("div");
  popup.className =
    "fixed top-5 right-5 px-4 py-3 rounded-xl shadow-lg text-white text-sm z-50 " +
    (type === "success" ? "bg-green-600" : "bg-red-600");

  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2000);
}


// =========================
// MAIN SALES LOGIC
// =========================

const salesBody = document.getElementById("salesBody");
const saveBtn = document.getElementById("saveBtn");


//  Load saved data from localStorage when page loads
window.addEventListener("DOMContentLoaded", loadSales);


//  Load sales from localStorage and display them
function loadSales() {
  const sales = JSON.parse(localStorage.getItem("salesData")) || [];

  salesBody.innerHTML = ""; // clear table first

  sales.forEach((sale, index) => {
    addSaleToTable(sale, index);
  });
}


// Add sale to table UI
function addSaleToTable(sale, index) {
  const row = document.createElement("tr");
  row.className = "border-b";

  row.innerHTML = `
    <td class="py-3 px-4">${sale.item}</td>
    <td class="py-3 px-4">₦${Number(sale.amount).toLocaleString()}</td>
    <td class="py-3 px-4">${sale.quantity}</td>
    <td class="py-3 px-4">${sale.date}</td>
    <td class="py-3 px-4">${sale.payment}</td>
    <td class="py-3 px-4">
      <button data-index="${index}" class="deleteSale bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>
    </td>
  `;

  salesBody.appendChild(row);
}


// =========================
// ADD NEW SALE
// =========================
saveBtn.addEventListener("click", () => {
  const item = document.getElementById("item").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const date = document.getElementById("date").value;
  const payment = document.getElementById("paymentMethod").value;

  if (!item || !amount || !quantity || !date || !payment) {
    showAlert("Please fill all fields", "error");
    return;
  }

  const newSale = {
    item,
    amount: Number(amount),
    quantity,
    date,
    payment
  };

  // Save to localStorage
  const sales = JSON.parse(localStorage.getItem("salesData")) || [];
  sales.push(newSale);
  localStorage.setItem("salesData", JSON.stringify(sales));

  // Add to UI instantly
  addSaleToTable(newSale, sales.length - 1);

  showAlert("Sale added successfully!");

  document.getElementById("salesForm").reset();
});


// =========================
// DELETE SALE
// =========================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteSale")) {
    const index = e.target.dataset.index;

    const sales = JSON.parse(localStorage.getItem("salesData")) || [];

    // remove sale
    sales.splice(index, 1);

    // save back
    localStorage.setItem("salesData", JSON.stringify(sales));

    // reload table
    loadSales();

    showAlert("Sale deleted!", "error");
  }
});

