import express from "express";
import { searchActContact } from "../services/actLookup";

const router = express.Router();

/*
Kixie Search Endpoint
Handles both GET and POST requests from Kixie
*/

router.all("/search", async (req, res) => {
  try {

    const phone =
      req.query.number ||
      req.body.number ||
      req.body.phone ||
      "";

    console.log("Kixie search request received for:", phone);

    if (!phone) {
      return res.json({ success: false });
    }

    const contact = await searchActContact(String(phone));

    if (!contact) {
      return res.json({ success: true, contact: null });
    }

    return res.json({
      success: true,
      contact
    });

  } catch (error) {

    console.error("Search error:", error);

    return res.status(500).json({
      success: false
    });

  }
});

export default router;