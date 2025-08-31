const API_URL = "http://localhost:5000/api/productos";

// ✅ Obtener inventario
export const getInventory = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error en la respuesta del servidor");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener inventario:", error);
    return []; // Devuelve array vacío si falla
  }
};

// ✅ Agregar producto
export const addItem = async (item) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error al agregar producto: ${errText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error; // Lanza el error para que InventoryForm lo capture
  }
};

// ✅ Eliminar producto
export const deleteItem = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error al eliminar producto: ${errText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateItem = async (id, updatedItem) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error al actualizar producto: ${errText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
