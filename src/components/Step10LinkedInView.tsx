import React, { useState } from 'react';
import { Share2, Check, Copy, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Step10LinkedIn } from '../types/agent';

interface Step10LinkedInViewProps {
  linkedIn: Step10LinkedIn;
  isDisqualified: boolean;
}

export const Step10LinkedInView: React.FC<Step10LinkedInViewProps> = ({
  linkedIn,
  isDisqualified
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isDisqualified) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-2xl mx-auto shadow-xs">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          LinkedIn Cadence Halted — Account Disqualified
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          No social outreach is generated for accounts failing boundary qualification checks.
        </p>
      </div>
    );
  }

  const { connectionRequest, messages } = linkedIn;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Step 10</span>
          <span>·</span>
          <span>Social Multi-Touch</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-indigo-600" />
          LinkedIn Connection &amp; 3-Touch InMail Sequence
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Strict character limits (&lt;300 chars for request) and the mandatory Name-Swap Test.
        </p>
      </div>

      {/* Connection Request */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase text-slate-900">
              Connection Request Note
            </span>
            <span
              className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                connectionRequest.characterCount <= 300
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {connectionRequest.characterCount}/300 chars
            </span>
          </div>

          <button
            onClick={() => handleCopy(connectionRequest.text, 'li-req')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded transition cursor-pointer"
          >
            {copiedId === 'li-req' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedId === 'li-req' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-800 font-medium leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
          &ldquo;{connectionRequest.text}&rdquo;
        </p>

        {/* Name Swap Audit */}
        <div className="bg-indigo-50/60 border border-indigo-100 rounded-lg p-3 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-900 font-mono font-bold uppercase text-[10px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Name-Swap Test Verdict: PASSED</span>
          </div>
          <p className="text-slate-700 leading-snug">{connectionRequest.explanation}</p>
        </div>
      </div>

      {/* Subsequent InMail Messages */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold font-mono uppercase text-slate-500 tracking-wider">
          Follow-Up Direct Messages (Post-Connection)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-sm">
                    Message {m.messageNumber}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {m.timing}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-indigo-700 font-bold">
                  Goal: {m.objective}
                </div>

                <p className="text-slate-800 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                  &ldquo;{m.body}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                <span>{m.characterCount} chars</span>
                <button
                  onClick={() => handleCopy(m.body, m.id)}
                  className="inline-flex items-center gap-1 text-slate-700 hover:text-indigo-600 font-semibold cursor-pointer"
                >
                  {copiedId === m.id ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
