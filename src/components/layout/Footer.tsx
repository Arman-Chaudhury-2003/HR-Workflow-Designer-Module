export const Footer = () => {
  return (
    <footer
      style={{
        padding: "0.85rem 1.4rem",
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#64748b",
        borderTop: "1px solid #e2e8f0",
        marginTop: "auto",
        background: "#f8fafc",
      }}
    >
      © {new Date().getFullYear()} <strong>Crafted by - Arman Chaudhury</strong>{" "}
      — All Rights Reserved.
    </footer>
  );
};
