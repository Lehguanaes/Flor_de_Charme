import { useState } from "react";
import "./Clientes.css";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [novoCliente, setNovoCliente] = useState({ cpf_cliente: "", nome_cliente: "" });

  // Visualizar Cliente
  const visualizarCliente = (cliente) => {
    alert(`Detalhes do Cliente:\n\nCPF: ${cliente.cpf_cliente}\nNome: ${cliente.nome_cliente}`);
  };

  // Editar Cliente
  const editarCliente = (cliente) => {
    setClienteEditando(cliente);
    setNovoCliente({ cpf_cliente: cliente.cpf_cliente, nome_cliente: cliente.nome_cliente });
  };

  const salvarEdicao = () => {
    setClientes(clientes.map(cliente => 
      cliente.cpf_cliente === clienteEditando.cpf_cliente
        ? { ...novoCliente }
        : cliente
    ));
    setClienteEditando(null);
    setNovoCliente({ cpf_cliente: "", nome_cliente: "" });
  };

  // Excluir Cliente
  const excluirCliente = (cpf) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      setClientes(clientes.filter(cliente => cliente.cpf_cliente !== cpf));
    }
  };

  // Adicionar Novo Cliente
  const adicionarCliente = () => {
    if (!novoCliente.cpf_cliente || !novoCliente.nome_cliente) {
      alert("Preencha CPF e Nome!");
      return;
    }
    setClientes([...clientes, { ...novoCliente }]);
    setNovoCliente({ cpf_cliente: "", nome_cliente: "" });
  };

  return (
    <section className="clientes">

      {/* Formulário para Adicionar/Editar */}
      <div className="form-cliente">
        <h2>{clienteEditando ? "Editar Cliente" : "Adicionar Novo Cliente"}</h2>
        <div className="inputs-form">
          <input
            type="text"
            placeholder="CPF"
            value={novoCliente.cpf_cliente}
            onChange={(e) => setNovoCliente({...novoCliente, cpf_cliente: e.target.value})}
          />
          <input
            type="text"
            placeholder="Nome"
            value={novoCliente.nome_cliente}
            onChange={(e) => setNovoCliente({...novoCliente, nome_cliente: e.target.value})}
          />
        </div>
        <div className="botoes-form">
          {clienteEditando ? (
            <>
              <button onClick={salvarEdicao} className="btn-salvar">Salvar</button>
              <button onClick={() => setClienteEditando(null)} className="btn-cancelar">Cancelar</button>
            </>
          ) : (
            <button onClick={adicionarCliente} className="btn-adicionar">Adicionar Cliente</button>
          )}
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="lista-clientes">
        <h2>Lista de Clientes</h2>
        
        {clientes.length === 0 ? (
          <p className="sem-clientes">Nenhum cliente cadastrado</p>
        ) : (
          <div className="tabela-clientes">
            <div className="cabecalho-tabela">
              <span>CPF</span>
              <span>Nome</span>
              <span>Ações</span>
            </div>
            {clientes.map(cliente => (
              <div key={cliente.cpf_cliente} className="linha-cliente">
                <span>{cliente.cpf_cliente}</span>
                <span>{cliente.nome_cliente}</span>
                <div className="acoes">
                  <button 
                    onClick={() => visualizarCliente(cliente)}
                    className="btn-visualizar"
                  >
                    👁️ Visualizar
                  </button>
                  <button 
                    onClick={() => editarCliente(cliente)}
                    className="btn-editar"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => excluirCliente(cliente.cpf_cliente)}
                    className="btn-excluir"
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
