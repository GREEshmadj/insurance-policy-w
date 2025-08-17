export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxdZqTDZqDHp_a9JznA-0qaFMkTV4eBXqTWmyBTJyN5ZGy_jqR3WX4X-SYOzTyG_eab/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      const text = await response.text();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.status(200).send(text);

    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  } else if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
  } else {
    res.status(405).end();
  }
}
