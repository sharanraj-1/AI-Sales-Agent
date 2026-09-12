import React from 'react';
import { Building, DollarSign, Search, Calendar, FileText } from 'lucide-react';
import { Step2AccountDiagnostics } from '../types/agent';

interface Step2AccountViewProps {
  step2: Step2AccountDiagnostics;
}

export const Step2AccountView: React.FC<Step2AccountViewProps> = ({ step2 }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Step 2</span>
          <span>·</span>
          <span>Account Intelligence</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Building className="w-5 h-5 text-indigo-600" />
          Operational Model, Money Flow &amp; 12-Month Events
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Understand how the business actually makes and spends money before pitching software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold font-mono uppercase text-[11px] pb-1 border-b border-slate-100">
            <Building className="w-4 h-4 text-indigo-600" />
            <span>Operational Model</span>
          </div>
          <p className="text-slate-700 leading-relaxed">{step2.operationalModel}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold font-mono uppercase text-[11px] pb-1 border-b border-slate-100">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Money Flow &amp; Margin</span>
          </div>
          <p className="text-slate-700 leading-relaxed">{step2.moneyFlow}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold font-mono uppercase text-[11px] pb-1 border-b border-slate-100">
            <Search className="w-4 h-4 text-amber-600" />
            <span>Procurement Discovery</span>
          </div>
          <p className="text-slate-700 leading-relaxed">{step2.procurementDiscovery}</p>
        </div>
      </div>

      {/* 12-Month Events */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Observable Events in Last 12 Months
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {step2.whatChangedInLast12Months.length} events
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {step2.whatChangedInLast12Months.map((ev, idx) => (
            <div key={idx} className="p-4 space-y-1.5 hover:bg-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-slate-900 text-sm">{ev.event}</span>
                <span className="text-[11px] font-mono text-slate-500">{ev.date} · Source: {ev.source}</span>
              </div>
              <div className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed">
                <strong className="text-indigo-700 font-mono">Budget Impact:</strong> {ev.budgetImpact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
