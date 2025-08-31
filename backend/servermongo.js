const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://mapabel0169:Santi1805%2B@cluster0.4ryqdnh.mongodb.net/heladeria?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Esquema de MongoDB
const InventarioSchema = new mongoose.Schema({
  nombre: String,
  cantidad: Number,
  fechaIngreso: Date,
  imagen: String,
});

const Inventario = mongoose.model("Inventario", InventarioSchema);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Rutas de inventario
app.get("/inventario", async (req, res) => {
  const inventario = await Inventario.find();
  res.json(inventario);
});

app.post("/inventario", async (req, res) => {
  const nuevo = new Inventario(req.body);
  await nuevo.save();
  res.json({ mensaje: "Guardado correctamente" });
});

// Inicia el servidor
app.listen(5000, () => {
  console.log("✅ Servidor corriendo en puerto 5000");
});
