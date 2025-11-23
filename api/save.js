  export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }
  
    try {
      // Vercel VERDADEIRAMENTE precisa disto para ler JSON
      const body = req.body || await new Response(req).json();
  
      const googleResponse = await fetch(
        "https://script.google.com/macros/s/AKfycbx2FW5S0gUsFY2C2JdhCljc1RzuWqt4GER2debGE8WT11POgvgiKJfZBhYqfs6-3KHN8A/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
  
      const data = await googleResponse.json();
      return res.status(200).json({ success: true, data });
  
    } catch (error) {
      console.error("Erro ao enviar para Google Sheets:", error);
      return res.status(500).json({ error: "Erro interno no servidor", details: error.toString() });
    }
  }
  