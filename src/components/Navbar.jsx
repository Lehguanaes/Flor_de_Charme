import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

// Importando as Imagens
import logo from "../assets/logo/logo_navbar.png";
import perfil_icone from "../assets/icones/perfil_icone.png";
import info_icone from "../assets/icones/info_icone.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Vendas", href: "#" },
    { name: "Produtos", href: "#" },
    { name: "Clientes", href: "#" },
    { name: "Veículos", href: "#" },
    { name: "Região", href: "#" },
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

        {/* Ícones (Info + Perfil) */}
        <div className="icones-container">
          <img src={info_icone} alt="Ícone Info" className="info-icone" />
          <img src={perfil_icone} alt="Ícone Perfil" className="perfil-icone" />

          {/* Botão Mobile */}
          <button
            className={`mobile-menu-button ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Links Mobile */}
      <div className={`mobile-links ${open ? "open" : ""}`}>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="nav-link"
            onClick={() => setOpen(false)} // fecha ao clicar
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}