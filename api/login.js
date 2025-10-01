export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // teste
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { nome_vendedor, cpf_vendedor } = req.body;
    if (nome_vendedor === 'Maria' && cpf_vendedor === '123') {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  }

  return res.status(405).json({ success: false });
}
