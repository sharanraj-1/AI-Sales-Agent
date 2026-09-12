import React, { useState } from 'react';
import { initialCampaigns } from './data/campaigns';
import { CampaignData, InputContext } from './types/agent';
import { Header } from './components/Header';
import { StageNav, TabStep } from './components/StageNav';
import { Step0ICPView } from './components/Step0ICPView';
import { Step1IndustryShiftView } from './components/Step1IndustryShiftView';
import { Step2AccountView } from './components/Step2AccountView';
import { Step3BuyingRolesView } from './components/Step3BuyingRolesView';
import { Step4ThePersonView } from './components/Step4ThePersonView';
import { Step5ResearchGraderView } from './components/Step5ResearchGraderView';
import { Step6PersonalizationPackView } from './components/Step6PersonalizationPackView';
import { Step7PreOutreachView } from './components/Step7PreOutreachView';
import { OutreachEmailsView } from './components/OutreachEmailsView';
import { Step10LinkedInView } from './components/Step10LinkedInView';
import { Step11MessageGraderView } from './components/Step11MessageGraderView';
import { Step13DiagnosisView } from './components/Step13DiagnosisView';
import { Step16FinalReportView } from './components/Step16FinalReportView';
import { NewResearchModal } from './components/NewResearchModal';
import { generateCampaignFromInput } from './utils/aiPipeline';
import { generateMarkdownReport } from './utils/exportReport';

export function App() {
  const [campaigns, setCampaigns] = useState<CampaignData[]>(initialCampaigns);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(initialCampaigns[0].id);
  const [currentTab, setCurrentTab] = useState<TabStep>('step8_9'); // Default directly to the 4-Part Emails tab as requested by the user!
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const selectedCampaign =
    campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  const isDisqualified =
    selectedCampaign.step15Disqualification.status === 'DISQUALIFIED';

  const handleSelectCampaign = (id: string) => {
    setSelectedCampaignId(id);
  };

  const handleCreateCampaign = (ctx: InputContext) => {
    const newCamp = generateCampaignFromInput(ctx);
    setCampaigns([newCamp, ...campaigns]);
    setSelectedCampaignId(newCamp.id);
    setCurrentTab('step8_9');
  };

  const handleExportMarkdown = () => {
    const md = generateMarkdownReport(selectedCampaign);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedCampaign.companyName.toLowerCase().replace(/\s+/g, '-')}-report.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyAllOutreach = () => {
    if (isDisqualified) {
      alert('Outreach not generated: Account is Disqualified.');
      return;
    }

    const allEmails = [
      `=== STYLE A: INDUSTRY SHIFT LED ===\n`,
      ...selectedCampaign.step8StyleAEmails.map(
        (e) => `[Email ${e.emailNumber} - ${e.sequenceTiming}]
Subject: ${e.subject}

Part: Hook (Prove in one line that this was written for them)
${e.parts.hook.content}

Part: Pain (Name the consequence of the trigger, not the trigger itself)
${e.parts.pain.content}

Part: Value (One sentence on what changes. Not a feature list)
${e.parts.value.content}

Part: CTA (One specific, small ask)
${e.parts.cta.content}

Full Assembled Text:
${e.body}
----------------------------------------`
      ),
      `\n=== STYLE B: PERSON EVIDENCE LED ===\n`,
      ...selectedCampaign.step9StyleBEmails.map(
        (e) => `[Email ${e.emailNumber} - ${e.sequenceTiming}]
Subject: ${e.subject}

Part: Hook (Prove in one line that this was written for them)
${e.parts.hook.content}

Part: Pain (Name the consequence of the trigger, not the trigger itself)
${e.parts.pain.content}

Part: Value (One sentence on what changes. Not a feature list)
${e.parts.value.content}

Part: CTA (One specific, small ask)
${e.parts.cta.content}

Full Assembled Text:
${e.body}
----------------------------------------`
      ),
      `\n=== LINKEDIN CADENCE ===\n`,
      `Connection Request: "${selectedCampaign.step10LinkedIn.connectionRequest.text}"\n`,
      ...selectedCampaign.step10LinkedIn.messages.map(
        (m) => `[Message ${m.messageNumber} - ${m.timing}]:
${m.body}`
      )
    ].join('\n\n');

    navigator.clipboard.writeText(allEmails);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Navigation */}
      <Header
        campaigns={campaigns}
        selectedCampaign={selectedCampaign}
        onSelectCampaign={handleSelectCampaign}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onExportMarkdown={handleExportMarkdown}
        onCopyAllOutreach={handleCopyAllOutreach}
        copySuccess={copySuccess}
      />

      {/* 16-Step Pipeline Stage Navigation */}
      <StageNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        verificationRatio={selectedCampaign.step5ResearchGrader.verificationRatioPercent}
        messageVerdict={selectedCampaign.step12MessageVerdict.verdict}
        isDisqualified={isDisqualified}
      />

      {/* Main Workspace View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'step0' && (
          <Step0ICPView step0={selectedCampaign.step0ICP} />
        )}

        {currentTab === 'step1' && (
          <Step1IndustryShiftView step1={selectedCampaign.step1IndustryShift} />
        )}

        {currentTab === 'step2' && (
          <Step2AccountView step2={selectedCampaign.step2Account} />
        )}

        {currentTab === 'step3' && (
          <Step3BuyingRolesView step3={selectedCampaign.step3BuyingRoles} />
        )}

        {currentTab === 'step4' && (
          <Step4ThePersonView step4={selectedCampaign.step4ThePerson} />
        )}

        {currentTab === 'step5' && (
          <Step5ResearchGraderView
            key={selectedCampaign.id}
            initialGrader={selectedCampaign.step5ResearchGrader}
          />
        )}

        {currentTab === 'step6' && (
          <Step6PersonalizationPackView pack={selectedCampaign.step6PersonalizationPack} />
        )}

        {currentTab === 'step7' && (
          <Step7PreOutreachView
            check={selectedCampaign.step7PreOutreachCheck}
            onProceedToEmails={() => setCurrentTab('step8_9')}
          />
        )}

        {currentTab === 'step8_9' && (
          <OutreachEmailsView
            emailsA={selectedCampaign.step8StyleAEmails}
            emailsB={selectedCampaign.step9StyleBEmails}
            isDisqualified={isDisqualified}
            recipientEmail={`${selectedCampaign.targetPerson.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@${selectedCampaign.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com`}
            recipientName={selectedCampaign.targetPerson}
          />
        )}

        {currentTab === 'step10' && (
          <Step10LinkedInView
            linkedIn={selectedCampaign.step10LinkedIn}
            isDisqualified={isDisqualified}
          />
        )}

        {currentTab === 'step11_12' && (
          <Step11MessageGraderView
            grader={selectedCampaign.step11MessageGrader}
            verdict={selectedCampaign.step12MessageVerdict}
          />
        )}

        {currentTab === 'step13_14' && (
          <Step13DiagnosisView
            diagnosis={selectedCampaign.step13Diagnosis}
            fixLoop={selectedCampaign.step14FixLoop}
          />
        )}

        {currentTab === 'step15_16' && (
          <Step16FinalReportView campaign={selectedCampaign} />
        )}
      </main>

      {/* New Research Run Modal */}
      <NewResearchModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onGenerate={handleCreateCampaign}
      />
    </div>
  );
}
export default App;
