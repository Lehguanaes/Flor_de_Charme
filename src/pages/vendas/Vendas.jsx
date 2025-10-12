import { useState, useEffect } from "react";
import { supabase } from "../../apiSupabase";
import "./Vendas.css";

export default function Vendas() {
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [verTabela, setVerTabela] = useState(null); // null = oculto, 'minhas' = minhas vendas, 'todas' = todas vendas

  const vendedorId = sessionStorage.getItem("vendedorId");
  const vendedorNome = sessionStorage.getItem("vendedorNome");

  // Carregar clientes
  useEffect(() => {
    const carregarClientes = async () => {
      const { data, error } = await supabase.from("cliente").select("*");
      if (error) {
        console.error("Erro ao carregar clientes:", error);
        return;
      }
      setClientes(data);
    };
    carregarClientes();
  }, []);

  // Carregar produtos
  useEffect(() => {
    const carregarProdutos = async () => {
      const { data, error } = await supabase.from("produto").select("*");
      if (error) {
        console.error("Erro ao carregar produtos:", error);
        return;
      }
      setProdutos(data);
    };
    carregarProdutos();
  }, []);

  // Registrar venda
  const registrarVenda = async () => {
    if (!cliente || !produto || quantidade <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const produtoSelecionado = produtos.find(p => p.codigo_produto === produto);
    if (!produtoSelecionado) {
      alert("Produto inválido.");
      return;
    }

    if (produtoSelecionado.quantidade_produto < quantidade) {
      alert("Quantidade indisponível no estoque.");
      return;
    }

    try {
      // Criar nota_fiscal
      const { data: novaNota, error: notaError } = await supabase
        .from("nota_fiscal")
        .insert([{ data: new Date().toISOString(), cpf_vendedor: vendedorId, cpf_cliente: cliente }])
        .select()
        .single();
      if (notaError) throw notaError;

      // Inserir itens_nota
      const { error: itensError } = await supabase
        .from("itens_nota")
        .insert([{ numero_nf: novaNota.numero_nf, codigo_produto: produtoSelecionado.codigo_produto, quantidade_pedida: quantidade }]);
      if (itensError) throw itensError;

      // Atualizar estoque do produto
      await supabase
        .from("produto")
        .update({ quantidade_produto: produtoSelecionado.quantidade_produto - quantidade })
        .eq("codigo_produto", produtoSelecionado.codigo_produto);

      alert("Venda registrada com sucesso!");
      setCliente("");
      setProduto("");
      setQuantidade(1);

      // Atualiza lista local de produtos
      setProdutos(produtos.map(p =>
        p.codigo_produto === produtoSelecionado.codigo_produto
          ? { ...p, quantidade_produto: p.quantidade_produto - quantidade }
          : p
      ));
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      alert("Erro ao registrar venda.");
    }
  };

  // Carregar vendas
  const carregarVendas = async (tipo) => {
    try {
      let query = supabase.from("nota_fiscal").select(`
        numero_nf,
        data,
        vendedor:cpf_vendedor(*),
        cliente:cpf_cliente(*),
        itens:itens_nota(*, produto:codigo_produto(*))
      `).order("data", { ascending: false });

      if (tipo === "minhas") query = query.eq("cpf_vendedor", vendedorId);

      const { data, error } = await query;
      if (error) throw error;
      setVendas(data);
      setVerTabela(verTabela === tipo ? null : tipo); // toggle
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
      alert("Erro ao carregar vendas.");
    }
  };

  return (
    <section className="vendas">
      <div className="h1-vendedor">
        <h1>Bem-vindo(a), {vendedorNome}!</h1>
      </div>

      <div className="form-venda">
        <div className="input-group">
          <label>Cliente:</label>
          <select value={cliente} onChange={e => setCliente(e.target.value)}>
            <option value="">Selecione um cliente</option>
            {clientes.map(c => (
              <option key={c.cpf_cliente} value={c.cpf_cliente}>{c.nome_cliente}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Produto:</label>
          <select value={produto} onChange={e => setProduto(e.target.value)}>
            <option value="">Selecione um produto</option>
            {produtos.map(p => (
              <option key={p.codigo_produto} value={p.codigo_produto}>
                {p.descricao_produto} (Disponível: {p.quantidade_produto}) - R$ {p.preco_produto.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Quantidade:</label>
          <input type="number" min="1" value={quantidade} onChange={e => setQuantidade(parseInt(e.target.value) || 1)} />
        </div>

        <button className="btn-registrar" onClick={registrarVenda}>Registrar Venda</button>
      </div>

      <div className="botoes-listagem">
        <button className="btn-listagem" onClick={() => carregarVendas("minhas")}>
          Mostrar Minhas Vendas
        </button>
        <button className="btn-listagem" onClick={() => carregarVendas("todas")}>
          Mostrar Todas as Vendas
        </button>
      </div>

      {verTabela && vendas.length > 0 && (
        <div className="lista-vendas">
          <table className="tabela-vendas">
            <thead>
              <tr>
                <th>Número da Nota</th>
                <th>Data</th>
                <th>Vendedor</th>
                <th>Cliente</th>
                <th>Produtos</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map(venda => {
                const total = venda.itens?.reduce((acc, item) => acc + item.quantidade_pedida * item.produto.preco_produto, 0) || 0;
                return (
                  <tr key={venda.numero_nf}>
                    <td className="detalhe-vermelho">{venda.numero_nf.slice(-10)}</td>
                    <td>{new Date(venda.data).toLocaleDateString()}</td>
                    <td>{venda.vendedor?.nome_vendedor}</td>
                    <td>{venda.cliente?.nome_cliente}</td>
                    <td>
                      {venda.itens?.map(item => (
                        <div key={item.codigo_produto} className="detalhe-vermelho">
                          {item.produto.descricao_produto} x {item.quantidade_pedida} = R$ {(item.quantidade_pedida * item.produto.preco_produto).toFixed(2)}
                        </div>
                      ))}
                    </td>
                    <td className="detalhe-vermelho">R$ {total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
