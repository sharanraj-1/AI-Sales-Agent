import React from 'react';
import { Target, CheckCircle2, XCircle, Eye, AlertTriangle } from 'lucide-react';
import { Step0ICP } from '../types/agent';

interface Step0ICPViewProps {
  step0: Step0ICP;
}

export const Step0ICPView: React.FC<Step0ICPViewProps> = ({ step0 }) => {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Step 0</span>
          <span>·</span>
          <span>Grounding Baseline</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          Ideal Customer Profile &amp; Observable Signals
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Establish strict boundary conditions and observable external signals before conducting research.
        </p>
      </div>

      {/* Grid: Who Fits vs Strict Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Who Fits */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Who Strictly Fits
            </h3>
          </div>
          <ul className="space-y-2 text-xs">
            {step0.whoFits.map((fit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{fit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Strict Exclusions */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <XCircle className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Strict Disqualifications / Exclusions
            </h3>
          </div>
          <ul className="space-y-2 text-xs">
            {step0.strictExclusions.map((ex, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Externally Observable Buying Signals */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Externally Observable Buying Signals
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {step0.buyingSignals.length} verified signals
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {step0.buyingSignals.map((signal, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50">
              <div className="space-y-1">
                <div className="font-semibold text-slate-900">{signal.signal}</div>
                <div className="text-slate-500 text-[11px]">
                  Verified Source: <span className="font-mono text-slate-700">{signal.verificationSource}</span>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                Observable Public Evidence
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Weakest Assumption Audit */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <h3 className="text-xs font-bold text-amber-950 uppercase font-mono tracking-wider">
            Identified Weakest Assumption &amp; Risk Boundary
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-mono text-[10px] text-amber-800 uppercase font-bold">Assumption</div>
            <p className="text-slate-900 mt-1 font-medium">{step0.weakestAssumption.assumption}</p>
          </div>
          <div>
            <div className="font-mono text-[10px] text-amber-800 uppercase font-bold">Risk If False</div>
            <p className="text-slate-800 mt-1">{step0.weakestAssumption.riskIfWrong}</p>
          </div>
          <div>
            <div className="font-mono text-[10px] text-amber-800 uppercase font-bold">Verification Test</div>
            <p className="text-slate-800 mt-1">{step0.weakestAssumption.howToTest}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
