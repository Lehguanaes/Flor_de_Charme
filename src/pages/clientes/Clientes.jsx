import { useState, useEffect } from "react";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase"; // ajuste o caminho se necessário
import "./Clientes.css";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [novoCliente, setNovoCliente] = useState({ cpf_cliente: "", nome_cliente: "" });

  // Função para carregar clientes do Firestore
  const carregarClientes = async () => {
    try {
      const clientesCol = collection(db, "cliente");
      const clientesSnapshot = await getDocs(clientesCol);
      const clientesLista = clientesSnapshot.docs.map(doc => ({ cpf_cliente: doc.id, ...doc.data() }));
      setClientes(clientesLista);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      alert("Erro ao carregar clientes do banco.");
    }
  };

  // Carregar clientes quando o componente montar
  useEffect(() => {
    carregarClientes();
  }, []);

  // Visualizar Cliente
  const visualizarCliente = (cliente) => {
    alert(`Detalhes do Cliente:\n\nCPF: ${cliente.cpf_cliente}\nNome: ${cliente.nome_cliente}`);
  };

  // Editar Cliente
  const editarCliente = (cliente) => {
    setClienteEditando(cliente);
    setNovoCliente({ cpf_cliente: cliente.cpf_cliente, nome_cliente: cliente.nome_cliente });
  };

  // Salvar edição no Firestore
  const salvarEdicao = async () => {
    try {
      const clienteRef = doc(db, "clientes", novoCliente.cpf_cliente);
      await setDoc(clienteRef, { nome_cliente: novoCliente.nome_cliente });
      // Atualizar estado local
      setClientes(clientes.map(c => c.cpf_cliente === novoCliente.cpf_cliente ? novoCliente : c));
      setClienteEditando(null);
      setNovoCliente({ cpf_cliente: "", nome_cliente: "" });
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      alert("Erro ao salvar cliente no banco.");
    }
  };

  // Excluir Cliente no Firestore
  const excluirCliente = async (cpf) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        const clienteRef = doc(db, "clientes", cpf);
        await deleteDoc(clienteRef);
        setClientes(clientes.filter(c => c.cpf_cliente !== cpf));
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        alert("Erro ao excluir cliente do banco.");
      }
    }
  };

  // Adicionar Novo Cliente no Firestore
  const adicionarCliente = async () => {
    if (!novoCliente.cpf_cliente || !novoCliente.nome_cliente) {
      alert("Preencha CPF e Nome!");
      return;
    }
    try {
      const clienteRef = doc(db, "clientes", novoCliente.cpf_cliente);
      await setDoc(clienteRef, { nome_cliente: novoCliente.nome_cliente });
      setClientes([...clientes, { ...novoCliente }]);
      setNovoCliente({ cpf_cliente: "", nome_cliente: "" });
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      alert("Erro ao adicionar cliente no banco.");
    }
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
            onChange={(e) => setNovoCliente({ ...novoCliente, cpf_cliente: e.target.value })}
            disabled={clienteEditando !== null} // desabilita edição do CPF ao editar
          />
          <input
            type="text"
            placeholder="Nome"
            value={novoCliente.nome_cliente}
            onChange={(e) => setNovoCliente({ ...novoCliente, nome_cliente: e.target.value })}
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
