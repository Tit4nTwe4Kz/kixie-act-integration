import express from "express";
import kixieWebhook from "./routes/kixieWebhook";
import kixieSearch from "./routes/kixieSearch";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kixie ↔ Act! integration server running.");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* Kixie Routes */

app.use("/kixie", kixieWebhook);
app.use("/kixie", kixieSearch);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});