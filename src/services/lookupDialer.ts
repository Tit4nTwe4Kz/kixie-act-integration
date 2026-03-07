import { query } from "../database/db";

export async function getNextDialTarget(listId: string) {

  const sql = `
    SELECT contact_id, last_call_time, last_call_duration
    FROM dial_queue
    WHERE list_id = $1
    AND last_call_duration >= 120
    ORDER BY last_call_time ASC
    LIMIT 1
  `;

  const result = await query(sql, [listId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];

}