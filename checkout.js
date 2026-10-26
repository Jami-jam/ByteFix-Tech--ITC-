const saved = JSON.parse(localStorage.getItem("cart")) || [];

if (saved.length === 0) {
  window.location.href = "Laptops.html";
}

let total = 0;
let orderText = "";
let receiptRows = "";

for (let i = 0; i < saved.length; i++) {
  const lineTotal = saved[i].price * saved[i].qty;
  total = total + lineTotal;

  orderText = orderText + saved[i].name + " x" + saved[i].qty + " - ₱" + lineTotal.toLocaleString() + "\n";
  receiptRows = receiptRows + "<div class='rline'><span>" + saved[i].name + " x" + saved[i].qty +
    "</span><span>₱" + lineTotal.toLocaleString() + "</span></div>";
}

orderText = orderText + "\nTotal: ₱" + total.toLocaleString();
document.getElementById("order").value = orderText;

document.getElementById("orderform").addEventListener("submit", function (e) {
  e.preventDefault();

  const orderNo = "BF" + Math.floor(Math.random() * 900000 + 100000);
  const today = new Date().toLocaleDateString();

  const name = document.getElementById("first").value + " " + document.getElementById("last").value;

  const address = document.getElementById("street").value + ", " +
    document.getElementById("city").value + ", " +
    document.getElementById("province").value + " " +
    document.getElementById("postal").value;

  document.getElementById("rno").textContent = orderNo;
  document.getElementById("rdate").textContent = today;
  document.getElementById("rname").textContent = name;
  document.getElementById("rphone").textContent = document.getElementById("phone").value;
  document.getElementById("raddress").textContent = address;
  document.getElementById("ritems").innerHTML = receiptRows;
  document.getElementById("rtotal").textContent = "₱" + total.toLocaleString();
  document.getElementById("rdelivery").textContent = document.getElementById("date").value;

  document.querySelector(".cform").style.display = "none";
  document.getElementById("receipt").style.display = "block";

  localStorage.removeItem("cart");
});