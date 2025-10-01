import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Login.css";

function Login({ onLogin }) {
  const [nome_vendedor, setNome] = useState("");
  const [cpf_vendedor, setCpf] = useState("");
  const navigate = useNavigate(); // 👈 hook de navegação

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome_vendedor, cpf_vendedor }),
});

      const data = await response.json();

      if (data.success) {
        onLogin(); // seta como logado no React
        navigate("/vendas"); // 👈 redireciona após login
      } else {
        alert(data.message || "Login inválido");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
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
