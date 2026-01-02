export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // 1. Em Next.js/Vercel, o body já costuma estar disponível em req.body
    const body = req.body;

    // 2. O fetch para o Google Apps Script precisa de lidar com redirecionamentos
    const googleResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbx2FW5S0gUsFY2C2JdhCljc1RzuWqt4GER2debGE8WT11POgvgiKJfZBhYqfs6-3KHN8A/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        redirect: 'follow' // MUITO IMPORTANTE: O Google redireciona o pedido
      }
    );

    // 3. Verificar se o Google respondeu OK
    if (!googleResponse.ok) {
        throw new Error(`Google Sheets API respondeu com status: ${googleResponse.status}`);
    }

    const data = await googleResponse.json();
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error("Erro ao enviar para Google Sheets:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Erro interno no servidor", 
      details: error.message 
    });
  }
}