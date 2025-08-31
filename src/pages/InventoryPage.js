import React, { useState, useEffect } from "react";
import InventoryList from "../components/Inventory/InventoryList";
import InventoryForm from "../components/Inventory/InventoryForm";
import { getInventory, addItem, deleteItem } from "../services/inventoryService";
import "../App.css";
import { FaSearch } from "react-icons/fa";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // ✅ Carga inicial del inventario desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInventory();
        setInventory(data);
      } catch (err) {
        setError("No se pudo cargar el inventario.");
      }
    };
    fetchData();
  }, []);

  // ✅ Agregar producto
  const handleAdd = async (item) => {
    const newItem = {
      nombre: item.nombre,
      cantidad: item.cantidad,
      costoIndividual: item.costoIndividual,
      costoTotal: item.costoTotal,
      fechaIngreso: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    await addItem(newItem);
    const updated = await getInventory();
    setInventory(updated);
  };

  // ✅ Eliminar producto
  const handleDelete = async (id) => {
    await deleteItem(id);
    const updated = await getInventory();
    setInventory(updated);
  };

  // ✅ Editar producto
  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  // ✅ Actualizar inventario después de editar
  const handleUpdate = async () => {
    const updated = await getInventory();
    setInventory(updated);
    setEditingItem(null);
  };

  // ✅ Filtrar productos
  const filteredInventory = inventory.filter((item) =>
    item.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Heladería El Palacio de las Delicias
      </h1>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        Inventario de Heladería
      </h2>

      {/* 🔍 Barra de búsqueda */}
      <div
        style={{
          width: "70%",
          margin: "10px auto",
          position: "relative",
        }}
      >
        <FaSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#888",
          }}
        />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 10px 10px 35px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />
      </div>

      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      <InventoryForm
        onAdd={handleAdd}
        editingItem={editingItem}
        onUpdate={handleUpdate}
      />
      <InventoryList
        items={filteredInventory}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />
    </div>
  );
};

export default InventoryPage;