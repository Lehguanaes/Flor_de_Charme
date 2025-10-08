import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // ajuste o caminho se necessário
import "./Login.css";

function Login({ onLogin }) {
  const [id, setId] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id.trim() === "" || senha.trim() === "") {
      alert("Preencha os campos para continuar!");
      return;
    }

    try {
      // Busca o documento diretamente pelo ID (CPF)
      const docRef = doc(db, "vendedor", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dados = docSnap.data();

        if (dados.senha === senha) {
          // Senha correta
          onLogin();
          navigate("/vendas");
        } else {
          alert("Senha incorreta.");
        }
      } else {
        alert("Vendedor não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao conectar com o banco de dados.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Acesso ao Sistema</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="CPF"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
