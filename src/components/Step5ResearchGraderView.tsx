import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Step5ResearchGrader, ResearchFactRow } from '../types/agent';
import { evaluateResearchGrader } from '../utils/grader';

interface Step5ResearchGraderViewProps {
  initialGrader: Step5ResearchGrader;
}

export const Step5ResearchGraderView: React.FC<Step5ResearchGraderViewProps> = ({ initialGrader }) => {
  const [rows, setRows] = useState<ResearchFactRow[]>(initialGrader.rows || []);
  const [currentGrader, setCurrentGrader] = useState<Step5ResearchGrader>(initialGrader);

  const toggleCheck = (id: string, field: 'a_namedRealSource' | 'b_hasDate' | 'c_within24Months' | 'd_salespersonActsDifferently') => {
    const updated = rows.map((r) => {
      if (r.id === id) {
        return { ...r, [field]: !r[field] };
      }
      return r;
    });
    setRows(updated);
    setCurrentGrader(evaluateResearchGrader(updated));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Step 5</span>
          <span>·</span>
          <span>Research Quality Audit</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          Evidence-First Research Grader
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Every statement must satisfy all four tests: named real source, explicit date, within 24 months, and changes how the rep sells.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-500">Total Facts Audited</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {currentGrader.totalFacts}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-500">Fully Verified Facts</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            {currentGrader.verifiedCount}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-500">Verification Ratio</div>
          <div
            className={`text-2xl font-bold font-mono mt-1 ${
              currentGrader.verificationRatioPercent >= 80 ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {currentGrader.verificationRatioPercent}%
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-500">Banned Claims</div>
          <div className="text-2xl font-bold font-mono text-rose-600 mt-1">
            {currentGrader.doNotUseList.length}
          </div>
        </div>
      </div>

      {/* Audit Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
            Fact-by-Fact Quality Matrix
          </h3>
          <span className="text-[11px] font-mono text-slate-500">Interactive Checklist</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-200 text-[10px] font-mono uppercase text-slate-500">
                <th className="py-2.5 px-4">Research Claim / Fact</th>
                <th className="py-2.5 px-3 text-center">Named Source</th>
                <th className="py-2.5 px-3 text-center">Specific Date</th>
                <th className="py-2.5 px-3 text-center">&le; 24 Months</th>
                <th className="py-2.5 px-3 text-center">Changes Rep Action</th>
                <th className="py-2.5 px-4 text-right">Audit Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => {
                const isPassing =
                  row.a_namedRealSource &&
                  row.b_hasDate &&
                  row.c_within24Months &&
                  row.d_salespersonActsDifferently;

                return (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium text-slate-900 max-w-md">
                      {row.claimOrFact}
                      {row.bannedReason && (
                        <div className="text-[10px] text-rose-600 font-mono mt-1">
                          Reason Banned: {row.bannedReason}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggleCheck(row.id, 'a_namedRealSource')}
                        className="cursor-pointer"
                      >
                        {row.a_namedRealSource ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 inline" />
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggleCheck(row.id, 'b_hasDate')}
                        className="cursor-pointer"
                      >
                        {row.b_hasDate ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 inline" />
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggleCheck(row.id, 'c_within24Months')}
                        className="cursor-pointer"
                      >
                        {row.c_within24Months ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 inline" />
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggleCheck(row.id, 'd_salespersonActsDifferently')}
                        className="cursor-pointer"
                      >
                        {row.d_salespersonActsDifferently ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 inline" />
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isPassing
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {isPassing ? 'VERIFIED' : 'DO NOT USE'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Banned Claims Section */}
      {currentGrader.doNotUseList.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-rose-900 font-bold font-mono uppercase text-[11px]">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Strict Banned List — Quarantined from Personalization Pack</span>
          </div>
          <ul className="space-y-1 text-rose-800 list-disc list-inside">
            {currentGrader.doNotUseList.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
