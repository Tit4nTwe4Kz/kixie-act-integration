import fs from "fs";

export function generateTranscriptFile(data: any) {

  const fileName =
    `Call_Transcript_${data.contactName}_${data.date}_${data.time}_Duration-${data.duration}_CallID-${data.callId}.txt`;

  const content = `
Call Transcript

Contact: ${data.contactName}
Call Date: ${data.date}
Call Time: ${data.time} (New York Time)
Call Duration: ${data.duration}
Disposition: ${data.disposition}

Recording Link:
${data.recordingUrl}

Conversation Intelligence Summary:
${data.summary}

Topics:
${data.topics.join(", ")}

Transcript:
${data.transcript}
`;

  fs.writeFileSync(`./transcripts/${fileName}`, content);

  return fileName;

}