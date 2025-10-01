import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // ajuste se tiver outro usuário
  password: "",      // ajuste se tiver senha
  database: "Flor_de_Charme_BD"
});



// 👇 ROTA DE LOGIN
app.post("/login", (req, res) => {
  const { nome_vendedor, cpf_vendedor } = req.body;

  const sql = "SELECT * FROM vendedor WHERE nome_vendedor = ? AND cpf_vendedor = ?";
  db.query(sql, [nome_vendedor, cpf_vendedor], (err, result) => {
    if (err) {
      console.error("Erro SQL:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }

    if (result.length > 0) {
      res.json({ success: true, user: result[0] });
    } else {
      res.json({ success: false, message: "Nome ou CPF inválidos" });
    }
  });
});

// Listar todos os clientes
app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM cliente", (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar clientes" });
    res.json(result);
  });
});

// Adicionar cliente
app.post("/clientes", (req, res) => {
  const { cpf_cliente, nome_cliente } = req.body;
  const sql = "INSERT INTO cliente (cpf_cliente, nome_cliente) VALUES (?, ?)";
  db.query(sql, [cpf_cliente, nome_cliente], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao salvar cliente" });
    res.json({ cpf_cliente, nome_cliente });
  });
});

// Editar cliente
app.put("/clientes/:cpf", (req, res) => {
  const { cpf } = req.params;
  const { nome_cliente } = req.body;
  const sql = "UPDATE cliente SET nome_cliente=? WHERE cpf_cliente=?";
  db.query(sql, [nome_cliente, cpf], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao editar cliente" });
    res.json({ cpf_cliente: cpf, nome_cliente });
  });
});

// Excluir cliente
app.delete("/clientes/:cpf", (req, res) => {
  const { cpf } = req.params;
  const sql = "DELETE FROM cliente WHERE cpf_cliente=?";
  db.query(sql, [cpf], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao excluir cliente" });
    res.json({ success: true });
  });
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));