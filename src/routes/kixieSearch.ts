import express from "express";
import { searchActContact } from "../services/actLookup";

const router = express.Router();

/*
Kixie Search Endpoint
Used for contact lookup when a call is initiated
*/

router.post("/search", async (req, res) => {

  try {

    const phone = req.body.number || req.body.phone || "";

    console.log("Kixie search request received for:", phone);

    if (!phone) {
      return res.json({
        success: false,
        message: "No phone number provided"
      });
    }

    const contact = await searchActContact(phone);

    if (!contact) {

      return res.json({
        success: true,
        contact: null
      });

    }

    return res.json({
      success: true,
      contact: contact
    });

  } catch (error) {

    console.error("Search error:", error);

    res.status(500).json({
      success: false
    });

  }

});

export default router;