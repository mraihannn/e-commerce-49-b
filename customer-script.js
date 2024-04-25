let stock = {
  sepatu: {
    harga: 100000,
    stock: 5,
    image: "./sepatu.png",
  },
  tas: {
    harga: 53000,
    stock: 7,
    image: "./tas.png",
  },
  sendal: {
    harga: 20000,
    stock: 6,
    image: "./sendal.png",
  },
};

let cards = document.getElementById("cards");
let jumlahBarang = document.getElementById("jumlahBarang");
let totalHarga = document.getElementById("totalHarga");
let checkoutButton = document.getElementById("checkoutButton");

checkoutButton.addEventListener("click", function () {
  if (jumlahBarang.textContent.split(": ")[1].trim() === "0") {
    alert("Please buy at least 1 item");
  } else {
    alert("Thanks for shopping");
    jumlahBarang.textContent = "Total Item : 0";
    totalHarga.textContent = "Total Price : Rp.0";
  }
});

renderItems();

function createCard(item, data) {
  let card = document.createElement("div");
  card.className = "card";

  let image = document.createElement("img");
  image.src = data.image;
  image.alt = item;
  image.className = "image";
  card.appendChild(image);

  let title = document.createElement("h2");
  title.textContent = item;
  card.appendChild(title);

  let price = document.createElement("h3");
  price.textContent = "Harga: Rp. " + data.harga;
  card.appendChild(price);

  let stockCount = document.createElement("h3");
  stockCount.textContent = "Stock: " + data.stock;
  card.appendChild(stockCount);

  let button = document.createElement("input");
  button.type = "button";
  button.value = "Buy";
  button.addEventListener("click", function () {
    if (stock[item].stock > 0) {
      stock[item].stock--;
      localStorage.setItem("stock", JSON.stringify(stock));
      stockCount.textContent = "Stock: " + stock[item].stock;
      updateTotal(data.harga);
    }
    if (stock[item].stock === 0) {
      button.disabled = true;
    }
  });
  card.appendChild(button);

  cards.appendChild(card);
}

function renderItems() {
  cards.innerHTML = "";
  // for (let item in stock) {
  //   createCard(item, stock[item]);
  // }
  let storedStock = JSON.parse(localStorage.getItem("stock")) || stock;
  for (let item in storedStock) {
    createCard(item, storedStock[item]);
  }
}

function updateTotal(price) {
  let currentTotalItems = jumlahBarang.textContent.split(": ")[1].trim();
  jumlahBarang.textContent = "Total Item : " + (Number(currentTotalItems) + 1);

  let currentTotalPrice = totalHarga.textContent.split(": Rp.")[1].trim();
  totalHarga.textContent =
    "Total Price : Rp." + (Number(currentTotalPrice) + price);
}
