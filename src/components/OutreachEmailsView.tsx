import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Sparkles,
  AlertCircle,
  FileCheck,
  Eye,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  ShieldCheck,
  X,
  UserCheck,
  Edit3,
  FileText
} from 'lucide-react';
import { OutreachEmail, EmailFourPartStructure } from '../types/agent';
import { BANNED_SALES_PHRASES } from '../utils/grader';

interface OutreachEmailsViewProps {
  emailsA: OutreachEmail[];
  emailsB: OutreachEmail[];
  isDisqualified: boolean;
  recipientEmail?: string;
  recipientName?: string;
}

export const OutreachEmailsView: React.FC<OutreachEmailsViewProps> = ({
  emailsA,
  emailsB,
  isDisqualified,
  recipientEmail = 'anup.saha@bajajfinserv.example.com',
  recipientName = 'Anup Saha'
}) => {
  const [selectedStyle, setSelectedStyle] = useState<'A' | 'B'>('A');
  const [selectedEmailIdx, setSelectedEmailIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'clean' | 'structured' | 'preview'>('clean');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Email customization states for salutation and sign-off
  const [salutationPrefix, setSalutationPrefix] = useState<'Hi' | 'Dear' | 'Hello'>('Hi');
  const [signOffPhrase, setSignOffPhrase] = useState<'Best regards,' | 'Warm regards,' | 'Thanks & regards,' | 'Sincerely,'>('Best regards,');
  const [thankYouPhrase, setThankYouPhrase] = useState<'Thank you for your time,' | 'Thank you,' | 'Appreciate your time,'>('Thank you for your time,');
  const [senderName, setSenderName] = useState<string>('Alex Morgan');
  const [senderTitle, setSenderTitle] = useState<string>('Enterprise Solutions Director');

  // Send simulation modal state
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendingState, setSendingState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [activeSendEmail, setActiveSendEmail] = useState<OutreachEmail | null>(null);

  const activeEmails = selectedStyle === 'A' ? emailsA : emailsB;
  const currentEmail = activeEmails[selectedEmailIdx] || activeEmails[0];

  // Derive recipient first name for greetings
  const recipientFirstName = recipientName.split(' ')[0] || 'there';

  // Construct dynamic complete email message components
  const activeGreeting = `${salutationPrefix} ${recipientFirstName},`;
  const activeHeading = currentEmail ? `Re: ${currentEmail.subject}` : '';
  const activeThankYou = thankYouPhrase;
  const activeSignOff = signOffPhrase;
  const activeSignature = `${senderName}\n${senderTitle}`;

  // Build the complete email text: Greeting -> Heading -> Hook -> Pain -> Value -> CTA -> Thank you -> Regards & Signature
  const assembleCompleteEmail = (email: OutreachEmail): string => {
    return [
      activeGreeting,
      activeHeading,
      email.parts.hook.content,
      email.parts.pain.content,
      email.parts.value.content,
      email.parts.cta.content,
      activeThankYou,
      `${activeSignOff}\n${activeSignature}`
    ].join('\n\n');
  };

  const completeEmailText = currentEmail ? assembleCompleteEmail(currentEmail) : '';
  const dynamicWordCount = completeEmailText.split(/\s+/).filter(Boolean).length;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenSendModal = (email: OutreachEmail) => {
    setActiveSendEmail(email);
    setSendingState('idle');
    setIsSendModalOpen(true);
  };

  const handleExecuteSend = () => {
    setSendingState('sending');
    setTimeout(() => {
      setSendingState('sent');
      setTimeout(() => {
        setIsSendModalOpen(false);
        setSendingState('idle');
      }, 1500);
    }, 1000);
  };

  if (isDisqualified || !currentEmail) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-2xl mx-auto shadow-xs">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Outreach Generation Halted — Account Disqualified
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          In adherence to the core principle &ldquo;A verified disqualification is a successful outcome. A polished email to the wrong company is a failure,&rdquo; no outreach emails were generated for this account.
        </p>
      </div>
    );
  }

  // Check banned phrases in current email
  const foundBannedInCurrent = BANNED_SALES_PHRASES.filter((p) =>
    completeEmailText.toLowerCase().includes(p)
  );

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Steps 8 &amp; 9</span>
          <span>·</span>
          <span>Outreach Email Architecture</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              Evidence-First Cold Outreach &amp; Complete Email Delivery
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Complete professional email message from personalized greeting and heading to the 4-part value copy, respectful closing, and regards.
            </p>
          </div>

          {/* Style Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start">
            <button
              onClick={() => {
                setSelectedStyle('A');
                setSelectedEmailIdx(0);
              }}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                selectedStyle === 'A'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Style A: Industry Led
            </button>
            <button
              onClick={() => {
                setSelectedStyle('B');
                setSelectedEmailIdx(0);
              }}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition cursor-pointer ${
                selectedStyle === 'B'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Style B: Person Led
            </button>
          </div>
        </div>
      </div>

      {/* Sequence Cadence Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {activeEmails.map((email, idx) => (
            <button
              key={email.id}
              onClick={() => setSelectedEmailIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                selectedEmailIdx === idx
                  ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-bold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <span>Email {email.emailNumber}</span>
              <span className="text-[10px] font-mono text-slate-400">({email.sequenceTiming.split(' - ')[0]})</span>
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center gap-1">
            <button
              onClick={() => setViewMode('clean')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                viewMode === 'clean'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Complete Email</span>
            </button>
            <button
              onClick={() => setViewMode('structured')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                viewMode === 'structured'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4-Part Breakdown</span>
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Mail Client Preview</span>
            </button>
          </div>

          <button
            onClick={() => handleOpenSendModal(currentEmail)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-2xs transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </button>
        </div>
      </div>

      {/* Constraints & Quality Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Complete Message Length</div>
          <div className="flex items-center justify-between mt-1">
            <span
              className={`text-lg font-bold font-mono ${
                dynamicWordCount > 130 ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {dynamicWordCount} words
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Max 120-130 words</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Subject Word Count</div>
          <div className="flex items-center justify-between mt-1">
            <span
              className={`text-lg font-bold font-mono ${
                currentEmail.subjectWordCount > 8 ? 'text-rose-600' : 'text-indigo-600'
              }`}
            >
              {currentEmail.subjectWordCount} words
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Max 8 words</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Banned Phrases</div>
          <div className="flex items-center justify-between mt-1">
            <span
              className={`text-lg font-bold font-mono ${
                foundBannedInCurrent.length > 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {foundBannedInCurrent.length} detected
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Zero Tolerance</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Sequence Cadence</div>
          <div className="text-sm font-bold text-slate-800 mt-1 truncate">
            {currentEmail.sequenceTiming}
          </div>
        </div>
      </div>

      {/* Salutation & Closing Customization Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-[11px] font-medium">Greeting:</span>
            <select
              value={salutationPrefix}
              onChange={(e) => setSalutationPrefix(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Hi">Hi {recipientFirstName},</option>
              <option value="Dear">Dear {recipientFirstName},</option>
              <option value="Hello">Hello {recipientFirstName},</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-[11px] font-medium">Thank You:</span>
            <select
              value={thankYouPhrase}
              onChange={(e) => setThankYouPhrase(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Thank you for your time,">Thank you for your time,</option>
              <option value="Thank you,">Thank you,</option>
              <option value="Appreciate your time,">Appreciate your time,</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-[11px] font-medium">Sign-off:</span>
            <select
              value={signOffPhrase}
              onChange={(e) => setSignOffPhrase(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Best regards,">Best regards,</option>
              <option value="Warm regards,">Warm regards,</option>
              <option value="Thanks & regards,">Thanks &amp; regards,</option>
              <option value="Sincerely,">Sincerely,</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Sender Name"
            className="w-28 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={senderTitle}
            onChange={(e) => setSenderTitle(e.target.value)}
            placeholder="Title"
            className="w-44 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Main Email Display Area */}
      {viewMode === 'clean' && (
        /* CLEAN COMPLETE PROPER EMAIL VIEW - DIRECTLY ADDRESSING USER SCREENSHOT */
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-0">
          {/* Header with Subject Line & Actions */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono uppercase text-slate-500 font-medium">
                Subject Line
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {currentEmail.subject}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(completeEmailText, currentEmail.id)}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded transition cursor-pointer"
              >
                {copiedId === currentEmail.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedId === currentEmail.id ? 'Copied Full Email' : 'Copy Proper Email'}</span>
              </button>

              <button
                onClick={() => handleOpenSendModal(currentEmail)}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition cursor-pointer shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </button>
            </div>
          </div>

          {/* Dedicated Complete Message Container as in user screenshot */}
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                BODY COPY (SENTENCE-TRACEABLE)
              </span>
              <span className="font-mono text-xs text-emerald-600 font-semibold">
                {dynamicWordCount} / 120 words max
              </span>
            </div>

            {/* The Complete Proper Email Card */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-6 font-sans text-sm text-slate-900 leading-relaxed space-y-4 shadow-2xs">
              {/* Salutation / Greeting */}
              <div className="font-medium text-slate-900">
                {activeGreeting}
              </div>

              {/* Context Heading */}
              <div className="text-xs font-bold uppercase font-mono text-indigo-700 pb-1 border-b border-slate-200/60">
                {activeHeading}
              </div>

              {/* Hook: Prove in one line that this was written for them */}
              <p className="text-slate-900">
                {currentEmail.parts.hook.content}
              </p>

              {/* Pain: Name the consequence of the trigger, not the trigger itself */}
              <p className="text-slate-800">
                {currentEmail.parts.pain.content}
              </p>

              {/* Value: One sentence on what changes. Not a feature list */}
              <p className="text-slate-800">
                {currentEmail.parts.value.content}
              </p>

              {/* CTA: One specific, small ask */}
              <p className="text-slate-900 font-medium">
                {currentEmail.parts.cta.content}
              </p>

              {/* Thank you */}
              <div className="pt-2 text-slate-800">
                {activeThankYou}
              </div>

              {/* Regards & Sender Signature */}
              <div className="text-slate-800">
                <div>{activeSignOff}</div>
                <div className="font-bold text-slate-900 mt-1">{senderName}</div>
                <div className="text-xs text-slate-500 font-medium">{senderTitle}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'structured' && (
        /* 4-Part Structured Card View with surrounding Greeting and Regards */
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-0">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-mono uppercase text-slate-500 font-medium">
                Subject Line
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {currentEmail.subject}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(completeEmailText, currentEmail.id)}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded transition cursor-pointer"
              >
                {copiedId === currentEmail.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedId === currentEmail.id ? 'Copied' : 'Copy Full Body'}</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Greeting Card */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">Greeting</span>
              <span className="font-medium text-slate-800">{activeGreeting}</span>
            </div>

            {/* Part 1: Hook */}
            <div className="bg-slate-50/70 rounded-lg p-4 border border-amber-200/80 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    Part: Hook
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    Job: Prove in one line that this was written for them.
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  Trace: {currentEmail.parts.hook.packTraceField}
                </span>
              </div>
              <p className="text-sm text-slate-900 font-medium leading-relaxed">
                &ldquo;{currentEmail.parts.hook.content}&rdquo;
              </p>
            </div>

            {/* Part 2: Pain */}
            <div className="bg-slate-50/70 rounded-lg p-4 border border-rose-200/80 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300">
                    Part: Pain
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    Job: Name the consequence of the trigger, not the trigger itself.
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  Trace: {currentEmail.parts.pain.packTraceField}
                </span>
              </div>
              <p className="text-sm text-slate-900 font-medium leading-relaxed">
                &ldquo;{currentEmail.parts.pain.content}&rdquo;
              </p>
            </div>

            {/* Part 3: Value */}
            <div className="bg-slate-50/70 rounded-lg p-4 border border-emerald-200/80 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Part: Value
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    Job: One sentence on what changes. Not a feature list.
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  Trace: {currentEmail.parts.value.packTraceField}
                </span>
              </div>
              <p className="text-sm text-slate-900 font-medium leading-relaxed">
                &ldquo;{currentEmail.parts.value.content}&rdquo;
              </p>
            </div>

            {/* Part 4: CTA */}
            <div className="bg-slate-50/70 rounded-lg p-4 border border-indigo-200/80 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-300">
                    Part: CTA
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    Job: One specific, small ask.
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  Trace: {currentEmail.parts.cta.packTraceField}
                </span>
              </div>
              <p className="text-sm text-slate-900 font-medium leading-relaxed">
                &ldquo;{currentEmail.parts.cta.content}&rdquo;
              </p>
            </div>

            {/* Thank You & Regards Card */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">Closing: </span>
                <span className="text-slate-800">{activeThankYou}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">Regards: </span>
                <span className="font-bold text-slate-900">{activeSignOff} {senderName} ({senderTitle})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'preview' && (
        /* Mail Client Simulation Preview */
        <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-md">
          {/* Mock Mail Window Header */}
          <div className="bg-slate-800 text-slate-200 px-4 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 font-medium text-slate-300">New Message — Ready to Send</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {dynamicWordCount} words
            </div>
          </div>

          {/* Mail Fields */}
          <div className="p-4 border-b border-slate-100 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono w-16 text-right">To:</span>
              <span className="font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                {recipientName} &lt;{recipientEmail}&gt;
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono w-16 text-right">Subject:</span>
              <span className="font-bold text-slate-900">{currentEmail.subject}</span>
            </div>
          </div>

          {/* Mail Body in Natural Spacing with Complete Structure */}
          <div className="p-6 space-y-4 text-sm text-slate-800 leading-relaxed font-sans min-h-[260px]">
            <p className="text-slate-900 font-medium">{activeGreeting}</p>
            <p className="text-xs font-mono font-bold text-indigo-700">{activeHeading}</p>
            <p className="text-slate-900">{currentEmail.parts.hook.content}</p>
            <p className="text-slate-800">{currentEmail.parts.pain.content}</p>
            <p className="text-slate-800">{currentEmail.parts.value.content}</p>
            <p className="text-slate-900 font-medium">{currentEmail.parts.cta.content}</p>
            <p className="pt-2 text-slate-800">{activeThankYou}</p>
            <div className="text-slate-800">
              <div>{activeSignOff}</div>
              <div className="font-bold text-slate-900 mt-0.5">{senderName}</div>
              <div className="text-xs text-slate-500">{senderTitle}</div>
            </div>
          </div>

          {/* Mail Client Bottom Bar with Send Button */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Zero generic sales jargon detected</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(completeEmailText, currentEmail.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded transition cursor-pointer"
              >
                {copiedId === currentEmail.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Complete Email</span>
              </button>
              <button
                onClick={() => handleOpenSendModal(currentEmail)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded transition shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sentence to Personalization Pack Trace Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
            Sentence-to-Pack Verification Trace
          </h3>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            100% Sentences Accounted
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {currentEmail.sentenceTrace.map((t, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:bg-slate-50/50">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400">Sentence {idx + 1}</span>
                  {idx === 0 && <span className="text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 px-1.5 rounded">Part: Hook</span>}
                  {idx === 1 && <span className="text-[10px] font-mono bg-rose-50 text-rose-800 border border-rose-200 px-1.5 rounded">Part: Pain</span>}
                  {idx === 2 && <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 rounded">Part: Value</span>}
                  {idx === 3 && <span className="text-[10px] font-mono bg-indigo-50 text-indigo-800 border border-indigo-200 px-1.5 rounded">Part: CTA</span>}
                </div>
                <p className="text-slate-900 font-medium">&ldquo;{t.sentence}&rdquo;</p>
              </div>

              <div className="sm:w-1/3 text-right">
                <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 inline-block">
                  Derived from: {t.derivedFromPackField}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Send Email Simulation Modal */}
      {isSendModalOpen && activeSendEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden text-slate-900">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold">Transmit Complete Outreach Message</h3>
              </div>
              <button
                onClick={() => setIsSendModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono">Recipient:</span>
                  <span className="font-bold text-slate-900">{recipientName} &lt;{recipientEmail}&gt;</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono">Subject:</span>
                  <span className="font-medium text-slate-800">{activeSendEmail.subject}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono">Format Verification:</span>
                  <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                    Greeting · Heading · Hook · Pain · Value · CTA · Closing · Regards
                  </span>
                </div>
              </div>

              {/* Pre-Send Verification Checklist */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="font-mono uppercase text-[10px] text-slate-500 font-bold">
                  Pre-Send Verification Checklist
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Salutation:</strong> Personalized greeting addressing {recipientName}.</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Hook:</strong> Single line proves message was written specifically for this account.</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Pain:</strong> Consequence of the trigger identified (not just the trigger).</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Value:</strong> One sentence on what changes (no feature dumping).</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>CTA:</strong> One specific, low-friction ask.</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Closing &amp; Sign-off:</strong> Proper thank you, regards, and sender signature attached.</span>
                  </div>
                </div>
              </div>

              {sendingState === 'sent' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-semibold flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Email successfully dispatched via connected outbound mail transport!</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsSendModalOpen(false)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={sendingState !== 'idle'}
                onClick={handleExecuteSend}
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded transition shadow-2xs cursor-pointer disabled:opacity-50"
              >
                {sendingState === 'sending' ? (
                  <span>Dispatching...</span>
                ) : sendingState === 'sent' ? (
                  <span>Sent!</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm &amp; Send Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
