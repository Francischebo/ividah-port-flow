-- Create table for CV download requests
CREATE TABLE public.cv_download_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cv_download_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create a download request
CREATE POLICY "Anyone can create download request" 
ON public.cv_download_requests 
FOR INSERT 
WITH CHECK (true);

-- Policy: Anyone can view their own request status
CREATE POLICY "Users can view their own requests" 
ON public.cv_download_requests 
FOR SELECT 
USING (true);

-- Policy: Only system can update status (will be done via edge function)
CREATE POLICY "System can update request status" 
ON public.cv_download_requests 
FOR UPDATE 
USING (false);

-- Create index for efficient queries
CREATE INDEX idx_cv_requests_email ON public.cv_download_requests(requester_email);
CREATE INDEX idx_cv_requests_status ON public.cv_download_requests(status);