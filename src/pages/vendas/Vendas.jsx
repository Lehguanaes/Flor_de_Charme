import { useState } from "react";
import "./Vendas.css";

export default function Vendas() {
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  // Dados vazios (nenhum cliente/produto cadastrado)
  const clientes = [];
  const produtos = [];

  const registrarVenda = () => {
    if (!cliente || !produto) {
      alert("Nenhum cliente ou produto disponível para registrar venda!");
      return;
    }

    alert("Venda registrada! (Funcionalidade desativada)");
  };

  return (
    <section className="vendas">
      <div className="form-venda">
        {/* Input 1: Selecionar Cliente */}
        <div className="input-group">
          <label>Cliente:</label>
          <select 
            value={cliente} 
            onChange={(e) => setCliente(e.target.value)}
            disabled={clientes.length === 0} // desabilita se não houver clientes
          >
            {clientes.length === 0 ? (
              <option value="">Nenhum cliente cadastrado</option>
            ) : (
              <>
                <option value="">Selecione um cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* Input 2: Selecionar Produto */}
        <div className="input-group">
          <label>Produto:</label>
          <select 
            value={produto} 
            onChange={(e) => setProduto(e.target.value)}
            disabled={produtos.length === 0} // desabilita se não houver produtos
          >
            {produtos.length === 0 ? (
              <option value="">Nenhum produto cadastrado</option>
            ) : (
              <>
                <option value="">Selecione um produto</option>
                {produtos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nome} - R$ {p.preco.toFixed(2)}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* Input 3: Quantidade */}
        <div className="input-group">
          <label>Quantidade:</label>
          <input 
            type="number" 
            min="1" 
            value={quantidade} 
            onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
            disabled={clientes.length === 0 || produtos.length === 0} // desabilita se não houver clientes/produtos
          />
        </div>

        {/* Botão Registrar Venda */}
        <button 
          onClick={registrarVenda} 
          className="btn-registrar"
          disabled={clientes.length === 0 || produtos.length === 0} // desabilita se não houver dados
        >
          Registrar Venda
        </button>
      </div>
    </section>
  );
}
