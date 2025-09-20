import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} Flor de Charme. Todos os direitos reservados.
      </p>
    </footer>
  );
}