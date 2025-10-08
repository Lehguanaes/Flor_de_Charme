import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // seu setup do Firestore
import "./Login.css";
import olhoFechado from "../../assets/mostrarSenha.png";
import olhoAberto from "../../assets/setMostrarSenha.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState(""); // será cpf@dominio.com
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || senha.trim() === "") {
      alert("Preencha os campos para continuar!");
      return;
    }

    try {
      // Login no Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);

      // Extrai o CPF da parte antes do @
      const cpf = email.split("@")[0];

      // Busca dados do vendedor no Firestore usando o CPF como ID
      const docRef = doc(db, "vendedor", cpf);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dados = docSnap.data();

        // Aqui você pode salvar o vendedor na sessão, por exemplo:
        sessionStorage.setItem("vendedorId", cpf);
        sessionStorage.setItem("vendedorNome", dados.nome);

        onLogin();
        navigate("/vendas");
      } else {
        alert("Vendedor não encontrado no Firestore.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Acesso ao Sistema</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="CPF"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <div className="login-senha-container">
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="login-input"
          />
          <button
            type="button"
            className="senha-toggle"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            aria-label="Mostrar ou ocultar senha"
          >
            <img
              src={mostrarSenha ? olhoFechado : olhoAberto}
              alt={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </div>
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
