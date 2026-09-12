import React from 'react';
import { Package, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { PersonalizationPack } from '../types/agent';

interface Step6PersonalizationPackViewProps {
  pack: PersonalizationPack;
}

export const Step6PersonalizationPackView: React.FC<Step6PersonalizationPackViewProps> = ({ pack }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Step 6</span>
          <span>·</span>
          <span>Immutable Synthesis</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Package className="w-5 h-5 text-indigo-600" />
          The Personalization Pack
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          The single source of truth for all outreach. Every claim in subsequent emails must strictly trace back here.
        </p>
      </div>

      {/* Lock Banner */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-4 flex items-center justify-between border border-slate-800 text-xs">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
            Immutable Outreach Grounding File Locked
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Enforcing 0% Hallucination Policy
        </span>
      </div>

      {/* Pack Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
            Target Account &amp; Contact
          </div>
          <div className="text-sm font-bold text-slate-900">
            {pack.targetPersonName} ({pack.targetPersonTitle})
          </div>
          <div className="text-slate-600">{pack.companyName}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-indigo-600 font-bold">
            18-Month Industry Shift
          </div>
          <p className="text-slate-800 leading-relaxed font-medium">
            {pack.industryShiftSummary}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-amber-600 font-bold">
            Account Change Trigger (Last 12 Months)
          </div>
          <p className="text-slate-800 leading-relaxed font-medium">
            {pack.accountChangeTrigger}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-rose-600 font-bold">
            Operational Consequence
          </div>
          <p className="text-slate-800 leading-relaxed font-medium">
            {pack.operationalConsequence}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-emerald-600 font-bold">
            Champion Value Angle
          </div>
          <p className="text-slate-800 leading-relaxed font-medium">
            {pack.championAngle}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-purple-600 font-bold">
            Identified Blocker Mitigation
          </div>
          <p className="text-slate-800 leading-relaxed font-medium">
            {pack.identifiedBlockerMitigation}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-1.5 md:col-span-2">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
            Primary Evidence Anchor
          </div>
          <p className="text-slate-900 font-bold leading-relaxed">
            {pack.evidenceAnchor}
          </p>
        </div>
      </div>

      {/* Quarantined Claims Notice */}
      {pack.doNotUseBannedClaims && pack.doNotUseBannedClaims.length > 0 && (
        <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-rose-900 font-mono font-bold uppercase text-[10px]">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Active Exclusions from Pack</span>
          </div>
          <ul className="text-rose-800 list-disc list-inside space-y-0.5">
            {pack.doNotUseBannedClaims.map((claim: string, idx: number) => (
              <li key={idx}>{claim}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
