const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Cambia por tu usuario de MySQL
  password: "", // Cambia por tu contraseña de MySQL
  database: "inventario_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

module.exports = connection;
