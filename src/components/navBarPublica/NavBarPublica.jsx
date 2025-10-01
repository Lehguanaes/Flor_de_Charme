import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./NavbarPublica.css"; // pode usar o mesmo CSS
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo_navbar.png";

export default function NavbarPublica() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Sobre Nós", href: "/SobreNos", icon: "info" },
    { name: "Login", href: "/Login", icon: "account_circle" },
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
            <Link key={link.name} to={link.href} className="nav-link">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Botão mobile */}
        <div className="icones-container">
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
          <Link
            key={link.name}
            to={link.href}
            className="nav-link mobile-link"
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
