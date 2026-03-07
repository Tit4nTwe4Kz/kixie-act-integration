import { query } from "../database/db";

export async function processConversationIntelligence(data: any) {

  const sql = `
    INSERT INTO call_intelligence (
      call_id,
      summary,
      sentiment,
      keywords,
      phrases,
      conversation_strength
    )
    VALUES ($1,$2,$3,$4,$5,$6)
  `;

  const values = [
    data.callId,
    data.summary,
    data.sentiment,
    JSON.stringify(data.keywords),
    JSON.stringify(data.phrases),
    data.conversationStrength
  ];

  await query(sql, values);

}