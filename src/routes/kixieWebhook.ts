import { Router } from "express";

const router = Router();

router.post("/webhook", async (req, res) => {

  const event = req.body;

  console.log("Kixie webhook received:", event);

  res.json({
    status: "received"
  });

});

export default router;