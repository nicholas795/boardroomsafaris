import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Download, Loader2 } from 'lucide-react';

interface BrochureDownloadModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const BrochureDownloadModal: React.FC<BrochureDownloadModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!name.trim() || !email.trim() || !company.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Store the lead in database
      const { error } = await supabase.from('brochure_downloads').insert([
        {
          name,
          email,
          company,
        },
      ]);

      if (error) {
        console.error('Error saving lead:', error);
        toast({
          title: 'Error',
          description: 'Failed to process download',
          variant: 'destructive',
        });
        return;
      }

      // In production, call a Supabase edge function to generate/serve the PDF
      // For now, we'll redirect to a placeholder PDF or trigger a download
      // const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-brochure-pdf', {
      //   body: { name, email, company }
      // });

      // Trigger success toast and close modal
      toast({
        title: 'Download Started',
        description: `Thank you, ${name}! Your Boardroom Safaris Programme Overview is being downloaded.`,
      });

      // Reset form and close modal
      setName('');
      setEmail('');
      setCompany('');
      onOpenChange(false);

      // In production, trigger actual PDF download here
      // For demonstration, create a simple PDF or redirect to pre-generated PDF
      simulatePDFDownload();
    } catch (error) {
      console.error('Error during download:', error);
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulatePDFDownload = () => {
    // In production, this would be replaced with actual PDF generation/serving
    // For now, create a simple data URI PDF as placeholder
    const pdfContent = `
    Boardroom Safaris - Programme Overview
    
    Dear Participant,
    
    Thank you for your interest in Boardroom Safaris. This programme overview contains
    information about our exclusive African safari experiences designed for corporate teams.
    
    Programme Highlights:
    - Premium destinations across Africa
    - Customized team-building experiences
    - Luxury accommodations
    - Expert guides and personalized service
    
    Our 5-Step Process:
    1. Discovery & Strategy
    2. Destination Selection
    3. Program Customization
    4. Logistics & Coordination
    5. Execution & Experience
    
    Destinations:
    - Okavango Delta, Botswana
    - Kruger National Park, South Africa
    - Masai Mara, Kenya
    - Namib Desert, Namibia
    - Rwanda Primates
    
    For more information, please contact our team.
    
    Best regards,
    Boardroom Safaris Team
    `;

    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Boardroom_Safaris_Programme_Overview.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-light">
            Download Programme Overview
          </DialogTitle>
          <DialogDescription>
            Enter your details to receive our comprehensive programme brochure
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleDownload} className="space-y-5 mt-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Full Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@company.com"
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Company
            </label>
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Corporation"
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-bronze hover:bg-bronze/90 text-white flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Privacy Note */}
        <p className="text-xs text-charcoal/50 text-center mt-6">
          We respect your privacy. Your information will only be used to deliver your
          brochure.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default BrochureDownloadModal;
