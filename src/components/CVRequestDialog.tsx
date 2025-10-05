import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CVRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CVRequestDialog = ({ open, onOpenChange }: CVRequestDialogProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !reason.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your name, email, and reason for requesting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('handle-cv-request', {
        body: { 
          name: name.trim(), 
          email: email.trim(),
          reason: reason.trim()
        },
      });

      if (error) throw error;

      toast({
        title: "Request Submitted! ✅",
        description: "Thank you! You'll receive a confirmation email shortly.",
      });

      setName('');
      setEmail('');
      setReason('');
      onOpenChange(false);
    } catch (error: any) {
      console.error('CV request error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request CV Access</DialogTitle>
          <DialogDescription>
            Please provide your details to receive my CV. You'll get a confirmation email once your request is approved.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request / Opportunity</Label>
            <Textarea
              id="reason"
              placeholder="e.g., Job opportunity, collaboration, consulting project..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              disabled={isSubmitting}
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Request CV
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
