import React, { useState } from 'react';
import { ScreenId } from '../types';
import { YASH_BIO } from '../data/portfolioData';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Copy,
  Download
} from 'lucide-react';
import { TextRoll } from '../components/TextRoll';

interface ContactViewProps {
  onNavigate: (destination: ScreenId) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Resume_Yash_Sahu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-time Role',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const accessKey =
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
        '969fa669-90fe-4dc6-8ee4-681eb2989f09';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          replyto: formData.email,
          from_name: `${formData.name} (Portfolio)`,
          subject: `[Portfolio Inquiry] ${formData.projectType} from ${formData.name}`,
          project_type: formData.projectType,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormSubmitted(true);
      } else {
        setSubmitError(
          data.message || 'Failed to dispatch message. Please try again or email directly.'
        );
      }
    } catch {
      setSubmitError(
        'Network error connecting to email service. Please try again or email directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(YASH_BIO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12 font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#fcd400] border-6 border-black neo-shadow-lg p-6 md:p-10 font-mono space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block bg-black text-[#fcd400] text-xs font-bold px-3 py-1 uppercase mb-2">
              [ 05 // LET'S BUILD TOGETHER ]
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase text-black leading-none">
              CONTACT YASH SAHU
            </h1>
            <p className="text-black font-bold text-sm md:text-base mt-2 font-sans">
              Have a project, role, or technical inquiry? Reach out directly via the form or email.
            </p>
          </div>

          <div className="bg-[#22c55e] text-black p-3 border-2 border-black neo-shadow-sm text-xs font-mono font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
            <span>CURRENT RESPONSE TIME: &lt; 12 HOURS</span>
          </div>
        </div>
      </div>

      {/* Main Form & Contact Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white border-4 border-black neo-shadow-lg p-6 md:p-8 space-y-6">
          <div className="border-b-4 border-black pb-4 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold uppercase text-black">
              SEND A MESSAGE
            </h2>
            <span className="font-mono text-xs font-bold text-gray-500 uppercase">
              [ DIRECT INBOX ]
            </span>
          </div>

          {formSubmitted ? (
            <div className="bg-[#d1f2d9] border-4 border-black p-8 font-mono text-center space-y-4 neo-shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-[#22c55e] mx-auto" />
              <h3 className="text-2xl font-heading font-extrabold uppercase text-black">
                MESSAGE SENT SUCCESSFULLY!
              </h3>
              <p className="font-sans text-sm text-gray-800 max-w-md mx-auto">
                Thank you for reaching out, <span className="font-bold">{formData.name}</span>. Yash Sahu has received your note directly in his inbox and will reply to <span className="font-bold text-[#ff6b00]">{formData.email}</span> shortly.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setSubmitError(null);
                  setFormData({ name: '', email: '', projectType: 'Full-time Role', message: '' });
                }}
                className="bg-black text-[#fcd400] px-6 py-2.5 font-bold text-xs uppercase border-2 border-black hover:bg-[#fcd400] hover:text-black transition-colors"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              {submitError && (
                <div className="bg-[#fee2e2] border-3 border-black p-4 neo-shadow-sm flex items-start gap-3 text-red-800 text-xs font-mono">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block uppercase">Transmission Error:</span>
                    <span>{submitError}</span>
                  </div>
                </div>
              )}

              {/* Honeypot Spam Protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              {/* Name & Email Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-black block">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-[#fbfaee] text-black p-3 border-2 border-black focus:outline-none focus:bg-white text-sm disabled:opacity-60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-black block">
                    YOUR EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-[#fbfaee] text-black p-3 border-2 border-black focus:outline-none focus:bg-white text-sm disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-black block">
                  INQUIRY TYPE
                </label>
                <select
                  value={formData.projectType}
                  disabled={isSubmitting}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-[#fbfaee] text-black p-3 border-2 border-black focus:outline-none focus:bg-white text-sm font-mono disabled:opacity-60"
                >
                  <option value="Full-time Role">Full-Time Engineering Role</option>
                  <option value="Contract Project">Contract / Consulting Project</option>
                  <option value="Code Audit">Code Audit & Architecture Review</option>
                  <option value="General Hello">General Coffee / Hello</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-black block">
                  PROJECT DETAILS & MESSAGE *
                </label>
                <textarea
                  required
                  rows={5}
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, timeline, tech stack, or opportunity..."
                  className="w-full bg-[#fbfaee] text-black p-3 border-2 border-black focus:outline-none focus:bg-white text-sm disabled:opacity-60"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-[#fcd400] text-black hover:bg-black hover:text-[#fcd400] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed py-3.5 font-bold text-sm border-3 border-black neo-shadow-sm flex items-center justify-center gap-2 uppercase transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>DISPATCHING MESSAGE...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <TextRoll>DISPATCH MESSAGE TO YASH SAHU</TextRoll>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Email Card */}
          <div className="bg-[#fbfaee] border-4 border-black p-6 neo-shadow-sm space-y-4 font-mono">
            <span className="bg-black text-[#fcd400] text-xs font-bold px-2.5 py-1 uppercase inline-block">
              [ DIRECT EMAIL ]
            </span>
            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-bold block">PRIMARY CONTACT EMAIL:</span>
              <div className="text-base font-extrabold text-black font-mono break-all">
                {YASH_BIO.email}
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="w-full bg-black text-white hover:bg-[#fcd400] hover:text-black py-2.5 font-bold text-xs border-2 border-black transition-colors flex items-center justify-center gap-2 uppercase"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedEmail ? 'COPIED TO CLIPBOARD!' : 'COPY EMAIL ADDRESS'}</span>
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="bg-white border-4 border-black p-6 neo-shadow-sm space-y-4 font-mono">
            <span className="text-xs font-bold text-black uppercase block border-b-2 border-black pb-2">
              [ SOCIAL PROFILES & CHANNELS ]
            </span>

            <div className="space-y-3 font-sans text-sm">
              <a
                href={YASH_BIO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#fbfaee] text-black border-2 border-black hover:bg-[#fcd400] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-black group-hover:text-black" />
                  <span className="font-bold font-mono">GITHUB / yashsahu0212</span>
                </div>
                <span className="text-xs font-mono font-bold">FOLLOW →</span>
              </a>

              <a
                href={YASH_BIO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#fbfaee] text-black border-2 border-black hover:bg-[#fcd400] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-black group-hover:text-black" />
                  <span className="font-bold font-mono">LINKEDIN / yashsahu</span>
                </div>
                <span className="text-xs font-mono font-bold">CONNECT →</span>
              </a>

              <a
                href={YASH_BIO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#fbfaee] text-black border-2 border-black hover:bg-[#fcd400] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-black group-hover:text-black" />
                  <span className="font-bold font-mono">TWITTER / @yashsahu</span>
                </div>
                <span className="text-xs font-mono font-bold">DM →</span>
              </a>

              <button
                onClick={handleDownloadResume}
                className="w-full flex items-center justify-between p-3 bg-[#fcd400] text-black border-2 border-black hover:bg-black hover:text-[#fcd400] transition-colors font-bold font-mono cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  <span>RESUME (PDF)</span>
                </div>
                <span className="text-xs font-mono font-bold">DOWNLOAD ↓</span>
              </button>
            </div>
          </div>

          {/* Location & Timezone Card */}
          <div className="bg-[#dde1ff] border-4 border-black p-6 neo-shadow-sm font-mono space-y-2">
            <span className="text-xs font-bold text-black uppercase block">LOCATION & TIMEZONE</span>
            <p className="text-sm font-bold text-black font-sans">
              {YASH_BIO.location} (IST / UTC+5:30)
            </p>
            <p className="text-xs text-gray-700 font-sans">
              Experienced working with US East Coast (EST), US West Coast (PST), European (CET), and Asian timezones.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
