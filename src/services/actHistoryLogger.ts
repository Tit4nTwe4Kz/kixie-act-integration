import axios from "axios";
import { getActToken } from "./actAuth";

const ACT_API_BASE = "https://apius.act.com/act.web.api";

export async function createActHistory({
  contactId,
  companyId,
  callId,
  startDate,
  startTime,
  endDate,
  endTime,
  disposition,
  recordingUrl,
  sentiment,
  conversationStrength,
  summary,
  keywords,
  callDirection
}: any) {

  const token = await getActToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const payload: any = {
    Subject: "Call",
    HistoryType: "Call",
    Result: disposition || "Completed",
    StartDate: startDate,
    StartTime: startTime,
    EndDate: endDate || startDate,
    EndTime: endTime || startTime,
    Details: "Call logged via Kixie integration",
    Kixie_Call_ID: callId,
    Recording_URL: recordingUrl || "",
    Sentiment: sentiment || "",
    Conversation_Strength: conversationStrength || 0,
    CI_Summary: summary || "",
    Keywords: keywords || "",
    Call_Direction: callDirection || ""
  };

  if (contactId) {
    payload.Regarding = "Contact";
    payload.RegardingID = contactId;
  }

  if (companyId) {
    payload.LinkedCompanyID = companyId;
  }

  if (!contactId && companyId) {
    payload.Regarding = "Company";
    payload.RegardingID = companyId;
  }

  const response = await axios.post(
    `${ACT_API_BASE}/api/history`,
    payload,
    { headers }
  );

  return response.data;

}