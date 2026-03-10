import { Router } from "express";
import axios from "axios";
import { getActToken } from "../services/actAuth";

const router = Router();

const ACT_API_BASE = "https://apius.act.com/act.web.api";

async function callAlreadyProcessed(callId: string, headers: any) {

  const search = await axios.get(
    `${ACT_API_BASE}/api/history?$filter=Kixie_Call_ID eq '${callId}'`,
    { headers }
  );

  return search.data?.value?.length > 0;

}

router.post("/webhook", async (req, res) => {

  try {

    const event = req.body;

    console.log("Kixie webhook received:", event);

    const callId = event.call_id || event.id;

    if (!callId) {

      return res.json({
        status: "ignored",
        reason: "missing_call_id"
      });

    }

    const token = await getActToken();

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const alreadyProcessed = await callAlreadyProcessed(callId, headers);

    if (alreadyProcessed) {

      console.log("Duplicate webhook ignored:", callId);

      return res.json({
        status: "ignored",
        reason: "duplicate_call"
      });

    }

    console.log("New call event accepted:", callId);

    res.json({
      status: "received"
    });

  } catch (error) {

    console.error("Webhook processing failed:", error);

    res.status(500).json({
      error: "webhook_failed"
    });

  }

});

export default router;