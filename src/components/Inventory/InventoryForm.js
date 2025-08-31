import React, { useState, useEffect } from "react";
import { addItem, updateItem } from "../../services/inventoryService"; // Ruta al servicio

const InventoryForm = ({ onAdd, editingItem, onUpdate }) => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [unitCost, setUnitCost] = useState(""); // costo individual

  // Cargar datos si estamos editando
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.nombre);
      setStock(editingItem.cantidad.toString());
      setUnitCost(editingItem.costoIndividual.toString());
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || stock.trim() === "" || unitCost.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const cantidad = parseInt(stock, 10);
    const costoIndividual = parseFloat(unitCost);
    const costoTotal = cantidad * costoIndividual;

    const nuevoProducto = {
      nombre: name,
      cantidad,
      costoIndividual,
      costoTotal,
      fechaIngreso: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    try {
      if (editingItem) {
        // 🔹 Verificamos que exista el id
        const productoId = editingItem.id || editingItem.ID_Producto; // Ajusta si tu backend devuelve otro nombre
        if (!productoId) {
          alert("No se pudo determinar el ID del producto a actualizar");
          return;
        }

        console.log("Actualizando producto con ID:", productoId, nuevoProducto);
        await updateItem(productoId, nuevoProducto);
        if (onUpdate) onUpdate();
      } else {
        console.log("Agregando nuevo producto:", nuevoProducto);
        await addItem(nuevoProducto);
        if (onAdd) onAdd(nuevoProducto);
      }

      // Limpiar campos
      setName("");
      setStock("");
      setUnitCost("");
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      alert("Hubo un error al guardar el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Costo individual"
        value={unitCost}
        onChange={(e) => setUnitCost(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        {editingItem ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    width: "70%",
    marginInline: "auto",
    justifyContent: "center",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    flex: "1",
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default InventoryForm;

