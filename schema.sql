CREATE TABLE calls (
  id SERIAL PRIMARY KEY,
  call_id TEXT,
  contact_id TEXT,
  agent_id TEXT,
  call_time TIMESTAMP,
  duration INTEGER,
  disposition TEXT,
  recording_url TEXT
);

CREATE TABLE call_intelligence (
  id SERIAL PRIMARY KEY,
  call_id TEXT,
  summary TEXT,
  sentiment TEXT,
  keywords JSONB,
  phrases JSONB,
  conversation_strength INTEGER
);

CREATE TABLE follow_up_tasks (
  id SERIAL PRIMARY KEY,
  call_id TEXT,
  contact_id TEXT,
  agent_id TEXT,
  owner_id TEXT,
  subject TEXT,
  due_date TIMESTAMP
);

CREATE TABLE dial_queue (
  id SERIAL PRIMARY KEY,
  list_id TEXT,
  contact_id TEXT,
  last_call_time TIMESTAMP,
  last_call_duration INTEGER
);

CREATE TABLE activity_metrics (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  dial_count INTEGER,
  talk_time INTEGER,
  sms_count INTEGER,
  activity_date DATE
);