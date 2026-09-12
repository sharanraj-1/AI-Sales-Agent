import React from 'react';
import { Users, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Step3BuyingRoles } from '../types/agent';

interface Step3BuyingRolesViewProps {
  step3: Step3BuyingRoles;
}

export const Step3BuyingRolesView: React.FC<Step3BuyingRolesViewProps> = ({ step3 }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Step 3</span>
          <span>·</span>
          <span>Decision Dynamics</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          Buying Roles Matrix &amp; Mandatory Blocker Identification
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Map specific organizational titles to decision roles: champion, budget holder, technical checker, daily user, and mandatory blocker.
        </p>
      </div>

      {/* Sequence Recommendation */}
      <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 space-y-2 text-xs">
        <div className="flex items-center justify-between font-mono text-[10px] text-indigo-800 uppercase font-bold">
          <span>Approach Sequence Recommendation</span>
          <span className="bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded border border-indigo-300">
            Step 3 Strategy
          </span>
        </div>
        <div className="text-sm font-bold text-slate-900">
          First Approach: {step3.whoToApproachFirst}
        </div>
        <p className="text-slate-700 leading-relaxed">{step3.rationaleForSequence}</p>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {step3.roles.map((role) => (
          <div
            key={role.id}
            className={`bg-white border rounded-xl p-5 shadow-2xs space-y-3 ${
              role.roleInDecision === 'blocker'
                ? 'border-rose-300 bg-rose-50/30 ring-1 ring-rose-200'
                : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm">{role.jobTitle}</span>
              <span
                className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  role.roleInDecision === 'blocker'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : role.roleInDecision === 'champion'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                }`}
              >
                {role.roleInDecision}
              </span>
            </div>

            <div className="space-y-1.5">
              <div>
                <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">Cares About:</span>
                <p className="text-slate-800 mt-0.5">{role.whatTheyCareAbout}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">Decision Logic:</span>
                <p className="text-slate-800 mt-0.5">{role.whyTheyBlockOrChampion}</p>
              </div>
            </div>

            {role.isMandatoryBlockerIdentified && (
              <div className="pt-2 border-t border-rose-200/80 flex items-center gap-1.5 text-rose-800 font-medium text-[11px]">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Mandatory Blocker Accounted For in Outreach Strategy</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
