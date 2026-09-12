import React from 'react';
import { TrendingUp, FileCheck, DollarSign, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Step1IndustryShift } from '../types/agent';

interface Step1IndustryShiftViewProps {
  step1: Step1IndustryShift;
}

export const Step1IndustryShiftView: React.FC<Step1IndustryShiftViewProps> = ({ step1 }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Step 1</span>
          <span>·</span>
          <span>Macro Horizon (18-Month Window)</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          The Macro Industry Shift &amp; Budget Consequence
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Must name an explicit shift that occurred within the past 18 months, with public citations and budget impact.
        </p>
      </div>

      {/* Primary Shift Statement */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-sm space-y-3">
        <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
          Verified 18-Month Regulatory / Structural Shift
        </div>
        <p className="text-base sm:text-lg font-medium leading-relaxed">
          {step1.macroShift18Months}
        </p>
      </div>

      {/* Sources & Budget Consequence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Source Citations */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <FileCheck className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Public Documentation &amp; Citations
            </h3>
          </div>
          <div className="space-y-2.5 text-xs">
            {step1.sourceCitations.map((source, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">{source.source}</div>
                <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                  <span>Date: {source.date}</span>
                  <span className="text-indigo-600">{source.urlOrDocument}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Consequence */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Direct Budget &amp; Resource Consequence
            </h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-200/80">
            {step1.budgetConsequence}
          </p>
        </div>
      </div>

      {/* What is Known vs What Remains Unknown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-bold font-mono uppercase text-[11px] pb-1 border-b border-slate-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Knowns</span>
          </div>
          <ul className="space-y-1.5 text-slate-700">
            {step1.whatIsKnown.map((k, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-slate-600 font-bold font-mono uppercase text-[11px] pb-1 border-b border-slate-100">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Disclosed Unknowns (Gaps for Discovery)</span>
          </div>
          <ul className="space-y-1.5 text-slate-700">
            {step1.whatRemainsUnknown.map((u, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
