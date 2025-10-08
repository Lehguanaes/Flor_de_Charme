import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo_navbar.png";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Lado esquerdo com a logo animada */}
      <div className="home-left">
        <img src={logo} alt="Logo Flor de Charme" className="home-logo" />
      </div>

      {/* Linha vertical separadora */}
      <div className="home-divider"></div>

      {/* Lado direito com o texto e botão */}
      <div className="home-right">
        <h1>Olá, vendedor!</h1>
        <p>
          Pronto para fazer novas consultas e vendas?
          <br />
          Vamos acessar o sistema.
        </p>
        <Link to="/login" className="home-button">
          Entrar no sistema
        </Link>
      </div>
    </div>
  );
}
