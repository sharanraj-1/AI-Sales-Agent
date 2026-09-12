import React from 'react';
import { Wrench, AlertTriangle, ArrowRight, CheckCircle2, History } from 'lucide-react';
import { Step13Diagnosis, Step14FixLoop } from '../types/agent';

interface Step13DiagnosisViewProps {
  diagnosis: Step13Diagnosis;
  fixLoop: Step14FixLoop;
}

export const Step13DiagnosisView: React.FC<Step13DiagnosisViewProps> = ({
  diagnosis,
  fixLoop
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Steps 13 &amp; 14</span>
          <span>·</span>
          <span>Root Cause &amp; Self-Correction Engine</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-indigo-600" />
          Failure Diagnosis &amp; Permanent Rule Iteration
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Trace message weaknesses back to the upstream research stage that caused it, and log the permanent prompt/rule adjustment.
        </p>
      </div>

      {/* Diagnosis Card (Step 13) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="font-mono text-xs font-bold uppercase text-slate-900">
              Step 13: Upstream Root-Cause Attribution
            </span>
          </div>
          <span className="font-mono text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300 font-bold">
            Weakest Link: Step {diagnosis.weakestOutreachStep}
          </span>
        </div>

        <div className="text-xs space-y-2">
          <div>
            <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">Identified Weakness:</span>
            <p className="text-slate-900 font-medium mt-0.5">{diagnosis.weakestReason}</p>
          </div>
          <div>
            <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">Diagnostic Rationale:</span>
            <p className="text-slate-700 leading-relaxed mt-0.5">{diagnosis.conciseExplanation}</p>
          </div>
        </div>
      </div>

      {/* Fix Loop Card (Step 14) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-mono text-xs font-bold uppercase text-slate-900">
              Step 14: Permanent Rule Adjustment
            </span>
          </div>
          <span className="font-mono text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 font-bold">
            Responsible: {fixLoop.responsibleResearchStage}
          </span>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-1">
          <div className="font-mono text-[10px] text-indigo-700 uppercase font-bold">
            System Rule Changed
          </div>
          <p className="text-slate-900 font-bold text-sm leading-snug">
            {fixLoop.ruleChanged}
          </p>
        </div>

        {/* Before vs After Benchmark Comparison */}
        <div>
          <h4 className="text-[11px] font-mono uppercase text-slate-500 font-bold mb-2">
            Before vs. After Fix Metrics Comparison
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {fixLoop.comparison.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase">{item.metric}</div>
                <div className="flex items-center gap-2">
                  <span className="line-through text-slate-400">{item.before}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="font-bold text-emerald-600">{item.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
