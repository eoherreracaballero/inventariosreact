import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}> El Palacio de las Delicias</h2>
      <ul style={styles.navItems}>
        <li style={styles.item}>Inventario</li>
        <li style={styles.item}>Ventas</li>
        <li style={styles.item}>Reportes</li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff69b4", // Rosa fuerte
    color: "white",
    padding: "15px 30px",
  },
  title: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  navItems: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  item: {
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Navbar;
