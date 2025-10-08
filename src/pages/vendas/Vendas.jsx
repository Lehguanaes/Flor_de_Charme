import { useState, useEffect } from "react";
import { collection, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // ajuste o caminho se necessário
import "./Vendas.css";

export default function Vendas() {
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [nomeVendedor, setNomeVendedor] = useState("");
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const vendedorId = sessionStorage.getItem("vendedorId");

  // Carregar clientes do Firestore
  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const clientesCol = collection(db, "cliente");
        const clientesSnapshot = await getDocs(clientesCol);
        const listaClientes = clientesSnapshot.docs.map(doc => ({
          id: doc.id,
          nome: doc.data().nome_cliente || "Sem nome",
        }));
        setClientes(listaClientes);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        alert("Erro ao carregar clientes do banco.");
      }
    };

    carregarClientes();
  }, []);

  // Carregar produtos do Firestore
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const produtosCol = collection(db, "produto");
        const produtosSnapshot = await getDocs(produtosCol);
        const listaProdutos = produtosSnapshot.docs.map(doc => ({
          id: doc.id,
          descricao: doc.data().descricao_produto || "Sem descrição",
          quantidade: doc.data().quantidade_produto || 0,
          preco: doc.data().preco_produto || 0,
        }));
        setProdutos(listaProdutos);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        alert("Erro ao carregar produtos do banco.");
      }
    };

    carregarProdutos();
  }, []);

  // Buscar nome do vendedor
  useEffect(() => {
    const fetchNome = async () => {
      if (!vendedorId) {
        setNomeVendedor("");
        return;
      }
      try {
        const docRef = doc(db, "vendedor", vendedorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dados = docSnap.data();
          setNomeVendedor(dados.nome || "Vendedor");
        } else {
          setNomeVendedor("Vendedor");
        }
      } catch (error) {
        console.error("Erro ao buscar nome do vendedor:", error);
        setNomeVendedor("Vendedor");
      }
    };

    fetchNome();
  }, [vendedorId]);

  // Registrar venda com validação e atualização do estoque
  const registrarVenda = async () => {
    if (!cliente) {
      alert("Por favor, selecione um cliente.");
      return;
    }
    if (!produto) {
      alert("Por favor, selecione um produto.");
      return;
    }
    if (quantidade <= 0) {
      alert("Quantidade deve ser maior que zero.");
      return;
    }

    const produtoSelecionado = produtos.find(p => p.id === produto);
    if (!produtoSelecionado) {
      alert("Produto inválido.");
      return;
    }

    if (produtoSelecionado.quantidade < quantidade) {
      alert("Quantidade indisponível no estoque.");
      return;
    }

    try {
      // Atualiza o estoque no Firestore
      const produtoRef = doc(db, "produto", produtoSelecionado.id);
      await updateDoc(produtoRef, {
        quantidade_produto: produtoSelecionado.quantidade - quantidade,
      });

      alert("Venda registrada com sucesso!");

      // Atualiza localmente a lista de produtos para refletir o novo estoque
      setProdutos(produtos.map(p =>
        p.id === produtoSelecionado.id
          ? { ...p, quantidade: p.quantidade - quantidade }
          : p
      ));

      // Resetar campos do formulário
      setCliente("");
      setProduto("");
      setQuantidade(1);

    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      alert("Erro ao registrar venda no banco.");
    }
  };

  return (
    <section className="vendas">
      <div className="h1-vendedor">
        <h1>Bem-vindo(a), {nomeVendedor}!</h1>
      </div>
      <div className="form-venda">
        <div className="input-group">
          <label>Cliente:</label>
          <select
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            disabled={clientes.length === 0}
          >
            {clientes.length === 0 ? (
              <option value="">Nenhum cliente cadastrado</option>
            ) : (
              <>
                <option value="">Selecione um cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div className="input-group">
          <label>Produto:</label>
          <select
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            disabled={produtos.length === 0}
          >
            {produtos.length === 0 ? (
              <option value="">Nenhum produto cadastrado</option>
            ) : (
              <>
                <option value="">Selecione um produto</option>
                {produtos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.descricao} (Disponível: {p.quantidade}) - R$ {p.preco.toFixed(2)}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div className="input-group">
          <label>Quantidade:</label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={e => setQuantidade(parseInt(e.target.value) || 1)}
            disabled={clientes.length === 0 || produtos.length === 0}
          />
        </div>

        <button
          onClick={registrarVenda}
          className="btn-registrar"
          disabled={clientes.length === 0 || produtos.length === 0}
        >
          Registrar Venda
        </button>
      </div>
    </section>
  );
}
