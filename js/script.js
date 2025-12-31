let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart");
}

/* DISPLAY CART ITEMS */
function displayCart() {
  let list = document.getElementById("cartItems");
  let total = 0;
  list.innerHTML = "";

  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.marginBottom = "15px";

    li.innerHTML = `
      <strong>${item.name}</strong> - ₹${item.price}
      <button onclick="removeItem(${index})"
        style="margin-left:15px; padding:5px 10px; cursor:pointer;">
        Remove
      </button>
    `;

    list.appendChild(li);
    total += item.price;
  });

  document.getElementById("total").innerText =
    "Total Amount: ₹" + total;
}

/* REMOVE ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

/* LOAD CART ON CART PAGE */
if (document.getElementById("cartItems")) {
  displayCart();
}

/* NAVIGATION */
function checkout() {
  window.location.href = "payment.html";
}

function pay() {
  localStorage.removeItem("cart");
  window.location.href = "success.html";
}

