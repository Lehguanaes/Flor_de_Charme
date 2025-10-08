import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import "./NavBarPublica.css";
import logo from "../../assets/logo/logo_navbar.png";

export default function NavBarPublica() {
  return (
    <nav className="navbar-publica">
      <div className="nav-content">
        {/* Logo à esquerda */}
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Ícone e botão no canto direito */}
        <div className="nav-actions">
          <Link to="/sobreNos" className="nav-icon" title="Sobre Nós">
            <Info size={26} />
          </Link>

          <Link to="/login" className="nav-login-btn">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
