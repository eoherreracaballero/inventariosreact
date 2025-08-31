import React from "react";
import { FaTrash } from "react-icons/fa";

const InventoryList = ({ items, onDelete, onEdit }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.header}>Producto</th>
          <th style={styles.header}>Cantidad</th>
          <th style={styles.header}>Fecha de ingreso</th>
          <th style={styles.header}>Costo Individual</th>
          <th style={styles.header}>Costo Total</th>
          <th style={styles.header}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} style={styles.row}>
            <td>{item.nombre}</td>
            <td>{item.cantidad}</td>
            <td>
              {new Date(item.fechaIngreso).toLocaleDateString("es-CO", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </td>
            <td>{item.costoIndividual}</td>
            <td>{item.costoTotal}</td>
            <td>
              <button
                style={styles.button}
                onClick={() => onDelete(item.id)}
              >
                <FaTrash /> Eliminar
              </button>
              <button
                style={styles.buttonEdit}
                onClick={() => onEdit(item)}
              >
                ✏️ Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: "70%",
    margin: "0 auto",
    borderCollapse: "collapse",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#3248a8",
    color: "white",
    padding: "12px",
    fontSize: "16px",
    textAlign: "center",
  },
  row: {
    textAlign: "center",
    backgroundColor: "#e9eaf0",
    height: "40px",
    transition: "background-color 0.3s",
  },
  button: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "6px 10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  buttonEdit: {
    backgroundColor: "#f1c40f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "6px 10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginLeft: "5px",
  },
};

export default InventoryList;
