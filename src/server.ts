import express from "express";
import kixieWebhook from "./routes/kixieWebhook";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kixie ↔ Act! integration server running.");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* Kixie Webhook Route */

app.use("/kixie", kixieWebhook);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});