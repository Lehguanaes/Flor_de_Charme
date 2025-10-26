import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../apiSupabase"; // conexão Supabase
import "./Login.css";
import olhoFechado from "../../assets/mostrarSenha.png";
import olhoAberto from "../../assets/setMostrarSenha.png";

function Login({ onLogin }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  // 🧠 Máscara de CPF
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove não numéricos
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  // ✅ Função de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cpf.trim() === "" || senha.trim() === "") {
      alert("Preencha os campos para continuar!");
      return;
    }

    // Remove máscara para comparar com o banco
    const cpfLimpo = cpf.replace(/\D/g, "");

    try {
      // 1️⃣ Verifica se CPF + senha existem na tabela 'conta'
      const { data: conta, error: contaError } = await supabase
        .from("conta")
        .select("*")
        .eq("cpf_vendedor", cpfLimpo)
        .eq("senha_vendedor", senha)
        .single();

      if (contaError || !conta) {
        alert("CPF ou senha inválidos.");
        return;
      }

      // 2️⃣ Busca dados do vendedor na tabela 'vendedor'
      const { data: vendedor, error: vendedorError } = await supabase
        .from("vendedor")
        .select("*")
        .eq("cpf_vendedor", cpfLimpo)
        .single();

      if (vendedorError || !vendedor) {
        alert("Vendedor não encontrado.");
        return;
      }

      // 3️⃣ Salva dados na sessão
      sessionStorage.setItem("vendedorId", cpfLimpo);
      sessionStorage.setItem("vendedorNome", vendedor.nome_vendedor);

      // 4️⃣ Executa callback e navega
      onLogin();
      navigate("/vendas");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Ocorreu um erro ao tentar logar.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Acesso ao Sistema</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {/* Campo CPF com máscara */}
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={handleCpfChange}
          maxLength={14}
          className="login-input"
        />

        {/* Campo senha com botão mostrar/ocultar */}
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
