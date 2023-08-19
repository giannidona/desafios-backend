const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const productManagerInstance = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("HOME"));

app.get("/products", async (req, res) => {
  try {
    const products = await productManagerInstance.getProducts();
    res.json(products);
  } catch (error) {
    res.send({ error: "Error al obtener los productos." });
  }
});

app.get("/queries", (req, res) => {
  res.send(req.query);
});

app.get("/products/queries", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManagerInstance.getProducts();

    if (limit) {
      return res.send(products.slice(0, limit));
    }
  } catch (error) {
    res.send({ error: "Error al obtener los productos." });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const products = await productManagerInstance.getProducts();
    const pid = parseInt(req.params.pid);

    const product = products.find((prod) => prod.id === pid);

    if (product) {
      res.json(product);
    }
  } catch (error) {
    res.send({ error: "Error con el ID." });
  }
});

app.listen(8080, () => console.log("server 8080"));
