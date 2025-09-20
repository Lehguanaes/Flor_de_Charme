import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

// Importando a logo e ícones (desktop)
import logo from "../../assets/logo/logo_navbar.png";
import perfil_icone from "../../assets/icones/perfil_icone.png";
import info_icone from "../../assets/icones/info_icone.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Links com ícones do Material Symbols (para menu mobile)
  const links = [
    { name: "Vendas", href: "#", icon: "shopping_cart" },
    { name: "Produtos", href: "#", icon: "inventory_2" },
    { name: "Clientes", href: "#", icon: "people" },
    { name: "Veículos", href: "#", icon: "directions_car" },
    { name: "Região", href: "#", icon: "distance" },
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
          <img src={info_icone} alt="Ícone Info" className="info-icone" />
          <img src={perfil_icone} alt="Ícone Perfil" className="perfil-icone" />

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