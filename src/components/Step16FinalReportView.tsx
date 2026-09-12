import React from 'react';
import {
  FileText,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  FileDown,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { CampaignData } from '../types/agent';
import { generateMarkdownReport } from '../utils/exportReport';

interface Step16FinalReportViewProps {
  campaign: CampaignData;
}

export const Step16FinalReportView: React.FC<Step16FinalReportViewProps> = ({ campaign }) => {
  const [copied, setCopied] = React.useState(false);

  const reportMd = generateMarkdownReport(campaign);

  const handleCopy = () => {
    navigator.clipboard.writeText(reportMd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([reportMd], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${campaign.companyName.toLowerCase().replace(/\s+/g, '-')}-briefing.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isDisqualified = campaign.step15Disqualification.status === 'DISQUALIFIED';

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          <span>Steps 15 &amp; 16</span>
          <span>·</span>
          <span>Qualification Boundary &amp; Executive Briefing</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          {isDisqualified ? (
            <AlertOctagon className="w-5 h-5 text-rose-600" />
          ) : (
            <FileText className="w-5 h-5 text-indigo-600" />
          )}
          Executive Decision &amp; Comprehensive Intelligence Briefing
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Step 15 Disqualification Check protects rep time. Step 16 synthesizes all 16 stages into an actionable dossier.
        </p>
      </div>

      {/* Step 15 Disqualification Verdict Card */}
      <div
        className={`p-6 rounded-xl border shadow-xs ${
          isDisqualified
            ? 'bg-rose-950 text-rose-100 border-rose-800'
            : 'bg-emerald-950 text-emerald-100 border-emerald-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider">
              {isDisqualified ? (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-300">Step 15 Verdict: ACCOUNT DISQUALIFIED</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Step 15 Verdict: ACCOUNT QUALIFIED</span>
                </>
              )}
            </div>
            <h3 className="text-lg font-bold text-white">
              Recommendation: {campaign.finalRecommendation.decision}
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed mt-1">
              {campaign.finalRecommendation.verifiedRationale}
            </p>
          </div>

          <div className="shrink-0 bg-black/40 p-4 rounded-lg border border-white/10 text-center font-mono text-xs">
            <div className="text-[10px] uppercase text-slate-400">Pursuit Gate</div>
            <div
              className={`text-base font-bold mt-0.5 ${
                isDisqualified ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {campaign.finalRecommendation.decision}
            </div>
          </div>
        </div>

        {/* Checked Conditions List */}
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {campaign.step15Disqualification.checkedConditions.map((cond, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {cond.passed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              )}
              <span className={cond.passed ? 'text-slate-300' : 'text-rose-300 font-bold'}>
                {cond.condition}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 16 Briefing Preview & Export Area */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Step 16: Complete Markdown Dossier
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Includes ICP, 18-month shift, buying roles, pack, 4-part emails, and audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded transition cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded transition shadow-2xs cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Markdown Render / Scrollable Text View */}
        <div className="p-5 max-h-[460px] overflow-y-auto font-mono text-xs text-slate-800 bg-slate-50/70 whitespace-pre-wrap leading-relaxed border-t border-slate-100">
          {reportMd}
        </div>
      </div>
    </div>
  );
};
