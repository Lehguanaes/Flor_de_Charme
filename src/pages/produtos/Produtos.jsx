import { useState, useEffect } from "react";
import { supabase } from "../../apiSupabase";
import "./Produtos.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [novoProduto, setNovoProduto] = useState({
    descricao_produto: "",
    quantidade_produto: "",
    preco_produto: "",
  });
  const [mostrarTabela, setMostrarTabela] = useState(true);

  // Carregar produtos do Supabase
  const carregarProdutos = async () => {
    try {
      const { data, error } = await supabase
        .from("produto")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProdutos(data || []);
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
    if (!novoProduto.descricao_produto || novoProduto.quantidade_produto === "" || novoProduto.preco_produto === "") {
      alert("Preencha todos os campos!");
      return;
    }

    const quantidade = parseInt(novoProduto.quantidade_produto);
    const preco = parseFloat(novoProduto.preco_produto);

    if (isNaN(quantidade) || quantidade <= 0) {
      alert("Quantidade deve ser um número inteiro positivo");
      return;
    }

    if (isNaN(preco) || preco <= 0) {
      alert("Preço deve ser um número positivo");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("produto")
        .insert([{
          descricao_produto: novoProduto.descricao_produto,
          quantidade_produto: quantidade,
          preco_produto: preco
        }])
        .select();

      if (error) throw error;
      setProdutos([data[0], ...produtos]);
      setNovoProduto({ descricao_produto: "", quantidade_produto: "", preco_produto: "" });
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto no banco.");
    }
  };

  // Iniciar edição
  const editarProduto = (produto) => {
    setProdutoEditando(produto);
    setNovoProduto({
      descricao_produto: produto.descricao_produto,
      quantidade_produto: produto.quantidade_produto.toString(),
      preco_produto: produto.preco_produto.toString(),
    });
  };

  // Salvar edição
  const salvarEdicao = async () => {
    if (!novoProduto.descricao_produto || novoProduto.quantidade_produto === "" || novoProduto.preco_produto === "") {
      alert("Preencha todos os campos!");
      return;
    }

    const quantidade = parseInt(novoProduto.quantidade_produto);
    const preco = parseFloat(novoProduto.preco_produto);

    if (isNaN(quantidade) || quantidade <= 0) {
      alert("Quantidade deve ser um número inteiro positivo");
      return;
    }

    if (isNaN(preco) || preco <= 0) {
      alert("Preço deve ser um número positivo");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("produto")
        .update({
          descricao_produto: novoProduto.descricao_produto,
          quantidade_produto: quantidade,
          preco_produto: preco
        })
        .eq("codigo_produto", produtoEditando.codigo_produto)
        .select();

      if (error) throw error;

      setProdutos(produtos.map(p =>
        p.codigo_produto === produtoEditando.codigo_produto
          ? data[0]
          : p
      ));

      setProdutoEditando(null);
      setNovoProduto({ descricao_produto: "", quantidade_produto: "", preco_produto: "" });
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto no banco.");
    }
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setProdutoEditando(null);
    setNovoProduto({ descricao_produto: "", quantidade_produto: "", preco_produto: "" });
  };

  // Excluir produto
  const excluirProduto = async (codigo_produto) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      const { error } = await supabase
        .from("produto")
        .delete()
        .eq("codigo_produto", codigo_produto);

      if (error) throw error;

      setProdutos(produtos.filter(p => p.codigo_produto !== codigo_produto));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir produto do banco.");
    }
  };

  return (
    <section className="produtos">
      <div className="form-produto">
        <h2>{produtoEditando ? "Editar Produto" : "Adicionar Novo Produto"}</h2>
        <div className="inputs-form">
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
         <div className="preco-wrapper">
  <input
    type="number"
    placeholder="Preço"
    min="0"
    step="0.01"
    value={novoProduto.preco_produto}
    onChange={e => setNovoProduto({ ...novoProduto, preco_produto: e.target.value })}
  />
</div>
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
          <button
            onClick={() => setMostrarTabela(!mostrarTabela)}
            className="btn-toggle-tabela"
          >
            {mostrarTabela ? "Ocultar Produtos" : "Mostrar Produtos"}
          </button>
        </div>
      </div>


      {mostrarTabela && (
       <table className="tabela-produtos">
  <thead>
    <tr>
      <th>Descrição</th>
      <th>Quantidade</th>
      <th>Preço</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    {produtos.map((produto) => (
      <tr key={produto.codigo_produto}>
        <td>{produto.descricao_produto}</td>
        <td>{produto.quantidade_produto}</td>
        <td>R$ {produto.preco_produto.toFixed(2)}</td>
        <td className="acoes">
          <button onClick={() => editarProduto(produto)} className="btn-editar">✏️</button>
          <button onClick={() => excluirProduto(produto.codigo_produto)} className="btn-excluir">🗑️</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}
    </section>
  );
}
