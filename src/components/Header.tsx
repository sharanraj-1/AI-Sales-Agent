import React from 'react';
import {
  ShieldCheck,
  Plus,
  Copy,
  Check,
  FileDown,
  Building2,
  ChevronDown,
  Sparkles,
  Layers
} from 'lucide-react';
import { CampaignData } from '../types/agent';

interface HeaderProps {
  campaigns: CampaignData[];
  selectedCampaign: CampaignData;
  onSelectCampaign: (id: string) => void;
  onOpenNewModal: () => void;
  onExportMarkdown: () => void;
  onCopyAllOutreach: () => void;
  copySuccess: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  campaigns,
  selectedCampaign,
  onSelectCampaign,
  onOpenNewModal,
  onExportMarkdown,
  onCopyAllOutreach,
  copySuccess
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3">
          {/* Brand and Current Account */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white">
                  EvidenceSales AI
                </h1>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  4-Part Outreach Protocol
                </span>
              </div>
              <p className="text-xs text-slate-400">
                16-Stage Deterministic B2B Sales Intelligence &amp; Structured Outreach
              </p>
            </div>
          </div>

          {/* Account Selector & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Account Dropdown */}
            <div className="relative">
              <select
                value={selectedCampaign.id}
                onChange={(e) => onSelectCampaign(e.target.value)}
                aria-label="Select Target Account"
                className="appearance-none bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-100 text-xs font-semibold rounded-lg pl-8 pr-8 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer transition"
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.companyName} ({c.finalRecommendation.decision})
                  </option>
                ))}
              </select>
              <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Copy Outreach Pack */}
            <button
              onClick={onCopyAllOutreach}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium px-3 py-2 rounded-lg transition cursor-pointer"
            >
              {copySuccess ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copySuccess ? 'Copied Outreach' : 'Copy Outreach'}</span>
            </button>

            {/* Export Markdown */}
            <button
              onClick={onExportMarkdown}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium px-3 py-2 rounded-lg transition cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export .md</span>
            </button>

            {/* New Research Run */}
            <button
              onClick={onOpenNewModal}
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Research Run</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
