import React from 'react';
import { DoorClosed, CheckCircle2, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Step7PreOutreachCheck } from '../types/agent';

interface Step7PreOutreachViewProps {
  check: Step7PreOutreachCheck;
  onProceedToEmails: () => void;
}

export const Step7PreOutreachView: React.FC<Step7PreOutreachViewProps> = ({
  check,
  onProceedToEmails
}) => {
  const gates = [
    {
      title: 'Target Person Quote or Action Verified',
      description: 'Named individual with verified public words or concrete actions in the last 24 months.',
      passed: check.hasTargetPersonQuoteOrAction
    },
    {
      title: 'Observable Account Trigger (<12 Months)',
      description: 'Verified public event, expansion, acquisition, or filing within the last 12 months.',
      passed: check.hasVerifiedAccountTrigger12Months
    },
    {
      title: 'Budget Consequence Defined (Not Feature Pitch)',
      description: 'Clearly identifies where budget or hours are being lost, rather than listing capabilities.',
      passed: check.hasBudgetConsequenceNotFeaturePitch
    },
    {
      title: 'Mandatory Blocker Identified & Mitigated',
      description: 'Identifies the internal stakeholder most likely to veto the purchase and prepares mitigation.',
      passed: check.hasIdentifiedBlocker
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Step 7</span>
          <span>·</span>
          <span>Quality Gate</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <DoorClosed className="w-5 h-5 text-indigo-600" />
          Pre-Outreach Check (Strict Gate)
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          All 4 prerequisite gates must pass before the AI or salesperson is permitted to write or transmit cold outreach.
        </p>
      </div>

      {/* Gate Status Banner */}
      <div
        className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          check.canProceedToOutreach
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            : 'bg-rose-50/80 border-rose-300 text-rose-950'
        }`}
      >
        <div className="flex items-center gap-3">
          {check.canProceedToOutreach ? (
            <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
          ) : (
            <XCircle className="w-7 h-7 text-rose-600 shrink-0" />
          )}
          <div>
            <div className="text-sm font-bold">
              {check.canProceedToOutreach
                ? 'Outreach Release Gate: CLEARED'
                : 'Outreach Release Gate: BLOCKED'}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {check.canProceedToOutreach
                ? 'All 4 mandatory intelligence criteria verified. Ready to proceed to 4-Part Email Architecture.'
                : check.blockReason || 'One or more required research gates failed. Outreach generation halted.'}
            </p>
          </div>
        </div>

        {check.canProceedToOutreach && (
          <button
            onClick={onProceedToEmails}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer whitespace-nowrap"
          >
            <span>Proceed to 4-Part Emails</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Gate Criteria Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {gates.map((g, idx) => (
          <div
            key={idx}
            className={`bg-white border rounded-xl p-5 shadow-2xs space-y-2 ${
              g.passed ? 'border-slate-200' : 'border-rose-300 bg-rose-50/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">{g.title}</span>
              {g.passed ? (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  PASSED
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  <XCircle className="w-3 h-3 text-rose-600" />
                  FAILED
                </span>
              )}
            </div>
            <p className="text-slate-600 leading-relaxed">{g.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
