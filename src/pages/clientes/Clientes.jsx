import { useState, useEffect } from "react";
import { supabase } from "../../apiSupabase";
import InputMask from "react-input-mask";
import './Clientes.css';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [novoCliente, setNovoCliente] = useState({
    cpf_cliente: "",
    nome_cliente: "",
    telefone: "",
    
  });

  

  // Carregar clientes
  useEffect(() => {
    const carregarClientes = async () => {
      let { data, error } = await supabase.from("cliente").select("*");
      if (error) {
        console.error(error);
        alert("Erro ao carregar clientes");
      } else {
        setClientes(data);
      }
    };
    carregarClientes();
  }, []);

  // Adicionar cliente
  const adicionarCliente = async () => {
    if (!novoCliente.cpf_cliente || !novoCliente.nome_cliente || !novoCliente.telefone) {
      alert("Preencha todos os campos!");
      return;
    }

    const { data, error } = await supabase.from("cliente").insert([novoCliente]);
    if (error) {
      console.error(error);
      alert("Erro ao adicionar cliente");
    } else {
      setClientes([...clientes, novoCliente]);
      setNovoCliente({ cpf_cliente: "", nome_cliente: "", telefone: "" });
    }
  };

  // Editar cliente
  const editarCliente = (cliente) => {
    setClienteEditando(cliente);
    setNovoCliente(cliente);
  };

  const salvarEdicao = async () => {
    const { data, error } = await supabase
      .from("cliente")
      .update({
        nome_cliente: novoCliente.nome_cliente,
        telefone: novoCliente.telefone,
      })
      .eq("cpf_cliente", novoCliente.cpf_cliente);

    if (error) {
      console.error(error);
      alert("Erro ao salvar cliente");
    } else {
      setClientes(clientes.map(c => c.cpf_cliente === novoCliente.cpf_cliente ? novoCliente : c));
      setClienteEditando(null);
      setNovoCliente({ cpf_cliente: "", nome_cliente: "", telefone: "" });
    }
  };

  const cancelarEdicao = () => {
    setClienteEditando(null);
    setNovoCliente({ cpf_cliente: "", nome_cliente: "", telefone: "" });
  };

  const excluirCliente = async (cpf) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      const { data, error } = await supabase.from("cliente").delete().eq("cpf_cliente", cpf);
      if (error) {
        console.error(error);
        alert("Erro ao excluir cliente");
      } else {
        setClientes(clientes.filter(c => c.cpf_cliente !== cpf));
      }
    }
  };

  const formatCPF = (cpf) => {
  if (!cpf) return "";
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

const formatTelefone = (tel) => {
  if (!tel) return "";
  return tel.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
};


  return (
    <section className="clientes">
      <div className="form-cliente">
        <h2>{clienteEditando ? "Editar Cliente" : "Adicionar Novo Cliente"}</h2>
        <div className="inputs-form">
          <InputMask
            mask="999.999.999-99"
            placeholder="CPF"
            value={novoCliente.cpf_cliente}
            onChange={e => setNovoCliente({ ...novoCliente, cpf_cliente: e.target.value })}
            disabled={clienteEditando !== null}
          />
          <input
            type="text"
            placeholder="Nome"
            value={novoCliente.nome_cliente}
            onChange={e => setNovoCliente({ ...novoCliente, nome_cliente: e.target.value })}
          />
          <InputMask
            mask="(99) 99999-9999"
            placeholder="Telefone"
            value={novoCliente.telefone}
            onChange={e => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
          />
        </div>
        <div className="botoes-form">
          {clienteEditando ? (
            <>
              <button onClick={salvarEdicao} className="btn-salvar">Salvar</button>
              <button onClick={cancelarEdicao} className="btn-cancelar">Cancelar</button>
            </>
          ) : (
            <button onClick={adicionarCliente} className="btn-adicionar">Adicionar Cliente</button>
          )}
        </div>
      </div>

      <div className="lista-clientes">
        <h2>Lista de Clientes</h2>
        {clientes.length === 0 ? (
          <p className="sem-clientes">Nenhum cliente cadastrado</p>
        ) : (
          <div className="tabela-clientes">
            <div className="cabecalho-tabela">
              <span>CPF</span>
              <span>Nome</span>
              <span>Telefone</span>
              <span>Ações</span>
            </div>
            {clientes.map(cliente => (
              <div key={cliente.cpf_cliente} className="linha-cliente">
                <span>{formatCPF(cliente.cpf_cliente)}</span>
                <span>{cliente.nome_cliente}</span>
                <span>{formatTelefone(cliente.telefone)}</span>
                <div className="acoes">
                  <button onClick={() => editarCliente(cliente)} className="btn-editar">✏️ </button>
                  <button onClick={() => excluirCliente(cliente.cpf_cliente)} className="btn-excluir">🗑️ </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
