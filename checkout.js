const saved = JSON.parse(localStorage.getItem("cart")) || [];

if (saved.length === 0) {
  window.location.href = "Laptops.html";
}

let text = "";
let total = 0;

for (let i = 0; i < saved.length; i++) {
  const lineTotal = saved[i].price * saved[i].qty;
  total = total + lineTotal;
  text = text + saved[i].name + " x" + saved[i].qty + " - ₱" + lineTotal.toLocaleString() + "\n";
}

text = text + "\nTotal: ₱" + total.toLocaleString();
document.querySelector("#order").value = text;

document.querySelector("#orderform").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your order has been placed. Please pay in cash when it arrives.");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});