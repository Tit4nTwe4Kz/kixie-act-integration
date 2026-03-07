import { query } from "../database/db";

export async function logCall(call: any) {

  const sql = `
    INSERT INTO calls (
      call_id,
      contact_id,
      agent_id,
      call_time,
      duration,
      disposition,
      recording_url
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
  `;

  const values = [
    call.callId,
    call.contactId,
    call.agentId,
    call.callTime,
    call.duration,
    call.disposition,
    call.recordingUrl
  ];

  await query(sql, values);

}