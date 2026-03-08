PROJECT CONTEXT HANDOFF

Project:
Kixie → Custom API (Node/Express on Render) → ACT Premium Cloud integration.

Goal:
When a call occurs in Kixie, the system searches ACT contacts by phone number and returns the matching contact/company.

Infrastructure:
- Server: Node.js / Express
- Hosting: Render
- Repo: https://github.com/Tit4nTwe4Kz/kixie-act-integration
- Endpoint:
https://kixie-act-integration.onrender.com/kixie/search?number={{number}}

Current Flow:
Kixie → Render API → ACT API

Working Tests:
1. Render server deploys and runs successfully.
2. Public endpoint reachable.
3. Kixie successfully calls the search endpoint.
4. Endpoint processes requests and logs payloads.
5. Phone parameter parsing implemented.
6. Server successfully calls ACT API server.
7. ACT API responds (401 Unauthorized).

ACT API Endpoint Used:
https://apius.act.com/act.web.api/api/token

Authentication Attempted:
POST /api/token
with:
username
password
database

Database identifiers tested:
JohnsonMaster
R22526103409

Result:
Both return HTTP 401 Unauthorized.

ACT UI Access:
User is Administrator inside ACT database UI.
However tenant-level Admin/Developer API settings are not visible.

Suspected Issue:
ACT Premium Cloud Web API may not be enabled for the tenant OR authentication requires API key/OAuth instead of /api/token.

Next Investigation:
Confirm with ACT consultant:
- whether ACT Web API is enabled
- correct authentication method
- correct API base URL
- correct database identifier