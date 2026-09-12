import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';
import { Step11MessageGrader, Step12MessageVerdict } from '../types/agent';

interface Step11MessageGraderViewProps {
  grader: Step11MessageGrader;
  verdict: Step12MessageVerdict;
}

export const Step11MessageGraderView: React.FC<Step11MessageGraderViewProps> = ({
  grader,
  verdict
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Steps 11 &amp; 12</span>
          <span>·</span>
          <span>Outreach Quality Audit &amp; Release Verdict</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-600" />
          Sentence-by-Sentence Verification Grader
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Every outreach sentence is classified as FROM PACK, GENERIC, MADE UP, or BANNED. Strong threshold requires &ge;70% from pack and &le;20% generic.
        </p>
      </div>

      {/* Step 12 Verdict Banner */}
      <div
        className={`p-6 rounded-xl border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          verdict.verdict === 'STRONG'
            ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
            : 'bg-rose-950 text-rose-100 border-rose-800'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {verdict.verdict === 'STRONG' ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400" />
            )}
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-emerald-300">
              Outreach Release Verdict: {verdict.verdict}
            </span>
          </div>
          <p className="text-sm font-medium text-white max-w-2xl leading-relaxed">
            {verdict.summaryExplanation}
          </p>
        </div>

        <div className="bg-black/30 p-3 rounded-lg border border-white/10 font-mono text-xs shrink-0 text-center">
          <div className="text-[10px] uppercase text-slate-400">Release Gate</div>
          <div
            className={`text-lg font-bold ${
              verdict.verdict === 'STRONG' ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {verdict.verdict === 'STRONG' ? 'APPROVED TO SEND' : 'REJECTED — REWORK'}
          </div>
        </div>
      </div>

      {/* Audit Ratios Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-500">From Pack Ratio</div>
          <div className="flex items-baseline justify-between mt-1">
            <span
              className={`text-2xl font-bold font-mono ${
                grader.fromPackRatio >= 70 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {grader.fromPackRatio}%
            </span>
            <span className="text-[10px] font-mono text-slate-400">&ge;70% Required</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-500">Generic Ratio</div>
          <div className="flex items-baseline justify-between mt-1">
            <span
              className={`text-2xl font-bold font-mono ${
                grader.genericRatio <= 20 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {grader.genericRatio}%
            </span>
            <span className="text-[10px] font-mono text-slate-400">&le;20% Allowed</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-500">Made Up Sentences</div>
          <div className="flex items-baseline justify-between mt-1">
            <span
              className={`text-2xl font-bold font-mono ${
                grader.madeUpCount === 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {grader.madeUpCount}
            </span>
            <span className="text-[10px] font-mono text-slate-400">0 Allowed</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-500">Banned Phrases</div>
          <div className="flex items-baseline justify-between mt-1">
            <span
              className={`text-2xl font-bold font-mono ${
                grader.bannedCount === 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {grader.bannedCount}
            </span>
            <span className="text-[10px] font-mono text-slate-400">0 Allowed</span>
          </div>
        </div>
      </div>

      {/* Sentence-by-Sentence Audit List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
            Sentence Classification Log
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            {grader.gradedSentences.length} sentences audited
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {grader.gradedSentences.map((s, idx) => (
            <div
              key={idx}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50"
            >
              <div className="space-y-1 flex-1">
                <div className="text-[10px] font-mono text-slate-400">
                  [{s.source || s.messageOrigin}] Sentence {idx + 1}
                </div>
                <p className="text-slate-900 font-medium">&ldquo;{s.sentence}&rdquo;</p>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    (s.classification || s.label) === 'FROM PACK'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : (s.classification || s.label) === 'GENERIC'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {s.classification || s.label}
                </span>
                {(s.traceField || s.reason) && (
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    {s.traceField || s.reason}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
