import { CampaignData } from '../types/agent';

export function generateMarkdownReport(c: CampaignData): string {
  const parts = [
    `# Executive Sales Intelligence Briefing: ${c.companyName}`,
    `**Target Contact:** ${c.targetPerson} (${c.targetTitle})`,
    `**Industry Sector:** ${c.industry}`,
    `**Website:** ${c.website}`,
    `**Pipeline Qualification Status:** ${c.step15Disqualification.status}`,
    `**Final Outreach Recommendation:** ${c.finalRecommendation.decision}`,
    ``,
    `---`,
    ``,
    `## Executive Verdict & Rationale`,
    c.finalRecommendation.verifiedRationale,
    ``,
    `---`,
    ``,
    `## Step 0: ICP & Observable Signals`,
    `### Who Fits:`,
    ...c.step0ICP.whoFits.map((w) => `- ${w}`),
    `### Strict Exclusions:`,
    ...c.step0ICP.strictExclusions.map((e) => `- ${e}`),
    `### Externally Observable Buying Signals:`,
    ...c.step0ICP.buyingSignals.map(
      (s) => `- **${s.signal}** (${s.isExternallyObservable ? 'Observable' : 'Unobservable'}) — Source: ${s.verificationSource}`
    ),
    `### Weakest Assumption:`,
    `- **Assumption:** ${c.step0ICP.weakestAssumption.assumption}`,
    `- **Risk If Wrong:** ${c.step0ICP.weakestAssumption.riskIfWrong}`,
    `- **Verification Protocol:** ${c.step0ICP.weakestAssumption.howToTest}`,
    ``,
    `---`,
    ``,
    `## Step 1: Industry Shift (18-Month Window)`,
    c.step1IndustryShift.macroShift18Months,
    `### Public Sources:`,
    ...c.step1IndustryShift.sourceCitations.map(
      (s) => `- ${s.source} (${s.date}) — ${s.urlOrDocument}`
    ),
    `### Budget Consequence:`,
    c.step1IndustryShift.budgetConsequence,
    ``,
    `---`,
    ``,
    `## Step 2: Account Diagnostics`,
    `- **Operational Model:** ${c.step2Account.operationalModel}`,
    `- **Money Flow:** ${c.step2Account.moneyFlow}`,
    `- **Procurement Discovery:** ${c.step2Account.procurementDiscovery}`,
    `### 12-Month Observable Events:`,
    ...c.step2Account.whatChangedInLast12Months.map(
      (ev) => `- **${ev.event}** (${ev.date}) | Impact: ${ev.budgetImpact}`
    ),
    ``,
    `---`,
    ``,
    `## Step 3: Buying Roles Matrix`,
    `*Approach First: ${c.step3BuyingRoles.whoToApproachFirst}*`,
    `*Sequence Rationale: ${c.step3BuyingRoles.rationaleForSequence}*`,
    ...c.step3BuyingRoles.roles.map(
      (r) => `- **${r.jobTitle}** [Role: ${r.roleInDecision.toUpperCase()}]
  - Cares About: ${r.whatTheyCareAbout}
  - Decision Logic: ${r.whyTheyBlockOrChampion}`
    ),
    ``,
    `---`,
    ``,
    `## Step 4: Target Person Evidence`,
    `- **Name:** ${c.step4ThePerson.personName}`,
    `- **Title:** ${c.step4ThePerson.currentTitle} (${c.step4ThePerson.department})`,
    `- **Tenure:** ${c.step4ThePerson.tenure}`,
    `### Public Quotes / Actions:`,
    ...c.step4ThePerson.verifiedQuotesOrActions.map(
      (q) => `- "${q.quoteOrAction}" (${q.date} via ${q.publicUrlOrSource})`
    ),
    ``,
    `---`,
    ``,
    `## Step 5: Research Grader & Evidence Audit`,
    `- **Total Facts Audited:** ${c.step5ResearchGrader.totalFacts}`,
    `- **Verified Ratio:** ${c.step5ResearchGrader.verificationRatioPercent}% (${c.step5ResearchGrader.verifiedCount}/${c.step5ResearchGrader.totalFacts})`,
    `### Banned Claims (Do Not Use):`,
    c.step5ResearchGrader.doNotUseList.length > 0
      ? c.step5ResearchGrader.doNotUseList.map((d) => `- ${d}`).join('\n')
      : `*(None — All research items verified)*`,
    ``,
    `---`,
    ``,
    `## Step 6: Personalization Pack (Immutable Source)`,
    `- **Industry Shift:** ${c.step6PersonalizationPack.industryShiftSummary}`,
    `- **Account Trigger:** ${c.step6PersonalizationPack.accountChangeTrigger}`,
    `- **Operational Consequence:** ${c.step6PersonalizationPack.operationalConsequence}`,
    `- **Champion Angle:** ${c.step6PersonalizationPack.championAngle}`,
    `- **Blocker Mitigation:** ${c.step6PersonalizationPack.identifiedBlockerMitigation}`,
    `- **Evidence Anchor:** ${c.step6PersonalizationPack.evidenceAnchor}`,
    ``,
    `---`,
    ``,
    `## Outreach Campaign: 4-Part Email Architecture`,
    `*Email Format Standard:*`,
    `1. Hook: Prove in one line that this was written for them.`,
    `2. Pain: Name the consequence of the trigger, not the trigger itself.`,
    `3. Value: One sentence on what changes. Not a feature list.`,
    `4. CTA: One specific, small ask.`,
    ``,
    `### Style A: Industry Shift Led`,
    ...c.step8StyleAEmails.map(
      (e) => `#### Email ${e.emailNumber}: ${e.sequenceTiming}
**Subject:** ${e.subject} (${e.subjectWordCount} words)
**Word Count:** ${e.wordCount} words

**[Hook]** (Job: Prove in one line that this was written for them.)
> ${e.parts.hook.content}

**[Pain]** (Job: Name the consequence of the trigger, not the trigger itself.)
> ${e.parts.pain.content}

**[Value]** (Job: One sentence on what changes. Not a feature list.)
> ${e.parts.value.content}

**[CTA]** (Job: One specific, small ask.)
> ${e.parts.cta.content}

**Full Assembled Body:**
\`\`\`
${e.body}
\`\`\`
`
    ),
    `### Style B: Person Evidence Led`,
    ...c.step9StyleBEmails.map(
      (e) => `#### Email ${e.emailNumber}: ${e.sequenceTiming}
**Subject:** ${e.subject} (${e.subjectWordCount} words)
**Word Count:** ${e.wordCount} words

**[Hook]** (Job: Prove in one line that this was written for them.)
> ${e.parts.hook.content}

**[Pain]** (Job: Name the consequence of the trigger, not the trigger itself.)
> ${e.parts.pain.content}

**[Value]** (Job: One sentence on what changes. Not a feature list.)
> ${e.parts.value.content}

**[CTA]** (Job: One specific, small ask.)
> ${e.parts.cta.content}

**Full Assembled Body:**
\`\`\`
${e.body}
\`\`\`
`
    ),
    `---`,
    ``,
    `## Step 10: LinkedIn Cadence`,
    `### Connection Request (${c.step10LinkedIn.connectionRequest.characterCount} chars):`,
    `"${c.step10LinkedIn.connectionRequest.text}"`,
    `*Name Swap Test Passed: ${c.step10LinkedIn.connectionRequest.passesNameSwapTest ? 'YES' : 'NO'}*`,
    ``,
    ...c.step10LinkedIn.messages.map(
      (m) => `### Message ${m.messageNumber} (${m.timing}):
${m.body}
*(Objective: ${m.objective})*
`
    ),
    `---`,
    ``,
    `## Step 11 & 12: Message Grader & Strict Release Verdict`,
    `- **Verdict:** ${c.step12MessageVerdict.verdict}`,
    `- **From Pack Ratio:** ${c.step11MessageGrader.fromPackRatio}%`,
    `- **Generic Ratio:** ${c.step11MessageGrader.genericRatio}%`,
    `- **Explanation:** ${c.step12MessageVerdict.summaryExplanation}`,
    ``,
    `---`,
    ``,
    `## Step 13 & 14: Root-Cause Diagnosis & Fix Loop`,
    `- **Weakest Link:** Step ${c.step13Diagnosis.weakestOutreachStep} was ${c.step13Diagnosis.weakestReason}`,
    `- **Diagnosis:** ${c.step13Diagnosis.conciseExplanation}`,
    `- **Rule Changed:** ${c.step14FixLoop.ruleChanged}`,
    ``
  ];

  return parts.join('\n');
}
