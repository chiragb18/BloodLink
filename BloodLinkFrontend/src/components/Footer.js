import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Blood Bank Management System. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: { backgroundColor: "#d32f2f", padding: "10px", color: "white", textAlign: "center", position: "absolute", width: "100%", bottom: 0 }
};

export default Footer;
