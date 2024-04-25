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
let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function () {
  let newNama = document.getElementById("newNama").value;
  let newPrice = Number(document.getElementById("newPrice").value);
  let newStock = Number(document.getElementById("newStock").value);
  let newImageInput = document.getElementById("newImage");

  // Check if any of the input fields are empty
  if (!newNama || !newPrice || !newStock || !newImageInput.files[0]) {
    alert("Please fill in all fields");
    return;
  }

  let reader = new FileReader();
  reader.onloadend = function () {
    let newImage = reader.result;

    // Add new item to the stock object
    stock[newNama] = {
      harga: newPrice,
      stock: newStock,
      image: newImage,
    };
    // Save stock to local storage
    localStorage.setItem("stock", JSON.stringify(stock));

    // Clear the cards div
    cards.innerHTML = "";

    // Re-render the items
    let storedStock = JSON.parse(localStorage.getItem("stock")) || stock;
    for (let item in storedStock) {
      createCard(item, storedStock[item]);
    }
    // for (let item in stock) {
    //   createCard(item, stock[item]);
    // }

    alert("New item added");
  };
  reader.readAsDataURL(newImageInput.files[0]);
});

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
  button.value = "Add Stock";
  button.addEventListener("click", function () {
    if (stock[item].stock > 0) {
      stock[item].stock++;
      // Save stock to local storage
      localStorage.setItem("stock", JSON.stringify(stock));

      stockCount.textContent = "Stock: " + stock[item].stock;
      jumlahBarang.textContent =
        "Total Item : " +
        (parseInt(jumlahBarang.textContent.split(": ")[1]) + 1);
      totalHarga.textContent =
        "Total Price : Rp." +
        (parseInt(totalHarga.textContent.split(": Rp.")[1]) +
          stock[item].harga);
    }
    if (stock[item].stock === 0) {
      button.disabled = true;
    }
  });
  card.appendChild(button);

  cards.appendChild(card);
}

checkoutButton.addEventListener("click", function () {
  if (parseInt(jumlahBarang.textContent.split(": ")[1]) === 0) {
    alert("Please buy minimal 1 item");
  } else {
    alert("Thanks for shopping");
    jumlahBarang.textContent = "Total Item : 0";
    totalHarga.textContent = "Total Price : Rp.0";
  }
});

// Initial render
let storedStock = JSON.parse(localStorage.getItem("stock")) || stock;
for (let item in storedStock) {
  createCard(item, storedStock[item]);
}
