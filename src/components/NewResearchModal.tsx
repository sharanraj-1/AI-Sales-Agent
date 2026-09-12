import React, { useState } from 'react';
import { X, Sparkles, Building2, User, Target, Layers } from 'lucide-react';
import { InputContext } from '../types/agent';

interface NewResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (ctx: InputContext) => void;
}

export const NewResearchModal: React.FC<NewResearchModalProps> = ({
  isOpen,
  onClose,
  onGenerate
}) => {
  const [whatWeSell, setWhatWeSell] = useState({
    company: 'DataGuard AI',
    productOrService: 'In-line API compliance and automated data redaction proxy',
    whatItDoes: 'Intercepts distributed data feeds and redacts sensitive PII/PHI in real time before logs are persisted or exported.',
    problemsItSolves: 'Manual OCR compliance triage, cross-facility data leakage risk, engineering hours wasted on compliance reports.',
    keyCapabilities: ['Zero-latency redaction proxy', 'One-click OCR audit reports', 'Non-blocking telemetry sensor'],
    targetIndustries: ['Healthcare Systems', 'Financial Technology', 'Enterprise Logistics'],
    targetBuyers: ['CISO', 'VP of Information Security', 'Head of Clinical Infrastructure'],
    relevantBusinessOutcomes: ['Eliminate manual compliance triage', 'Zero-disruption EHR integration'],
    approvedProductClaims: ['Passive proxy deployment', 'Real-time telemetry redaction'],
    claimsWeMustNotMake: ['Guaranteed zero breach promise']
  });

  const [whoWeSellTo, setWhoWeSellTo] = useState({
    targetBuyerTitles: ['CISO', 'VP of Information Security', 'Head of Clinical Infrastructure']
  });

  const [targetAccount, setTargetAccount] = useState({
    company: 'Summit Health Network',
    website: 'https://summithealth.example.com',
    industry: 'Healthcare Technology',
    country: 'United States',
    knownPerson: 'Sarah Jenkins (Chief Information Officer)',
    knownDepartment: 'Information Technology & Security',
    trigger: 'Consolidation of 3 regional surgery centers into unified telehealth portal'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      whatWeSell,
      targetAccount
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-900">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold">Launch Evidence-First Research Run</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* What We Sell */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-indigo-900 font-bold font-mono uppercase text-[11px]">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Section 1: What We Sell</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  value={whatWeSell.company}
                  onChange={(e) => setWhatWeSell({ ...whatWeSell, company: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Product / Solution</label>
                <input
                  type="text"
                  value={whatWeSell.productOrService}
                  onChange={(e) =>
                    setWhatWeSell({ ...whatWeSell, productOrService: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Core Operational Problem Solved</label>
              <input
                type="text"
                value={whatWeSell.problemsItSolves}
                onChange={(e) =>
                  setWhatWeSell({ ...whatWeSell, problemsItSolves: e.target.value })
                }
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Target Account */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-indigo-900 font-bold font-mono uppercase text-[11px]">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>Section 2: Target Account</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  value={targetAccount.company}
                  onChange={(e) =>
                    setTargetAccount({ ...targetAccount, company: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Target Industry</label>
                <input
                  type="text"
                  value={targetAccount.industry}
                  onChange={(e) =>
                    setTargetAccount({ ...targetAccount, industry: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Named Person (and Title)</label>
                <input
                  type="text"
                  value={targetAccount.knownPerson}
                  onChange={(e) =>
                    setTargetAccount({ ...targetAccount, knownPerson: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g. John Doe (VP of Security)"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Recent Event / Trigger (12 Mo)</label>
                <input
                  type="text"
                  value={targetAccount.trigger}
                  onChange={(e) =>
                    setTargetAccount({ ...targetAccount, trigger: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g. Acquisition, portal launch"
                  required
                />
              </div>
            </div>
          </div>

          {/* 4-Part Structure Reminder */}
          <div className="bg-amber-50 p-3.5 rounded-lg border border-amber-200 text-amber-900 text-xs">
            <span className="font-bold">Output Standard:</span> Generates complete 16-stage dossier with emails strictly structured in the 4-part format: <strong>Hook</strong> (written for them), <strong>Pain</strong> (consequence of trigger), <strong>Value</strong> (what changes), and <strong>CTA</strong> (one small ask).
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Execute 16-Step Pipeline</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
