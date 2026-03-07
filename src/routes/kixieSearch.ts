import { Router } from "express";

const router = Router();

router.post("/search", async (req, res) => {

  const phone = req.body.phone;

  console.log("Kixie search request:", phone);

  res.json({
    found: false
  });

});

export default router;