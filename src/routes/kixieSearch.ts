import express from "express";
import { searchActContact } from "../services/actLookup";

const router = express.Router();

async function handleSearch(req: any, res: any) {

  try {

    let phone =
      req.query.number ||
      req.query.customernumber ||
      req.query.businessnumber ||
      req.body?.number ||
      req.body?.customernumber ||
      req.body?.businessnumber ||
      req.body?.phone ||
      "";

    if (Array.isArray(phone)) {
      phone = phone.find((p) => p && p.length > 0);
    }

    console.log("Kixie search request received for:", phone);

    if (!phone) {
      return res.json({
        success: true,
        contact: null
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
      contact
    });

  } catch (error) {

    console.error("Search error:", error);

    return res.status(500).json({
      success: false
    });

  }

}

router.get("/search", handleSearch);
router.post("/search", handleSearch);

export default router;