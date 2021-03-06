const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const port = 3000;
const fs = require("fs");
const handlebars = require("express-handlebars");

const rawData = fs.readFileSync("products.json", "utf-8");
let products = JSON.parse(rawData.toString("utf-8"));

// Middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Handlebars
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  }),
);

// Engines
app.set("view engine", "hbs");
app.set("views", "./views");

// Static files
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("index", {products: [...products]});
});

app.get("/api/products", (req, res) => {
  if (products.length > 1)
    res.render("index", {products: [...products]});
   else
    res.send("There are no products.");
});

app.get("/api/products/list/:id", (req, res) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1)
    res.render("products", {products: [products[productId]]});
   else
    res.send("Product not found");
});

app.post("/api/products", (req, res) => {
  const data = req.body;
  const newProduct = {...data, id: products.length};
  products = [...products, newProduct];
  res.render("products", {products: [...products]});
  io.emit("newProduct", newProduct);
});

app.put("/api/products/update/:id", (req, res) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1) {
    products[productId] = {...req.body, id: productId};
    res.render("products", {products: [products[productId]]});
  } else {
    res.send("Product not found");
  }
});

app.delete("/api/products/delete/:id", (req, res) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1) {
    const deletedItem = products.splice(productId, 1);
    res.render("products", {products: [deletedItem[0]]});
  } else {
    res.send("Product not found");
  }
});

io.on("connection", (socket) => {
  console.log("New connection");
});

// Port
httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
