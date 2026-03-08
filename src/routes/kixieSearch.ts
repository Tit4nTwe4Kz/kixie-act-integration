import express from "express";

const router = express.Router();

/*
Kixie Search Endpoint
Used for contact lookup when a call is initiated
*/

router.post("/search", async (req, res) => {
  try {

    const phone = req.body.number || req.body.phone || "";

    console.log("Kixie search request received for:", phone);

    res.json({
      success: true,
      contact: null,
      message: "Search endpoint active – Act lookup coming next"
    });

  } catch (error) {

    console.error("Search error:", error);

    res.status(500).json({
      success: false
    });

  }
});

export default router;