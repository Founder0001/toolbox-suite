/*
# Create tool_suggestions table

1. New Tables
- `tool_suggestions` — stores user-submitted tool ideas and suggestions
  - `id` (uuid, primary key)
  - `tool_name` (text, the name of the requested tool)
  - `category` (text, the category it belongs to, e.g. "PDF", "Image", "Student")
  - `description` (text, what the tool should do)
  - `email` (text, optional, for follow-up)
  - `status` (text, default 'pending' — pending/reviewed/implemented)
  - `votes` (integer, default 1 — upvote count)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on `tool_suggestions`.
- Allow anon + authenticated to INSERT (anyone can submit suggestions).
- Allow anon + authenticated to SELECT (anyone can see suggestions and vote counts).
- Allow anon + authenticated to UPDATE votes (upvoting).
- No DELETE from the client (only server-side admin can delete).

3. Notes
- This is a single-tenant no-auth app. All data is intentionally public.
- Users can submit tool suggestions and upvote existing ones.
- The suggestion box helps the team prioritize which tools to build next.
*/

CREATE TABLE IF NOT EXISTS tool_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_name text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  description text NOT NULL,
  email text,
  status text NOT NULL DEFAULT 'pending',
  votes integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tool_suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_suggestions" ON tool_suggestions;
CREATE POLICY "anon_select_suggestions" ON tool_suggestions FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_suggestions" ON tool_suggestions;
CREATE POLICY "anon_insert_suggestions" ON tool_suggestions FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_suggestions" ON tool_suggestions;
CREATE POLICY "anon_update_suggestions" ON tool_suggestions FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_tool_suggestions_votes ON tool_suggestions (votes DESC);
CREATE INDEX IF NOT EXISTS idx_tool_suggestions_created ON tool_suggestions (created_at DESC);
