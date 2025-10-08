import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [nome_vendedor, setNome] = useState("");
  const [cpf_vendedor, setCpf] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ login falso
    if (nome_vendedor.trim() !== "" && cpf_vendedor.trim() !== "") {
      onLogin();
      navigate("/vendas");
    } else {
      alert("Preencha os campos para continuar!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Acesso ao Sistema</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Nome"
          value={nome_vendedor}
          onChange={(e) => setNome(e.target.value)}
          className="login-input"
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf_vendedor}
          onChange={(e) => setCpf(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
