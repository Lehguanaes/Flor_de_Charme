import { useState, useEffect } from "react";
import { supabase } from "../../apiSupabase";
import InputMask from "react-input-mask";
import "./Veiculos.css";

export default function UsoVeiculos() {
  const [usoVeiculos, setUsoVeiculos] = useState([]);
  const [novoUso, setNovoUso] = useState({
    placa: "",
    cpf_vendedor: "",
    data_uso: "",
  });

  // 🔹 Carregar registros existentes de uso de veículos
  const carregarUsos = async () => {
    const { data: usos, error } = await supabase.from("uso_veiculo").select("*").order("data_uso", { ascending: false });
    if (error) {
      console.error("Erro ao carregar usos:", error.message);
      return;
    }
    setUsoVeiculos(usos || []);
  };

  useEffect(() => {
    carregarUsos();
  }, []);

  // 🔹 Adicionar novo uso de veículo
  const adicionarUso = async () => {
    if (!novoUso.placa || !novoUso.cpf_vendedor || !novoUso.data_uso) {
      alert("Preencha todos os campos!");
      return;
    }

    // Limpa a máscara do CPF
    const cpfLimpo = novoUso.cpf_vendedor.replace(/\D/g, "");

    // Formata a data para o formato ISO (YYYY-MM-DD)
    const dataISO = new Date(novoUso.data_uso).toISOString().split("T")[0];

    // Verificar se o veículo já está em uso nesse dia
    const ocupado = usoVeiculos.find(
      (u) => u.placa === novoUso.placa.toUpperCase() && u.data_uso === dataISO
    );
    if (ocupado) {
      alert("⚠️ Este veículo já está em uso nesse dia!");
      return;
    }

    // Inserir no Supabase
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
    carregarUsos(); // Atualiza a lista
  };

  // 🔹 Excluir registro de uso
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

  return (
    <section className="veiculos">
      {/* 🔸 Formulário de registro */}
      <div className="form-veiculo">
        <h2>Registrar Uso do Veículo</h2>

        <div className="inputs-form">
          <input
            placeholder="Placa do veículo (ex: ABC1234)"
            value={novoUso.placa}
            onChange={(e) => setNovoUso({ ...novoUso, placa: e.target.value })}
          />

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

      {/* 🔸 Lista de usos */}
      <div className="lista-veiculos">
        <h2>Uso de Veículos</h2>

        {usoVeiculos.length === 0 ? (
          <p className="sem-registros">Nenhum uso registrado ainda.</p>
        ) : (
          <div className="tabela-veiculos">
            <div className="cabecalho-tabela">
              <span>Placa</span>
              <span>Vendedor (CPF)</span>
              <span>Data</span>
              <span>Ações</span>
            </div>

            {usoVeiculos.map((u) => (
              <div key={u.id} className="linha-veiculo">
                <span>{u.placa}</span>
                <span>
                  {u.cpf_vendedor.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    "$1.$2.$3-$4"
                  )}
                </span>
                <span>{u.data_uso}</span>
                <div className="acoes">
                  <button className="btn-visualizar" title="Visualizar">
                    👁️
                  </button>
                  <button
                    className="btn-excluir"
                    title="Excluir"
                    onClick={() => excluirUso(u.id)}
                  >
                    🗑️
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
