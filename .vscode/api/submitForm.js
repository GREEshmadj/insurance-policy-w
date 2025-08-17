export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzyi7fCHX8ifSvroG1FDEZAR71Frp0Hg2x_fkWvutowZ3LZS2E-j2DeW7mXzRGwJmqW/exec",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" }
        }
      );
      const text = await response.text();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(text);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
