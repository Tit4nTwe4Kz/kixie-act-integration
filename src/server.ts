import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kixie ↔ Act! integration server running.");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});