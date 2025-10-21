import { useState, useEffect } from "react";
import { supabase } from "../../apiSupabase";
import InputMask from "react-input-mask";
import "./Veiculos.css";

export default function UsoVeiculos() {
  const [usoVeiculos, setUsoVeiculos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [novoUso, setNovoUso] = useState({
    placa: "",
    cpf_vendedor: "",
    data_uso: "",
  });

  // Carregar usos com nome do vendedor via join
  const carregarUsos = async () => {
    try {
      const { data, error } = await supabase
        .from("uso_veiculo")
        .select(`
          id,
          placa,
          cpf_vendedor,
          data_uso,
          vendedor:cpf_vendedor ( nome_vendedor )
        `)
        .order("data_uso", { ascending: false });

      if (error) throw error;
      setUsoVeiculos(data || []);
    } catch (error) {
      console.error("Erro ao carregar usos:", error);
      alert("Erro ao carregar os dados.");
    }
  };

  const carregarVeiculos = async () => {
    try {
      const { data, error } = await supabase
        .from("veiculo")
        .select("placa_veiculo, modelo_veiculo");

      if (error) throw error;
      setVeiculos(data || []);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
      alert("Erro ao carregar veículos.");
    }
  };

  useEffect(() => {
    carregarUsos();
    carregarVeiculos();
  }, []);

  const adicionarUso = async () => {
    if (!novoUso.placa || !novoUso.cpf_vendedor || !novoUso.data_uso) {
      alert("Preencha todos os campos!");
      return;
    }

    const cpfLimpo = novoUso.cpf_vendedor.replace(/\D/g, "");
    const dataISO = new Date(novoUso.data_uso).toISOString().split("T")[0];

    const ocupado = usoVeiculos.find(
      (u) => u.placa === novoUso.placa.toUpperCase() && u.data_uso === dataISO
    );
    if (ocupado) {
      alert("⚠️ Este veículo já está em uso nesse dia!");
      return;
    }

    const { error } = await supabase.from("uso_veiculo").insert([
      {
        placa: novoUso.placa.trim().toUpperCase(),
        cpf_vendedor: cpfLimpo,
        data_uso: dataISO,
      },
    ]);

    if (error) {
      console.error("Erro ao registrar uso:", error.message);
      alert("❌ Erro ao registrar uso do veículo: " + error.message);
      return;
    }

    alert("✅ Uso do veículo registrado com sucesso!");
    setNovoUso({ placa: "", cpf_vendedor: "", data_uso: "" });
    carregarUsos();
  };

  const excluirUso = async (id) => {
    if (!window.confirm("Deseja realmente excluir este uso?")) return;

    const { error } = await supabase.from("uso_veiculo").delete().eq("id", id);
    if (error) {
      console.error("Erro ao excluir uso:", error.message);
      alert("Erro ao excluir registro: " + error.message);
      return;
    }

    setUsoVeiculos(usoVeiculos.filter((u) => u.id !== id));
  };

  const obterModeloVeiculo = (placa) => {
    const v = veiculos.find((v) => v.placa_veiculo === placa);
    return v ? v.modelo_veiculo : "Modelo não encontrado";
  };

  return (
    <section className="veiculos">
      <div className="form-veiculo">
        <h2 className="h2-veiculo">Registrar Uso do Veículo</h2>
        <div className="inputs-form">
          <select
            value={novoUso.placa}
            onChange={(e) => setNovoUso({ ...novoUso, placa: e.target.value })}
          >
            <option value="">Selecione a placa do veículo</option>
            {veiculos.map((v) => (
              <option key={v.placa_veiculo} value={v.placa_veiculo}>
                {v.placa_veiculo}
              </option>
            ))}
          </select>

          <InputMask
            mask="999.999.999-99"
            placeholder="CPF do vendedor"
            value={novoUso.cpf_vendedor}
            onChange={(e) =>
              setNovoUso({ ...novoUso, cpf_vendedor: e.target.value })
            }
          />

          <input
            type="date"
            value={novoUso.data_uso}
            onChange={(e) =>
              setNovoUso({ ...novoUso, data_uso: e.target.value })
            }
          />
        </div>

        <div className="botoes-form">
          <button onClick={adicionarUso} className="btn-adicionar">
            Registrar Uso
          </button>
        </div>
      </div>

      <div className="lista-veiculos">
        {usoVeiculos.length === 0 ? (
          <p className="sem-registros">Nenhum uso registrado ainda.</p>
        ) : (
          <table className="tabela-veiculos">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>CPF Vendedor</th>
                <th>Nome Vendedor</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usoVeiculos.map((u) => (
                <tr key={u.id}>
                  <td>{u.placa}</td>
                  <td>{obterModeloVeiculo(u.placa)}</td>
                  <td>
                    {u.cpf_vendedor.replace(
                      /(\d{3})(\d{3})(\d{3})(\d{2})/,
                      "$1.$2.$3-$4"
                    )}
                  </td>
                  <td>{u.vendedor?.nome_vendedor || "Não informado"}</td>
                  <td>{u.data_uso}</td>
                  <td>
                    <button
                      className="btn-excluir"
                      title="Excluir"
                      onClick={() => excluirUso(u.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
