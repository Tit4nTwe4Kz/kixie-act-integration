# PROJECT STATE RECORD
Kixie ↔ Act CRM Integration

Last Updated: 2026-03-12

---

# Purpose

This document records the current operational state of the Kixie → Act integration so the project can be reconstructed without losing architectural context.

---

# Repository

kixie-act-integration

Location

/Users/travisroberts_ja/GitHub/kixie-act-integration

---

# Integration Goal

Automatically log phone calls from Kixie into Act CRM as History records and attach them to the correct Contact or Company.

---

# System Architecture

Kixie
↓
Webhook
↓
Integration Server (Node.js)
↓
Act API Client
↓
Act CRM History Records

---

# Confirmed Core Behavior

When a call occurs in Kixie:

1. Kixie sends a webhook
2. Integration receives the payload
3. Contact or Company is located in Act
4. A History record is created

Endpoint used

POST /api/history

---

# History Record Structure

Subject: Call

HistoryType: Call

Result: Kixie call disposition

StartDate: call start time

EndDate: call end time

---

# Custom History Fields

The integration writes additional call metadata:

Kixie_Call_ID
Recording_URL
CI_Summary
Sentiment
Conversation_Strength
Keywords
Call_Direction

These fields allow reporting and AI analysis.

---

# Call Disposition Mapping

Kixie Disposition
↓
Act History.Result

Example

Voicemail
Connected
No Answer
Busy

These values must exist in Act's Result dropdown list.

---

# Contact Matching Logic

The integration attempts to match the call to a record using:

Phone number

If found:

History record attaches to Contact

If not:

History may attach to Company or remain unlinked depending on configuration.

---

# Duplicate Call Protection (Planned)

Each Kixie call contains a unique identifier:

Kixie_Call_ID

Future logic will prevent duplicate history records by checking for an existing call ID before creating a new record.

---

# Act API Configuration

Base URL

https://apius.act.com/act.web.api

Authentication

Basic → JWT via /authorize

Database

JohnsonMaster

---

# Logging Strategy

Structured logging recommended for all webhook processing and Act API requests.

Example log entry

{
  "timestamp": "...",
  "level": "INFO",
  "message": "history_record_created"
}

---

# Security Rules

Never commit

.env
API tokens
CRM credentials

---

# Next Development Steps

Add duplicate call protection

Improve logging and monitoring

Add retry handling for API failures

Improve phone number matching logic

---

# End of Record

