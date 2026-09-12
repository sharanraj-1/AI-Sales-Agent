import React from 'react';
import {
  Target,
  TrendingUp,
  Building,
  Users,
  UserCheck,
  Award,
  Package,
  DoorClosed,
  Mail,
  Share2,
  Scale,
  Wrench,
  FileText,
  AlertOctagon
} from 'lucide-react';

export type TabStep =
  | 'step0'
  | 'step1'
  | 'step2'
  | 'step3'
  | 'step4'
  | 'step5'
  | 'step6'
  | 'step7'
  | 'step8_9'
  | 'step10'
  | 'step11_12'
  | 'step13_14'
  | 'step15_16';

interface StageNavProps {
  currentTab: TabStep;
  onSelectTab: (tab: TabStep) => void;
  verificationRatio: number;
  messageVerdict: 'STRONG' | 'DOES NOT GO OUT';
  isDisqualified: boolean;
}

export const StageNav: React.FC<StageNavProps> = ({
  currentTab,
  onSelectTab,
  verificationRatio,
  messageVerdict,
  isDisqualified
}) => {
  const tabs = [
    { id: 'step0' as TabStep, label: '0. ICP & Signals', icon: Target },
    { id: 'step1' as TabStep, label: '1. Industry Shift', icon: TrendingUp },
    { id: 'step2' as TabStep, label: '2. Account Diagnostics', icon: Building },
    { id: 'step3' as TabStep, label: '3. Buying Roles', icon: Users },
    { id: 'step4' as TabStep, label: '4. Target Person', icon: UserCheck },
    {
      id: 'step5' as TabStep,
      label: '5. Research Grader',
      icon: Award,
      badge: `${verificationRatio}%`
    },
    { id: 'step6' as TabStep, label: '6. Personalization Pack', icon: Package },
    { id: 'step7' as TabStep, label: '7. Pre-Outreach Gate', icon: DoorClosed },
    {
      id: 'step8_9' as TabStep,
      label: '8-9. 4-Part Emails',
      icon: Mail,
      highlight: true
    },
    { id: 'step10' as TabStep, label: '10. LinkedIn Cadence', icon: Share2 },
    {
      id: 'step11_12' as TabStep,
      label: '11-12. Message Grader',
      icon: Scale,
      verdict: messageVerdict
    },
    { id: 'step13_14' as TabStep, label: '13-14. Fix Loop', icon: Wrench },
    {
      id: 'step15_16' as TabStep,
      label: '15-16. Final Briefing',
      icon: isDisqualified ? AlertOctagon : FileText
    }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 overflow-x-auto shadow-2xs scrollbar-none sticky top-[57px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 py-1.5 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>

              {tab.highlight && (
                <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded ml-0.5">
                  Hook·Pain·Val·CTA
                </span>
              )}

              {tab.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                  {tab.badge}
                </span>
              )}

              {tab.verdict && (
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                    tab.verdict === 'STRONG'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-rose-50 text-rose-700 border-rose-300'
                  }`}
                >
                  {tab.verdict}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
