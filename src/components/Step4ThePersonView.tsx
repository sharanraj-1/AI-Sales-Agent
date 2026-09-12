import React from 'react';
import { UserCheck, Quote, AlertOctagon, CheckCircle2, FileText } from 'lucide-react';
import { Step4ThePerson } from '../types/agent';

interface Step4ThePersonViewProps {
  step4: Step4ThePerson;
}

export const Step4ThePersonView: React.FC<Step4ThePersonViewProps> = ({ step4 }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Step 4</span>
          <span>·</span>
          <span>Target Person Verification</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-indigo-600" />
          Named Individual &amp; Public Evidence Anchor
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Verify verified quotes, actions, or articles from the target contact before crafting opening lines.
        </p>
      </div>

      {/* Person Summary Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{step4.personName}</h3>
            <p className="text-xs text-slate-600 font-medium">{step4.currentTitle}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
            <span className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              Dept: {step4.department}
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              Tenure: {step4.tenure}
            </span>
          </div>
        </div>

        {/* Public Quotes / Actions */}
        <div className="mt-4 space-y-3">
          <div className="text-xs font-mono uppercase font-bold text-slate-500 flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5 text-indigo-600" />
            <span>Verified Public Quotes &amp; Actions</span>
          </div>

          {step4.verifiedQuotesOrActions.map((q, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
              <p className="text-slate-900 font-medium italic text-sm">
                &ldquo;{q.quoteOrAction}&rdquo;
              </p>
              <div className="flex flex-wrap items-center justify-between text-slate-500 font-mono text-[11px] pt-2 border-t border-slate-200/60">
                <span>Context: {q.context} ({q.date})</span>
                <span className="text-indigo-600">{q.publicUrlOrSource}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opening Lines Ready for Hook */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
            Evidence-Backed Opening Line Options
          </h3>
        </div>
        <div className="space-y-2 text-xs">
          {step4.openingLinesEvidenceBacked.map((line, idx) => (
            <div key={idx} className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-200 text-slate-800 font-medium">
              &ldquo;{line}&rdquo;
            </div>
          ))}
        </div>
      </div>

      {/* Anti-Flattery Rule */}
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3 text-xs text-rose-900">
        <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold font-mono uppercase text-[11px]">
            Strict Rule: Banned Flattery Warning
          </div>
          <p className="leading-relaxed">{step4.bannedFlatteryAlert}</p>
        </div>
      </div>
    </div>
  );
};
