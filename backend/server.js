const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db"); // Asegúrate de que la ruta a tu conexión sea correcta

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ GET: Obtener todos los productos
app.get("/api/productos", (req, res) => {
  const sql = "SELECT * FROM productos ORDER BY fechaIngreso DESC";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      return res.status(500).json({ error: "Error al obtener productos" });
    }
    res.json(results);
  });
});

// ✅ POST: Agregar un nuevo producto
app.post("/api/productos", (req, res) => {
  const { nombre, cantidad, costoIndividual, costoTotal, fechaIngreso } = req.body;
  const sql =
    "INSERT INTO productos (nombre, cantidad, costoIndividual, costoTotal, fechaIngreso) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [nombre, cantidad, costoIndividual, costoTotal, fechaIngreso],
    (err, result) => {
      if (err) {
        console.error("Error al insertar producto:", err);
        return res.status(500).json({ error: "Error al guardar el producto" });
      }
      res.json({
        message: "Producto guardado correctamente",
        id: result.insertId,
      });
    }
  );
});

// ✅ DELETE: Eliminar un producto
app.delete("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM productos WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar producto:", err);
      return res.status(500).json({ error: "Error al eliminar producto" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  });
});

// ✅ PUT: Actualizar un producto
app.put("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, cantidad, costoIndividual, costoTotal, fechaIngreso } = req.body;

  const sql = `
    UPDATE productos 
    SET nombre = ?, cantidad = ?, costoIndividual = ?, costoTotal = ?, fechaIngreso = ? 
    WHERE id = ?
  `;

  connection.query(
    sql,
    [nombre, cantidad, costoIndividual, costoTotal, fechaIngreso, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar producto:", err);
        return res.status(500).json({ error: "Error al actualizar producto" });
      }
      res.json({ message: "Producto actualizado correctamente" });
    }
  );
});

// ✅ Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});