-- Create contact_messages table to store form submissions
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert messages (public contact form)
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to view messages (for admin use later)
CREATE POLICY "Authenticated users can view messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);

-- Create index for faster queries on created_at
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);