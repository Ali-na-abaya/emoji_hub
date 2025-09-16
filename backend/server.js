import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (_, res) => res.send("Backend работает!"));

app.get("/api/emojis", async (_, res) => {
  try {
    const r = await fetch("https://emojihub.yurace.pro/api/all");
    if (!r.ok) throw new Error(`Ошибка: ${r.status}`);
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, () => console.log("Backend running on http://localhost:8080"));
