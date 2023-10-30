const express = require("express");

var cors = require("cors");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var productos = [
  {
    nombre: "Cocacola",
    precio: "1500",
    descripcion: "Bebida azucarada del mal",
  },
  {
    nombre: "Chocorramo",
    precio: "2000",
    descripcion: "Postre que disfrutan los adinerados",
  },
];

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.get("/productos", (req, res) => {
  res.send(productos);
});

app.get("/productos/:nombre", (req, res) => {
  let nombre = req.params.nombre;

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === nombre) {
      res.send(productos[i]);
    }
  }

  res.send({ error: "No se encontro el código" });
});

app.post("/productos", (req, res) => {
  let producto = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
  };

  productos.push(producto);

  res.send({ Ok: "Objeto registrado" });
});

app.delete("/productos/:nombre", (req, res) => {
  let nombre = req.params.nombre;

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === nombre) {
      let producto = productos[i];
      productos.splice(i, 1);
      res.send(producto);
    }
  }

  res.send({ error: "No se encontro el producto" });
});

app.put("/productos/:nombre", (req, res) => {
  let nombre = req.params.nombre;

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === nombre) {
      let producto = productos[i];
      producto.nombre = req.body.nombre;
      producto.precio = req.body.precio;
      producto.descripcion = req.body.descripcion;
      res.send(producto);
    }
  }

  res.send({ error: "No se encontro el producto" });
});

app.listen(3001, () => {
  console.log("server started");
});
