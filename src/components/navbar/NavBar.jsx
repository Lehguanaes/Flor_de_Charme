import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./NavBar.css";
import { Link } from "react-router-dom"; 

// Importando a logo
import logo from "../../assets/logo/logo_navbar.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Links com ícones do Material Symbols (para menu mobile)
  const links = [
    { name: "Vendas", href: "Vendas", icon: "shopping_cart" },
    { name: "Produtos", href: "Produtos", icon: "inventory_2" },
    { name: "Clientes", href: "Clientes", icon: "people" },
    { name: "Veículos", href: "Veiculos", icon: "directions_car" },
    { name: "Regiões", href: "Regioes", icon: "distance" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {/* Links desktop */}
        <div className="links-container">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        {/* Ícones desktop e botão mobile */}
            <div className="icones-container">
  {/* Ícone "info" leva para Sobre Nós */}
  <Link to="/SobreNos">
    <span className="material-symbols-outlined">info</span>
  </Link>
          {/* Ícone "account_circle" só exibe */}
  <span className="material-symbols-outlined">account_circle</span>

          <button
            className={`mobile-menu-button ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Links mobile */}
      <div className={`mobile-links ${open ? "open" : ""}`}>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="nav-link mobile-link"
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}