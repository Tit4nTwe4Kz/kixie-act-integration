import { query } from "../database/db";

export async function createFollowUpTask(data: any) {

  const sql = `
    INSERT INTO follow_up_tasks (
      call_id,
      contact_id,
      agent_id,
      owner_id,
      subject,
      due_date
    )
    VALUES ($1,$2,$3,$4,$5,$6)
  `;

  const subject =
    `Follow up with ${data.contactName} regarding last call`;

  const values = [
    data.callId,
    data.contactId,
    data.agentId,
    data.ownerId,
    subject,
    data.dueDate
  ];

  await query(sql, values);

}