import { useState, useEffect } from "react";
import { supabase } from "../../apiSupabase";
import "./Regioes.css";

export default function Regioes() {
  const [regioes, setRegioes] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [novoPonto, setNovoPonto] = useState({
    descricao_ponto: "",
    codigo_regiao: "",
  });

  // Carregar regiões
  const carregarRegioes = async () => {
    const { data } = await supabase.from("regiao").select("*");
    setRegioes(data);
  };

  // Carregar pontos de uma região
  const carregarPontos = async (codigo) => {
    const { data } = await supabase
      .from("ponto_estrategico")
      .select("*")
      .eq("codigo_regiao", codigo);
    setPontos(data);
  };

  useEffect(() => {
    carregarRegioes();
  }, []);

  // Adicionar ponto
  const adicionarPonto = async () => {
    if (!novoPonto.descricao_ponto || !novoPonto.codigo_regiao) {
      alert("Preencha todos os campos!");
      return;
    }
    const { error } = await supabase
      .from("ponto_estrategico")
      .insert([novoPonto]);
    if (!error) {
      carregarPontos(novoPonto.codigo_regiao);
      setNovoPonto({ descricao_ponto: "", codigo_regiao: "" });
    }
  };

  // Excluir ponto
  const excluirPonto = async (id) => {
    if (!window.confirm("Deseja realmente excluir este ponto?")) return;
    const { error } = await supabase
      .from("ponto_estrategico")
      .delete()
      .eq("id", id);
    if (!error) setPontos(pontos.filter((p) => p.id !== id));
  };

  return (
    <section className="regioes">

      {/* Formulário para adicionar ponto estratégico */}
<div className="form-ponto">
<h2 className="h2-adicionar-ponto">Adicionar Ponto Estratégico</h2>
  <div className="inputs-form">
    <select
      value={novoPonto.codigo_regiao}
      onChange={(e) =>
        setNovoPonto({ ...novoPonto, codigo_regiao: e.target.value })
      }
    >
      <option value="">Selecione a Região</option>
      {regioes.map((r) => (
        <option key={r.codigo_regiao} value={r.codigo_regiao}>
          {r.nome_regiao}
        </option>
      ))}
    </select>

    <input
      type="text"
      placeholder="Descrição do ponto"
      value={novoPonto.descricao_ponto}
      onChange={(e) =>
        setNovoPonto({ ...novoPonto, descricao_ponto: e.target.value })
      }
    />

    <button className="btn-adicionar" onClick={adicionarPonto}>
      Adicionar
    </button>
  </div>
</div>


      {/* Tabela de pontos estratégicos */}
     <div className="lista-pontos">
<h2 className="h2-pontos">Pontos Estratégicos</h2>
  <div className="tabela-wrapper">
    <table className="tabela-pontos">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Região</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {pontos.map((p) => (
          <tr key={p.id}>
            <td>{p.descricao_ponto}</td>
            <td>{regioes.find((r) => r.codigo_regiao === p.codigo_regiao)?.nome_regiao}</td>
            <td className="acoes">
              <button className="btn-excluir" onClick={() => excluirPonto(p.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* Lista de regiões com botão ver pontos */}
      <div className="lista-regioes">
        {regioes.map((r) => (
          <div key={r.codigo_regiao} className="regiao-card">
            <h3>{r.nome_regiao}</h3>
            <button onClick={() => carregarPontos(r.codigo_regiao)}>Ver Pontos</button>
          </div>
        ))}
      </div>
    </section>
  );
}
