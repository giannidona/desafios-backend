const socket = io();

const titleProd = document.getElementById("title");
const descripProd = document.getElementById("description");
const imgProd = document.getElementById("img");
const priceProd = document.getElementById("price");
const codeProd = document.getElementById("code");
const stockProd = document.getElementById("stock");
const productListContainer = document.getElementById("productList");

function productList() {
  document.getElementById("addProdForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const newProduct = {
      title: titleProd.value,
      description: descripProd.value,
      img: imgProd.value,
      price: priceProd.value,
      code: codeProd.value,
      stock: stockProd.value,
    };

    socket.emit("addProduct", newProduct);
    console.log(newProduct);
  });
}

socket.on("productAdded", (newProduct) => {
  const productItem = document.createElement("li");

  productItem.textContent = newProduct.title;

  productListContainer.appendChild(productItem);

  addProdForm.reset();
});
