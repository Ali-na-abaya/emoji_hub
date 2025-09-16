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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
