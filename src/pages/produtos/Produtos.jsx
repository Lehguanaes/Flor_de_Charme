import { useState, useEffect } from "react";
import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase"; // ajuste o caminho se precisar
import "./Produtos.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [novoProduto, setNovoProduto] = useState({
    id: "",
    descricao_produto: "",
    quantidade_produto: "",
    preco_produto: "",
  });

  // Carregar produtos do Firestore
  const carregarProdutos = async () => {
    try {
      const produtosCol = collection(db, "produto");
      const produtosSnapshot = await getDocs(produtosCol);
      const listaProdutos = produtosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        quantidade_produto: doc.data().quantidade_produto || 0,
        preco_produto: doc.data().preco_produto || 0,
      }));
      setProdutos(listaProdutos);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      alert("Erro ao carregar produtos do banco.");
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Adicionar produto
  const adicionarProduto = async () => {
    if (!novoProduto.id || !novoProduto.descricao_produto || novoProduto.quantidade_produto === "" || novoProduto.preco_produto === "") {
      alert("Preencha todos os campos, incluindo o ID!");
      return;
    }

    const quantidade = parseInt(novoProduto.quantidade_produto);
    const preco = parseFloat(novoProduto.preco_produto);

    if (isNaN(quantidade) || quantidade < 0) {
      alert("Quantidade deve ser um número inteiro positivo");
      return;
    }

    if (isNaN(preco) || preco < 0) {
      alert("Preço deve ser um número positivo");
      return;
    }

    try {
      const produtoRef = doc(db, "produto", novoProduto.id);
      await setDoc(produtoRef, {
        descricao_produto: novoProduto.descricao_produto,
        quantidade_produto: quantidade,
        preco_produto: preco,
      });

      setProdutos([
        ...produtos,
        {
          id: novoProduto.id,
          descricao_produto: novoProduto.descricao_produto,
          quantidade_produto: quantidade,
          preco_produto: preco,
        },
      ]);
      setNovoProduto({ id: "", descricao_produto: "", quantidade_produto: "", preco_produto: "" });
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto no banco.");
    }
  };

  // Iniciar edição
  const editarProduto = (produto) => {
    setProdutoEditando(produto);
    setNovoProduto({
      id: produto.id,
      descricao_produto: produto.descricao_produto,
      quantidade_produto: produto.quantidade_produto.toString(),
      preco_produto: produto.preco_produto.toString(),
    });
  };

  // Salvar edição
  const salvarEdicao = async () => {
    if (!novoProduto.id || !novoProduto.descricao_produto || novoProduto.quantidade_produto === "" || novoProduto.preco_produto === "") {
      alert("Preencha todos os campos, incluindo o ID!");
      return;
    }

    const quantidade = parseInt(novoProduto.quantidade_produto);
    const preco = parseFloat(novoProduto.preco_produto);

    if (isNaN(quantidade) || quantidade < 0) {
      alert("Quantidade deve ser um número inteiro positivo");
      return;
    }

    if (isNaN(preco) || preco < 0) {
      alert("Preço deve ser um número positivo");
      return;
    }

    try {
      const produtoRef = doc(db, "produto", produtoEditando.id);
      await updateDoc(produtoRef, {
        descricao_produto: novoProduto.descricao_produto,
        quantidade_produto: quantidade,
        preco_produto: preco,
      });

      setProdutos(produtos.map(p =>
        p.id === produtoEditando.id
          ? { ...p, descricao_produto: novoProduto.descricao_produto, quantidade_produto: quantidade, preco_produto: preco }
          : p
      ));

      setProdutoEditando(null);
      setNovoProduto({ id: "", descricao_produto: "", quantidade_produto: "", preco_produto: "" });
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto no banco.");
    }
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setProdutoEditando(null);
    setNovoProduto({ id: "", descricao_produto: "", quantidade_produto: "", preco_produto: "" });
  };

  // Excluir produto
  const excluirProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const produtoRef = doc(db, "produto", id);
        await deleteDoc(produtoRef);
        setProdutos(produtos.filter(p => p.id !== id));
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto do banco.");
      }
    }
  };

  return (
    <section className="produtos">
      <div className="form-produto">
        <h2>{produtoEditando ? "Editar Produto" : "Adicionar Novo Produto"}</h2>
        <div className="inputs-form">
          <input
            type="text"
            placeholder="ID do Produto"
            value={novoProduto.id}
            onChange={e => setNovoProduto({ ...novoProduto, id: e.target.value })}
            disabled={produtoEditando !== null} // não deixa alterar o ID ao editar
          />
          <input
            type="text"
            placeholder="Descrição"
            value={novoProduto.descricao_produto}
            onChange={e => setNovoProduto({ ...novoProduto, descricao_produto: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantidade"
            min="0"
            value={novoProduto.quantidade_produto}
            onChange={e => setNovoProduto({ ...novoProduto, quantidade_produto: e.target.value })}
          />
          <input
            type="number"
            placeholder="Preço"
            min="0"
            step="0.01"
            value={novoProduto.preco_produto}
            onChange={e => setNovoProduto({ ...novoProduto, preco_produto: e.target.value })}
          />
        </div>
        <div className="botoes-form">
          {produtoEditando ? (
            <>
              <button onClick={salvarEdicao} className="btn-salvar">Salvar</button>
              <button onClick={cancelarEdicao} className="btn-cancelar">Cancelar</button>
            </>
          ) : (
            <button onClick={adicionarProduto} className="btn-adicionar">Adicionar Produto</button>
          )}
        </div>
      </div>

      <div className="lista-produtos">
        <h2>Lista de Produtos</h2>
        {produtos.length === 0 ? (
          <p className="sem-produtos">Nenhum produto cadastrado</p>
        ) : (
          <div className="tabela-produtos">
            <div className="cabecalho-tabela">
              <span>ID</span>
              <span>Descrição</span>
              <span>Quantidade</span>
              <span>Preço</span>
              <span>Ações</span>
            </div>
            {produtos.map(produto => (
              <div key={produto.id} className="linha-produto">
                <span>{produto.id}</span>
                <span>{produto.descricao_produto}</span>
                <span>{produto.quantidade_produto}</span>
                <span>R$ {produto.preco_produto.toFixed(2)}</span>
                <div className="acoes">
                  <button onClick={() => editarProduto(produto)} className="btn-editar">✏️ Editar</button>
                  <button onClick={() => excluirProduto(produto.id)} className="btn-excluir">🗑️ Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
