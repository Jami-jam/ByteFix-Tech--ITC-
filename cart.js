const cartBody = document.querySelector(".cbody");
const buttons = document.querySelectorAll(".addbtn");

let cart = [];

function showCart() {
  if (cart.length === 0) {
    cartBody.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  let html = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const lineTotal = item.price * item.qty;
    total = total + lineTotal;

    html = html + "<p>" + item.name + " x" + item.qty + " - ₱" + lineTotal.toLocaleString() +
      " <button onclick='removeItem(" + i + ")'>-1</button></p>";
  }

  html = html + "<p>Total: ₱" + total.toLocaleString() + "</p>";
  cartBody.innerHTML = html;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

function removeItem(i) {
  cart[i].qty = cart[i].qty - 1;
  if (cart[i].qty === 0) {
    cart.splice(i, 1);
  }
  showCart();
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    const row = this.closest(".item");
    const name = row.querySelector("h3").textContent;
    const price = Number(row.querySelector(".itprice").textContent.replace("₱", "").replaceAll(",", ""));

    let found = false;
    for (let j = 0; j < cart.length; j++) {
      if (cart[j].name === name) {
        cart[j].qty = cart[j].qty + 1;
        found = true;
      }
    }

    if (!found) {
      cart.push({ name: name, price: price, qty: 1 });
    }

    showCart();
  });
}

document.querySelector(".checkoutbtn").addEventListener("click", checkout);
