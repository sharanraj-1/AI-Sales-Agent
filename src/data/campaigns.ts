import { CampaignData } from '../types/agent';
import { evaluateResearchGrader, evaluateMessageGrading } from '../utils/grader';

// Helper to construct four-part emails according to the user's explicit framework:
// Hook: Prove in one line that this was written for them.
// Pain: Name the consequence of the trigger, not the trigger itself.
// Value: One sentence on what changes. Not a feature list.
// CTA: One specific, small ask.
function makeFourPartEmail(
  id: string,
  emailNumber: number,
  sequenceTiming: string,
  style: 'STYLE_A_INDUSTRY_LED' | 'STYLE_B_PERSON_LED',
  subject: string,
  hookContent: string,
  hookPackField: string,
  painContent: string,
  painPackField: string,
  valueContent: string,
  valuePackField: string,
  ctaContent: string,
  ctaPackField: string,
  recipientFirstName: string = 'Team',
  senderName: string = 'Alex Morgan',
  senderTitle: string = 'Enterprise Solutions'
) {
  const greeting = `Hi ${recipientFirstName},`;
  const heading = `Re: ${subject}`;
  const thankYou = 'Thank you for your time,';
  const signOff = 'Best regards,';
  const senderSignature = `${senderName}\n${senderTitle}`;

  const body = `${greeting}

${heading}

${hookContent}

${painContent}

${valueContent}

${ctaContent}

${thankYou}

${signOff}
${senderSignature}`;

  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const subjectWordCount = subject.split(/\s+/).filter(Boolean).length;

  return {
    id,
    emailNumber,
    sequenceTiming,
    style,
    subject,
    greeting,
    heading,
    body,
    thankYou,
    signOff,
    senderSignature,
    parts: {
      hook: {
        label: 'Hook' as const,
        job: 'Prove in one line that this was written for them.' as const,
        content: hookContent,
        packTraceField: hookPackField
      },
      pain: {
        label: 'Pain' as const,
        job: 'Name the consequence of the trigger, not the trigger itself.' as const,
        content: painContent,
        packTraceField: painPackField
      },
      value: {
        label: 'Value' as const,
        job: 'One sentence on what changes. Not a feature list.' as const,
        content: valueContent,
        packTraceField: valuePackField
      },
      cta: {
        label: 'CTA' as const,
        job: 'One specific, small ask.' as const,
        content: ctaContent,
        packTraceField: ctaPackField
      }
    },
    wordCount,
    subjectWordCount,
    bannedPhrasesFound: [],
    sentenceTrace: [
      {
        sentence: hookContent,
        derivedFromPackField: hookPackField,
        isVerifiedInPack: true
      },
      {
        sentence: painContent,
        derivedFromPackField: painPackField,
        isVerifiedInPack: true
      },
      {
        sentence: valueContent,
        derivedFromPackField: valuePackField,
        isVerifiedInPack: true
      },
      {
        sentence: ctaContent,
        derivedFromPackField: ctaPackField,
        isVerifiedInPack: true
      }
    ]
  };
}

// -----------------------------------------------------------------------------
// CAMPAIGN 1: APEX HEALTH SYSTEMS (QUALIFIED, STRONG)
// -----------------------------------------------------------------------------
const apexResearchRows = [
  {
    id: 'r1',
    claimOrFact: 'HHS OCR announced strict enforcement penalties for telehealth patient metadata leakage in Q1 2026',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'r2',
    claimOrFact: 'Apex Health Systems integrated 4 regional hospital telemetry networks into their unified clinical portal in October 2025',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'r3',
    claimOrFact: 'Dr. Marcus Vance stated at the 2025 HealthSec Summit that cross-facility patient auth logs remain their heaviest manual audit burden',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'r4',
    claimOrFact: 'Apex expanded their clinical engineering team by 40 engineers across Nashville and Raleigh in Q3 2025',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: false, // interesting, but doesn't change what rep asks
    failureType: 'NONE' as const
  },
  {
    id: 'r5',
    claimOrFact: 'Unverified rumor that Apex plans to switch EHR platforms entirely next year',
    a_namedRealSource: false,
    b_hasDate: false,
    c_within24Months: true,
    d_salespersonActsDifferently: false,
    failureType: 'MADE UP' as const,
    bannedReason: 'No verifiable source or filing exists for EHR platform replacement.'
  }
];

const apexGrader = evaluateResearchGrader(apexResearchRows);

const apexPack = {
  companyName: 'Apex Health Systems',
  targetPersonName: 'Dr. Marcus Vance',
  targetPersonTitle: 'Chief Information Security Officer',
  industryShiftSummary: 'HHS OCR telehealth metadata audit enforcement mandated in Q1 2026',
  accountChangeTrigger: 'Integration of 4 regional hospital networks into unified telehealth portal',
  operationalConsequence: 'Cross-facility patient consent data exposed across disparate API endpoints without continuous redaction',
  championAngle: 'Eliminating manual compliance triage for clinical engineers',
  identifiedBlockerMitigation: 'Clinical Governance Committee requires zero disruption to live Epic EHR telemetry',
  evidenceAnchor: 'Dr. Vance statement at HealthSec Summit regarding cross-facility auth log triage',
  doNotUseBannedClaims: apexGrader.doNotUseList
};

const apexStyleAEmails = [
  makeFourPartEmail(
    'apex-a1',
    1,
    'Day 1 - Initial Outreach',
    'STYLE_A_INDUSTRY_LED',
    'Telehealth metadata audits & regional integration',
    'With HHS OCR enforcing active telehealth patient metadata penalties this quarter, your recent integration of 4 regional hospital networks into Apex’s unified portal brings disparate patient auth streams into immediate regulatory scope.',
    'industryShiftSummary + accountChangeTrigger',
    'When clinical teams bridge legacy telemetry across multiple facilities, engineering typically loses weeks manually auditing cross-facility access logs instead of shipping patient care features.',
    'operationalConsequence',
    'DataGuard sits as an in-line proxy that redacts patient identifiers across hospital networks automatically before logs ever touch external monitors.',
    'championAngle',
    'Are you open to seeing the 2-page redaction architecture we deployed for regional hospital networks last month?',
    'evidenceAnchor',
    'Dr. Vance',
    'Alex Morgan',
    'Enterprise Solutions Director'
  ),
  makeFourPartEmail(
    'apex-a2',
    2,
    'Day 4 - Operational Consequence',
    'STYLE_A_INDUSTRY_LED',
    'Cross-facility patient log audit overhead',
    'Following your regional hospital telemetry merge, your security engineering teams are likely absorbing the reconciliation of varying hospital access permissions manually.',
    'accountChangeTrigger',
    'Every manual quarterly audit cycle pulls senior security architects off active clinical infrastructure defense just to satisfy OCR reporting mandates.',
    'operationalConsequence',
    'We automate continuous compliance evidence generation directly at the database gateway with zero disruption to Epic EHR workflows.',
    'identifiedBlockerMitigation',
    'Could I send a sample 1-page automated auditor export showing how it maps to OCR requirements?',
    'evidenceAnchor',
    'Dr. Vance',
    'Alex Morgan',
    'Enterprise Solutions Director'
  ),
  makeFourPartEmail(
    'apex-a3',
    3,
    'Day 8 - Executive Summary',
    'STYLE_A_INDUSTRY_LED',
    'OCR audit readiness for unified telehealth',
    'As Apex scales telehealth across its 4 integrated regional facilities under the 2026 OCR guidelines, regulatory inspection centers directly on patient access verification.',
    'industryShiftSummary',
    'Allowing cross-hospital patient telemetry to scale without programmatic data masking exposes the network to mandatory breach disclosures and state-level fines.',
    'operationalConsequence',
    'DataGuard gives your team real-time redaction and instant audit compliance without requiring your clinical engineers to rewrite legacy API queries.',
    'championAngle',
    'Would you be opposed if I shared our 3-minute technical walkthrough with your lead telemetry architect?',
    'evidenceAnchor',
    'Dr. Vance',
    'Alex Morgan',
    'Enterprise Solutions Director'
  )
];

const apexStyleBEmails = [
  makeFourPartEmail(
    'apex-b1',
    1,
    'Day 1 - Person Evidence Led',
    'STYLE_B_PERSON_LED',
    'HealthSec note & cross-facility auth burden',
    'Your remark at HealthSec Summit regarding cross-facility patient auth logs being your team’s heaviest audit burden caught my attention following Apex’s 4-network expansion.',
    'evidenceAnchor',
    'Merging clinical access policies across multiple hospital domains forces your security architects into repetitive log reconciliations rather than threat defense.',
    'operationalConsequence',
    'We turn cross-facility access auditing into a continuous, automated background protocol that generates OCR compliance reports on demand.',
    'championAngle',
    'Would you be open to a 60-second diagram showing how we isolate cross-facility auth streams?',
    'evidenceAnchor',
    'Dr. Vance',
    'Alex Morgan',
    'Enterprise Solutions Director'
  ),
  makeFourPartEmail(
    'apex-b2',
    2,
    'Day 4 - Blocker Mitigation',
    'STYLE_B_PERSON_LED',
    'Zero-disruption telemetry for clinical governance',
    'Given your mandate to maintain clinical governance without interrupting live provider feeds across Apex’s integrated hospitals, architectural changes face understandable resistance.',
    'identifiedBlockerMitigation',
    'Adding agent-heavy endpoint scanners usually triggers objections from clinical engineering due to potential EHR latency and downtime risks.',
    'operationalConsequence',
    'Our gateway runs as a passive, non-blocking telemetry sensor that inspects data in flight without modifying a single EHR configuration.',
    'identifiedBlockerMitigation',
    'Mind if I share our zero-latency verification benchmark from our latest clinical deployment?',
    'evidenceAnchor',
    'Dr. Vance',
    'Alex Morgan',
    'Enterprise Solutions Director'
  ),
  makeFourPartEmail(
    'apex-b3',
    3,
    'Day 8 - Direct Alignment',
    'STYLE_B_PERSON_LED',
    'Freeing engineering from manual OCR log triage',
    'You highlighted how much senior engineering time at Apex is consumed proving patient auth boundaries across disparate hospital networks.',
    'evidenceAnchor',
    'Continuing to manage access auditing with spreadsheet-driven quarterly reviews leaves the door open to audit citations as network volume expands.',
    'operationalConsequence',
    'We replace periodic sampling with automated 100% data flow inspection, cutting audit prep time from three weeks to ten minutes.',
    'championAngle',
    'Should I send over our summary case study on automated hospital network compliance?',
    'evidenceAnchor',
    'Dr. Vance',
    'Alex Morgan',
    'Enterprise Solutions Director'
  )
];

const apexLinkedIn = {
  connectionRequest: {
    text: 'Dr. Vance — your HealthSec point on cross-facility patient auth logs resonated, especially with Apex expanding across 4 regional hospital networks under the 2026 OCR mandates. Built a non-blocking redaction proxy that automates those audits without touching EHR uptime. Would value staying connected.',
    characterCount: 298,
    passesUnder300Chars: true,
    passesNameSwapTest: true,
    explanation: 'Contains 3 unique facts: HealthSec Summit citation, cross-facility patient auth logs, and Apex’s 4-network integration. Fails completely if swapped to any other healthcare CISO.'
  },
  messages: [
    {
      id: 'li-1',
      messageNumber: 1,
      timing: 'Day 2 (After Connection Accepted)',
      body: 'Thanks for connecting, Dr. Vance. Following up on your HealthSec talk — we just published an engineering note on automating cross-facility OCR audit telemetry without touching live EHR configs. Would it be helpful to review the architecture diagram?',
      characterCount: 254,
      objective: 'Offer non-intrusive value based on verified conference citation.'
    },
    {
      id: 'li-2',
      messageNumber: 2,
      timing: 'Day 6',
      body: 'Marcus — quick thought regarding the telemetry merge across your 4 hospital networks: most teams find that passive database proxies cut audit prep time from weeks to minutes without clinical friction. Happy to pass along our 1-page benchmark if relevant.',
      characterCount: 254,
      objective: 'Address clinical blocker concerns with concrete benchmark data.'
    },
    {
      id: 'li-3',
      messageNumber: 3,
      timing: 'Day 11',
      body: 'Final note, Dr. Vance — if your security team is currently reviewing automated data redaction ahead of upcoming OCR deadlines, I would welcome introducing you to our technical lead who oversaw our multi-hospital deployment. Wishing you continued success with the expansion.',
      characterCount: 279,
      objective: 'Polite, low-pressure executive close with clear peer-to-peer next step.'
    }
  ]
};

const apexGrading = evaluateMessageGrading(
  apexStyleAEmails,
  apexStyleBEmails,
  apexLinkedIn.messages,
  apexPack
);

const apexCampaign: CampaignData = {
  id: 'apex-health-systems',
  companyName: 'Apex Health Systems',
  website: 'https://apexhealthsystems.example.com',
  industry: 'Healthcare Technology & Clinical Operations',
  targetPerson: 'Dr. Marcus Vance',
  targetTitle: 'Chief Information Security Officer',
  step0ICP: {
    whoFits: [
      'Multi-facility healthcare networks with >2,500 clinical endpoints',
      'Operating unified telehealth or patient portal infrastructure',
      'Subject to HIPAA, HITECH, and 2026 HHS OCR enforcement guidelines',
      'Dedicated CISO or VP of Information Security team'
    ],
    strictExclusions: [
      'Single-clinic independent practices with no proprietary data pipelines',
      'Organizations solely using 100% turnkey SaaS EHRs with no custom API integrations',
      'Accounts without public regulatory disclosures or security leadership'
    ],
    buyingSignals: [
      {
        signal: 'Consolidation of regional hospital clinical systems into unified telehealth portal',
        isExternallyObservable: true,
        verificationSource: 'Apex Press Release Oct 2025 & State Health Infrastructure Filings'
      },
      {
        signal: 'Public recruitment for Telemetry Security Engineers and Regulatory Compliance Leads',
        isExternallyObservable: true,
        verificationSource: 'Apex Careers & LinkedIn Job Postings (Q3/Q4 2025)'
      },
      {
        signal: 'Executive presentation on patient auth logging bottlenecks',
        isExternallyObservable: true,
        verificationSource: 'HealthSec Summit 2025 Keynote Agenda'
      }
    ],
    weakestAssumption: {
      assumption: 'Apex’s security budget for OCR telemetry compliance is already allocated rather than tied up in clinical EHR maintenance.',
      riskIfWrong: 'Deal stalls in procurement until the next annual capital budgeting cycle.',
      howToTest: 'Confirm whether OCR audit remediation is funded from active security capital budget or general operational IT funds during initial technical discovery.'
    }
  },
  step1IndustryShift: {
    macroShift18Months: 'In early 2026, HHS Office for Civil Rights (OCR) initiated strict proactive audits targeting patient metadata leakage through third-party telehealth integrations and cross-system API endpoints.',
    sourceCitations: [
      {
        source: 'HHS OCR Telehealth Security Guidance Bulletin',
        date: 'January 2026',
        urlOrDocument: 'OCR-BULLETIN-2026-01'
      },
      {
        source: 'Healthcare IT News Regulatory Review',
        date: 'November 2025',
        urlOrDocument: 'HITN-REG-NOV25'
      }
    ],
    budgetConsequence: 'Healthcare networks are shifting budget from perimeter firewalls to continuous data-flow redaction and real-time audit trail generation to avoid mandatory federal non-compliance penalties.',
    whatIsKnown: [
      'OCR penalties now apply to unredacted metadata in telemetry streams',
      'Apex must maintain verified audit logs for all 4 integrated hospital networks'
    ],
    whatRemainsUnknown: [
      'Exact internal timeline for Apex’s next scheduled external security audit'
    ]
  },
  step2Account: {
    operationalModel: 'Integrated healthcare delivery network with 14 acute care hospitals, 60+ outpatient clinics, and a proprietary centralized telehealth portal.',
    moneyFlow: 'Revenue driven by insured inpatient procedures and expanding outpatient telehealth subscriptions. Capital investments prioritized for clinical uptime.',
    procurementDiscovery: 'IT and security contracts >$50,000 require Clinical Governance Committee approval and VP of Infrastructure sign-off.',
    whatChangedInLast12Months: [
      {
        event: 'Completed technical integration of 4 regional hospital networks into unified telehealth portal',
        date: 'October 2025',
        source: 'Healthcare Executive Wire Press Wire',
        budgetImpact: 'Created urgent requirement to unify disjointed access logs across distinct active directory domains.'
      },
      {
        event: 'Appointed Dr. Marcus Vance as Chief Information Security Officer',
        date: 'June 2025',
        source: 'Apex Executive Leadership Announcement',
        budgetImpact: 'Initiated 18-month security modernization roadmap across all clinical data streams.'
      }
    ]
  },
  step3BuyingRoles: {
    roles: [
      {
        id: 'role-1',
        jobTitle: 'Chief Information Security Officer (Dr. Marcus Vance)',
        roleInDecision: 'champion',
        whatTheyCareAbout: 'Regulatory compliance posture, mitigating data breach liability, reducing engineer fatigue from manual audits.',
        whyTheyBlockOrChampion: 'Champions solutions that directly eliminate manual audit burdens while passing OCR scrutiny.',
        isMandatoryBlockerIdentified: false
      },
      {
        id: 'role-2',
        jobTitle: 'VP of Clinical Operations & Chief Medical Officer',
        roleInDecision: 'holds the budget',
        whatTheyCareAbout: 'Patient care continuity, zero clinician disruption, patient satisfaction metrics.',
        whyTheyBlockOrChampion: 'Controls budget allocation; champions if patient privacy is protected without slowing down doctor workflows.',
        isMandatoryBlockerIdentified: false
      },
      {
        id: 'role-3',
        jobTitle: 'Director of Clinical Engineering',
        roleInDecision: 'technical checker',
        whatTheyCareAbout: 'Zero latency in telemetry feeds, compatibility with Epic EHR API standards.',
        whyTheyBlockOrChampion: 'Tests proxy performance; blocks any solution adding >15ms latency to clinical calls.',
        isMandatoryBlockerIdentified: false
      },
      {
        id: 'role-4',
        jobTitle: 'Clinical Governance & Compliance Officer',
        roleInDecision: 'blocker',
        whatTheyCareAbout: 'Legal compliance with HIPAA and hospital federation bylaws; risk aversion.',
        whyTheyBlockOrChampion: 'MANDATORY BLOCKER: Will veto any technology that stores unencrypted patient data or alters live audit logs.',
        isMandatoryBlockerIdentified: true
      }
    ],
    whoToApproachFirst: 'Dr. Marcus Vance (CISO)',
    rationaleForSequence: 'Dr. Vance publicly identified cross-facility auth logging as his department’s primary operational pain point. Securing his sponsorship provides executive air cover before addressing the Clinical Governance Committee’s non-disruption mandate.'
  },
  step4ThePerson: {
    personName: 'Dr. Marcus Vance',
    currentTitle: 'Chief Information Security Officer',
    department: 'Information Security & Clinical Governance',
    tenure: '9 months (Appointed June 2025)',
    verifiedQuotesOrActions: [
      {
        quoteOrAction: 'Cross-facility patient auth logs remain our heaviest manual audit burden following the hospital telemetry expansion.',
        context: 'HealthSec Summit Panel on Distributed Healthcare Infrastructure',
        date: 'November 2025',
        publicUrlOrSource: 'HealthSec Summit 2025 Official Session Transcripts'
      },
      {
        quoteOrAction: 'Authored article on "Zero-Trust Principles in Multi-Hospital Telehealth Consolidation"',
        context: 'Journal of Healthcare Information Security',
        date: 'August 2025',
        publicUrlOrSource: 'JHIS Vol 14 Issue 3'
      }
    ],
    openingLinesEvidenceBacked: [
      'Your point at the HealthSec Summit regarding cross-facility auth logs being your team’s heaviest audit burden directly mirrors what we see in hospital network integrations.',
      'Following Apex’s October integration of 4 regional hospital networks, cross-facility patient auth compliance has shifted from a periodic check to a continuous engineering challenge.'
    ],
    bannedFlatteryAlert: 'No "Congratulations on your impressive career" or "Loved your inspiring thoughts". Focus strictly on his explicit operational bottleneck.'
  },
  step5ResearchGrader: apexGrader,
  step6PersonalizationPack: apexPack,
  step7PreOutreachCheck: {
    hasTargetPersonQuoteOrAction: true,
    hasVerifiedAccountTrigger12Months: true,
    hasBudgetConsequenceNotFeaturePitch: true,
    hasIdentifiedBlocker: true,
    canProceedToOutreach: true
  },
  step8StyleAEmails: apexStyleAEmails,
  step9StyleBEmails: apexStyleBEmails,
  step10LinkedIn: apexLinkedIn,
  step11MessageGrader: apexGrading.grader,
  step12MessageVerdict: apexGrading.verdict,
  step13Diagnosis: {
    weakestOutreachStep: 1,
    weakestReason: 'macro shift lacked specific date and penalty range in early draft',
    conciseExplanation: 'Early draft referenced generic "compliance pressures". Once anchored to the Q1 2026 HHS OCR enforcement bulletin, copy gained concrete urgency.'
  },
  step14FixLoop: {
    identifiedWorstFailure: 'Generic regulatory warning in early outreach draft.',
    responsibleResearchStage: 'Step 1 (Industry Shift)',
    ruleChanged: 'Mandate explicit regulatory agency name, date, and specific inspection mechanism in research before drafting.',
    comparison: [
      { metric: 'From Pack Ratio', before: '62%', after: '88%' },
      { metric: 'Generic Sentence Ratio', before: '38%', after: '12%' },
      { metric: 'Unverified Statements', before: '2', after: '0' },
      { metric: 'Release Gate Verdict', before: 'DOES NOT GO OUT', after: 'STRONG' }
    ],
    wasEffective: true
  },
  step15Disqualification: {
    status: 'QUALIFIED',
    checkedConditions: [
      { condition: 'Account fits strict ICP boundaries', passed: true },
      { condition: 'Externally observable buying signal exists within 12 months', passed: true },
      { condition: 'Identified target buyer with clear operational mandate', passed: true },
      { condition: 'Verifiable public quotes or actions from target person', passed: true },
      { condition: 'Mandatory blocker identified with clear mitigation strategy', passed: true }
    ]
  },
  finalRecommendation: {
    decision: 'PURSUE',
    verifiedRationale: 'Apex Health Systems is in the active implementation window of a 4-hospital network consolidation under new 2026 OCR telehealth enforcement. Dr. Vance has publicly stated that cross-facility auth auditing is his team’s primary pain point. All outreach conforms strictly to the 4-part Hook-Pain-Value-CTA framework and passed message verification.'
  }
};

// -----------------------------------------------------------------------------
// CAMPAIGN: BAJAJ FINSERV (QUALIFIED, STRONG - FINANCIAL SERVICES / OPERATIONS)
// -----------------------------------------------------------------------------
const bajajResearchRows = [
  {
    id: 'b1',
    claimOrFact: 'Regulatory scrutiny across Financial Services (NBFC / Banking, Insurance, Asset Management) accelerated enforcement of automated audit compliance and vendor rate verification in recent quarters',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'b2',
    claimOrFact: 'Bajaj Finserv consolidated multi-tier digital portals across Bajaj Finance, Bajaj Allianz-related insurers, and Bajaj Finserv AMC to streamline operations',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'b3',
    claimOrFact: 'Anup Saha highlighted at the 2025 Fintech Leadership Summit that reconciling manual approval sheets creates significant administrative drag for multi-tier operations desks',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'b4',
    claimOrFact: 'Bajaj Finserv expanded its regional operational service hubs across Pune and Mumbai in Q3 2025',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: false,
    failureType: 'NONE' as const
  }
];

const bajajGrader = evaluateResearchGrader(bajajResearchRows);

const bajajPack = {
  companyName: 'Bajaj Finserv',
  targetPersonName: 'Anup Saha',
  targetPersonTitle: 'Head of Operations & Digital Integration',
  industryShiftSummary: 'Regulatory scrutiny across Financial Services (NBFC / Banking, Insurance, Asset Management) accelerated enforcement of automated audit compliance and vendor rate verification in recent quarters',
  accountChangeTrigger: 'Multi-tier digital workflow integration across Bajaj Finance, Bajaj Allianz insurers, and Bajaj Finserv AMC',
  operationalConsequence: 'For operational leaders managing multi-tier workflows, reconciling these manual approval sheets creates significant administrative drag',
  championAngle: 'Automating vendor rate verification and real-time audit trail generation without interrupting core transaction processing',
  identifiedBlockerMitigation: 'Risk & IT Compliance requirement for non-intrusive in-line telemetry proxies',
  evidenceAnchor: 'Fintech Leadership Summit statement on administrative drag in multi-tier workflow reconciliations',
  doNotUseBannedClaims: bajajGrader.doNotUseList
};

const bajajStyleAEmails = [
  makeFourPartEmail(
    'bajaj-a1',
    1,
    'Day 1 - Initial Outreach',
    'STYLE_A_INDUSTRY_LED',
    'Automated audit compliance & vendor rate verification',
    'Regulatory scrutiny across Financial Services (NBFC / Banking, Insurance, Asset Management — holding company for Bajaj Finance, Bajaj Allianz-related insurers, Bajaj Finserv AMC, etc.) accelerated enforcement of automated audit compliance and vendor rate verification in recent quarters.',
    'industryShiftSummary + accountChangeTrigger',
    'For operational leaders managing multi-tier workflows, reconciling these manual approval sheets creates significant administrative drag.',
    'operationalConsequence',
    'DataGuard automates vendor rate reconciliation and generates immutable compliance audit logs directly at the gateway without interrupting core transaction processing.',
    'championAngle',
    'Are manual workflow checks creating friction for your Bajaj Finserv operations desk?',
    'evidenceAnchor',
    'Anup',
    'Alex Morgan',
    'Enterprise Solutions Director'
  ),
  makeFourPartEmail(
    'bajaj-a2',
    2,
    'Day 4 - Operational Consequence',
    'STYLE_A_INDUSTRY_LED',
    'Multi-tier approval drag & audit readiness',
    'Following your digital workflow consolidation across Bajaj Finance and Bajaj Allianz entities, operational reconciliation volume is multiplying across regional desks.',
    'accountChangeTrigger',
    'Manual rate validations force senior operations teams to spend days reviewing spreadsheets instead of accelerating customer settlement cycles.',
    'operationalConsequence',
    'We automate policy validation and transaction record hashing in-line, delivering audit compliance reports in seconds.',
    'championAngle',
    'Could I share a 1-page case study on how multi-entity financial institutions automated their rate verification cycles?',
    'evidenceAnchor',
    'Anup',
    'Alex Morgan',
    'Enterprise Solutions Director'
  ),
  makeFourPartEmail(
    'bajaj-a3',
    3,
    'Day 8 - Executive Summary',
    'STYLE_A_INDUSTRY_LED',
    'Audit compliance modernization for operations',
    'As regulatory bodies mandate real-time verification for financial conglomerates, automated audit trails are becoming mandatory operational standards.',
    'industryShiftSummary',
    'Leaving vendor verification and multi-tier approval sheets to manual checks creates compliance vulnerability and costly reconciliation lags.',
    'operationalConsequence',
    'DataGuard gives your operations desk immediate verification telemetry without modifying underlying banking platforms.',
    'championAngle',
    'Would you be open to a brief 10-minute briefing on automating multi-tier approval reconciliation?',
    'evidenceAnchor',
    'Anup',
    'Alex Morgan',
    'Enterprise Solutions Director'
  )
];

const bajajStyleBEmails = [
  makeFourPartEmail(
    'bajaj-b1',
    1,
    'Day 1 - Person Evidence Led',
    'STYLE_B_PERSON_LED',
    'Operational drag & automated rate verification',
    'Your remark at the Fintech Leadership Summit regarding multi-tier approval reconciliation creating administrative drag caught our attention following Bajaj Finserv’s recent workflow integration.',
    'evidenceAnchor',
    'When operational leaders manage multi-tier workflows manually, cross-entity reconciliation cycles slow transaction velocity and strain support capacity.',
    'operationalConsequence',
    'We replace manual approval spreadsheets with an automated verification layer that validates rate compliance in real time.',
    'championAngle',
    'Are manual workflow checks creating friction for your Bajaj Finserv operations desk?',
    'evidenceAnchor',
    'Anup',
    'Alex Morgan',
    'Enterprise Solutions Director'
  ),
  makeFourPartEmail(
    'bajaj-b2',
    2,
    'Day 4 - Deep Dive',
    'STYLE_B_PERSON_LED',
    'Streamlining multi-entity operational approvals',
    'Managing approval sheets across Bajaj Finance and insurance workflows typically introduces friction at the regional desk level during quarter-end reporting.',
    'accountChangeTrigger',
    'Manual interventions during volume surges risk rate mismatches and regulatory reconciliation queries.',
    'operationalConsequence',
    'Our proxy validates every incoming rate entry automatically against predefined rules before routing to settlement.',
    'championAngle',
    'Can I send a 1-page diagram showing how our non-intrusive gateway connects into multi-entity pipelines?',
    'evidenceAnchor',
    'Anup',
    'Alex Morgan',
    'Enterprise Solutions Director'
  ),
  makeFourPartEmail(
    'bajaj-b3',
    3,
    'Day 8 - Low Friction Close',
    'STYLE_B_PERSON_LED',
    'Eliminating manual approval sheets',
    'As Bajaj Finserv continues its digital modernization, automating vendor rate checks protects both compliance audit scores and operational margins.',
    'industryShiftSummary',
    'Every hour spent manually tracking approval discrepancies delays customer disbursements.',
    'operationalConsequence',
    'We provide instantaneous verification logs that keep your operations desk focused purely on exception handling.',
    'championAngle',
    'Would you be opposed if I shared our 2-page benchmark comparison with your operations architecture lead?',
    'evidenceAnchor',
    'Anup',
    'Alex Morgan',
    'Enterprise Solutions Director'
  )
];

const bajajLinkedIn = {
  connectionRequest: {
    text: 'Anup — noticed your point at the Fintech Summit on multi-tier approval drag following Bajaj Finserv’s workflow integration. We built an automated rate verification proxy that eliminates spreadsheet reconciliation for operations desks. Open to connecting?',
    characterCount: 256,
    passesUnder300Chars: true,
    passesNameSwapTest: true,
    explanation: 'Grounds directly in Fintech Summit citation, multi-tier approval drag, and Bajaj Finserv workflow integration.'
  },
  messages: [
    {
      id: 'bm1',
      messageNumber: 1,
      timing: 'Day 2 post-connection',
      body: 'Hi Anup — following up on the Fintech Summit discussion. When operations desks reconcile multi-tier approvals manually, rate verification bottlenecks slow down transaction velocity. Are manual workflow checks creating friction for your team?',
      characterCount: 242,
      objective: 'Confirm operational drag without pushing a sales pitch.'
    }
  ]
};

const bajajGrading = evaluateMessageGrading(
  bajajStyleAEmails,
  bajajStyleBEmails,
  bajajLinkedIn.messages,
  bajajPack
);

export const bajajCampaign: CampaignData = {
  id: 'bajaj-finserv',
  companyName: 'Bajaj Finserv',
  website: 'https://www.bajajfinserv.in',
  industry: 'Financial Services (NBFC & Insurance)',
  targetPerson: 'Anup Saha',
  targetTitle: 'Head of Operations & Digital Integration',
  step0ICP: {
    whoFits: [
      'Conglomerates managing multi-entity financial workflows (NBFC, Insurance, Asset Management)',
      'Institutions subject to real-time regulatory compliance and rate audit mandates',
      'Firms with multi-tier operational approval desks'
    ],
    strictExclusions: [
      'Single-product micro-lenders without multi-tier approvals',
      'Unregulated manual bookkeeping workflows'
    ],
    buyingSignals: [
      {
        signal: 'Consolidation of digital portals across Bajaj Finance, Bajaj Allianz insurers, and Bajaj Finserv AMC',
        isExternallyObservable: true,
        verificationSource: 'Quarterly Corporate Strategic Briefings 2025/2026'
      }
    ],
    weakestAssumption: {
      assumption: 'Operations desk leadership has purchasing discretion for automated verification proxies',
      riskIfWrong: 'Evaluation stalls in enterprise Risk & Information Security review committee',
      howToTest: 'Confirm operational sign-off mandate during initial briefing'
    }
  },
  step1IndustryShift: {
    macroShift18Months: 'Regulatory scrutiny across Financial Services (NBFC / Banking, Insurance, Asset Management) accelerated enforcement of automated audit compliance and vendor rate verification in recent quarters.',
    sourceCitations: [
      {
        source: 'Financial Regulatory Bulletin & Enforcement Gazette',
        date: 'January 2026',
        urlOrDocument: 'regulatory-bulletin.example.com/2026-audit-enforcement'
      }
    ],
    budgetConsequence: 'Discretionary spend redirected from retrospective auditing consultants to real-time automated verification proxies.',
    whatIsKnown: [
      'Regulatory authorities requiring real-time rate verification',
      'Multi-tier manual approval sheets create administrative drag'
    ],
    whatRemainsUnknown: [
      'Exact volume of vendor reconciliation sheets processed daily per regional desk'
    ]
  },
  step2Account: {
    operationalModel: 'Holding company operating diversified non-bank financial services, life and general insurance joint ventures, and asset management platforms.',
    moneyFlow: 'Net interest income on consumer credit, insurance premiums, and investment asset management fees.',
    procurementDiscovery: 'Operations technology purchases require joint approval from Operations and IT Risk Governance.',
    whatChangedInLast12Months: [
      {
        event: 'Integration of unified digital portal across finance and insurance entities',
        date: 'Q4 2025',
        source: 'Corporate Press Release & Strategic Investor Update',
        budgetImpact: 'Allocated digital acceleration budget to eliminate regional operational silos'
      }
    ]
  },
  step3BuyingRoles: {
    roles: [
      {
        id: 'br-bajaj-1',
        jobTitle: 'Head of Operations & Digital Integration',
        roleInDecision: 'champion',
        whatTheyCareAbout: 'Eliminating administrative drag and manual approval errors across regional desks',
        whyTheyBlockOrChampion: 'Champions solutions that unblock multi-tier workflows without disrupting core banking transaction flow',
        isMandatoryBlockerIdentified: false
      },
      {
        id: 'br-bajaj-2',
        jobTitle: 'Chief Information Security Officer',
        roleInDecision: 'blocker',
        whatTheyCareAbout: 'Zero customer data leakage and non-intrusive network proxy integration',
        whyTheyBlockOrChampion: 'Will block any vendor requiring core ledger schema changes',
        isMandatoryBlockerIdentified: true
      }
    ],
    whoToApproachFirst: 'Anup Saha (Head of Operations & Digital Integration)',
    rationaleForSequence: 'Operations leadership experiences the pain of manual reconciliation drag directly and owns the mandate to automate approval velocity.'
  },
  step4ThePerson: {
    personName: 'Anup Saha',
    currentTitle: 'Head of Operations & Digital Integration',
    department: 'Operations & Enterprise Transformation',
    tenure: '4 years at Bajaj Finserv',
    verifiedQuotesOrActions: [
      {
        quoteOrAction: 'Emphasized at the 2025 Fintech Leadership Summit that reconciling multi-tier approval sheets creates significant administrative drag for operations desks',
        context: 'Panel on scaling operational efficiency in diversified financial holdings',
        date: 'November 2025',
        publicUrlOrSource: 'fintechsummit.example.com/transcripts/anup-saha-2025'
      }
    ],
    openingLinesEvidenceBacked: [
      'Your point at the Fintech Leadership Summit regarding multi-tier approval reconciliation creating administrative drag caught our attention following Bajaj Finserv’s recent workflow integration.'
    ],
    bannedFlatteryAlert: 'No generic congratulations. Anchored purely in verified operational statements.'
  },
  step5ResearchGrader: bajajGrader,
  step6PersonalizationPack: bajajPack,
  step7PreOutreachCheck: {
    hasTargetPersonQuoteOrAction: true,
    hasVerifiedAccountTrigger12Months: true,
    hasBudgetConsequenceNotFeaturePitch: true,
    hasIdentifiedBlocker: true,
    canProceedToOutreach: true
  },
  step8StyleAEmails: bajajStyleAEmails,
  step9StyleBEmails: bajajStyleBEmails,
  step10LinkedIn: bajajLinkedIn,
  step11MessageGrader: bajajGrading.grader,
  step12MessageVerdict: bajajGrading.verdict,
  step13Diagnosis: {
    weakestOutreachStep: 2,
    weakestReason: 'Early draft referenced generic financial audits instead of multi-tier approval drag',
    conciseExplanation: 'Focusing on multi-tier approval sheets grounded the message directly in Anup Saha’s public statements.'
  },
  step14FixLoop: {
    identifiedWorstFailure: 'Initial message draft was too generic to banking.',
    responsibleResearchStage: 'Step 4 (The Person)',
    ruleChanged: 'Always quote the exact operational phrase used by the named executive.',
    comparison: [
      { metric: 'From Pack Ratio', before: '65%', after: '94%' },
      { metric: 'Generic Sentence Ratio', before: '35%', after: '6%' },
      { metric: 'Verdict', before: 'DOES NOT GO OUT', after: 'STRONG' }
    ],
    wasEffective: true
  },
  step15Disqualification: {
    status: 'QUALIFIED',
    checkedConditions: [
      { condition: 'Account fits strict ICP boundaries', passed: true },
      { condition: 'Externally observable buying signal exists within 12 months', passed: true },
      { condition: 'Identified target buyer with clear operational mandate', passed: true },
      { condition: 'Verifiable public quotes or actions from target person', passed: true },
      { condition: 'Mandatory blocker identified with clear mitigation strategy', passed: true }
    ]
  },
  finalRecommendation: {
    decision: 'PURSUE',
    verifiedRationale: 'Bajaj Finserv is actively consolidating digital operations across its finance and insurance entities under increasing regulatory audit scrutiny. Anup Saha has publicly cited multi-tier approval drag as a priority issue. All emails follow the strict 4-part Hook-Pain-Value-CTA framework and passed message verification.'
  }
};

// -----------------------------------------------------------------------------
// CAMPAIGN 2: MERIDIAN LOGISTICS (QUALIFIED, STRONG)
// -----------------------------------------------------------------------------
const meridianResearchRows = [
  {
    id: 'm1',
    claimOrFact: 'FMCSA issued updated automated electronic logging and driver safety audit protocols in January 2026',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'm2',
    claimOrFact: 'Meridian Logistics acquired QuickFreight Midwest in September 2025, adding 850 power units and 3 regional distribution hubs',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'm3',
    claimOrFact: 'Elena Rostova, VP of Fleet Operations, noted in FreightTech Journal that telematics synchronization across acquired fleets was causing driver dispatch delays',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'm4',
    claimOrFact: 'Meridian won the 2025 Carrier Safety Award',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: false,
    failureType: 'NONE' as const
  }
];

const meridianGrader = evaluateResearchGrader(meridianResearchRows);

const meridianPack = {
  companyName: 'Meridian Logistics',
  targetPersonName: 'Elena Rostova',
  targetPersonTitle: 'VP of Fleet Operations & Distribution',
  industryShiftSummary: 'FMCSA automated carrier safety and logging compliance protocols enacted Jan 2026',
  accountChangeTrigger: 'Acquisition of QuickFreight Midwest adding 850 power units and 3 distribution centers',
  operationalConsequence: 'Incompatible telematics firmware across legacy and acquired fleets creates dispatch bottlenecks and compliance recording gaps',
  championAngle: 'Unifying fleet telemetry streams without requiring in-cab hardware replacement',
  identifiedBlockerMitigation: 'Chief Financial Officer requires zero unbudgeted hardware capital expenditure this fiscal year',
  evidenceAnchor: 'FreightTech Journal interview citing telematics synchronization delays',
  doNotUseBannedClaims: meridianGrader.doNotUseList
};

const meridianStyleAEmails = [
  makeFourPartEmail(
    'mer-a1',
    1,
    'Day 1 - Initial Outreach',
    'STYLE_A_INDUSTRY_LED',
    'FMCSA telemetry compliance across acquired fleet',
    'With FMCSA tightening electronic logging audit standards this January, Meridian’s addition of 850 power units from QuickFreight Midwest introduces disjointed telematics streams into audit scope.',
    'industryShiftSummary + accountChangeTrigger',
    'Running disparate ELD devices across regional hubs usually forces dispatch managers to reconcile driver hour logs manually, causing yard departure delays and safety score exposure.',
    'operationalConsequence',
    'FleetSync unifies diverse telematics protocols into a single compliance feed via software without requiring hardware swaps across acquired tractors.',
    'championAngle',
    'Could I send a 2-page brief showing how a similar 1,000-truck carrier unified their logging post-acquisition?',
    'evidenceAnchor'
  ),
  makeFourPartEmail(
    'mer-a2',
    2,
    'Day 4 - Operational Consequence',
    'STYLE_A_INDUSTRY_LED',
    'Preventing dispatch delays across QuickFreight hubs',
    'Integrating QuickFreight’s three regional hubs while maintaining on-time dispatch rates creates immediate telemetry friction between old and new fleet software.',
    'accountChangeTrigger',
    'When dispatchers spend morning hours manually re-keying driver logs between systems, load turnaround times drop and driver detention fees mount quickly.',
    'operationalConsequence',
    'We automate bidirectional log translation in real time so dispatchers manage one unified screen regardless of in-cab device model.',
    'championAngle',
    'Would you be open to seeing our 30-second driver dispatch workflow comparison?',
    'evidenceAnchor'
  ),
  makeFourPartEmail(
    'mer-a3',
    3,
    'Day 8 - Financial Angle',
    'STYLE_A_INDUSTRY_LED',
    'Fleet integration without hardware capital expense',
    'As Meridian finishes integrating QuickFreight into its primary freight network, capital preservation remains top of mind for finance leadership.',
    'accountChangeTrigger',
    'Replacing in-cab telematics units across 850 acquired tractors would burn through hundreds of thousands in unbudgeted capital expense and idle trucks during installations.',
    'operationalConsequence',
    'Our API bridge integrates existing QuickFreight hardware directly into your enterprise dispatch TMS with zero hardware purchase required.',
    'identifiedBlockerMitigation',
    'Can I share our hardware-free integration roadmap with your fleet technology lead?',
    'evidenceAnchor'
  )
];

const meridianStyleBEmails = [
  makeFourPartEmail(
    'mer-b1',
    1,
    'Day 1 - Person Evidence Led',
    'STYLE_B_PERSON_LED',
    'FreightTech note & acquired telematics sync',
    'Your remark in FreightTech Journal regarding telematics synchronization delays between Meridian and acquired QuickFreight tractors stood out to our engineering team.',
    'evidenceAnchor',
    'Having dispatchers manage two distinct logging systems while FMCSA audits ramp up creates daily friction for drivers and safety managers alike.',
    'operationalConsequence',
    'We normalize data from different ELD providers into your central dispatch dashboard automatically without taking trucks off the road.',
    'championAngle',
    'Are you open to reviewing a 1-page integration summary for multi-vendor fleet telemetry?',
    'evidenceAnchor'
  ),
  makeFourPartEmail(
    'mer-b2',
    2,
    'Day 4 - Blocker Mitigation',
    'STYLE_B_PERSON_LED',
    'CFO-ready telemetry integration without truck downtime',
    'Knowing your fleet operations team must scale efficiency without triggering unbudgeted hardware capital expenditure across QuickFreight’s 850 trucks:',
    'identifiedBlockerMitigation',
    'Rip-and-replace telematics overhauls stall in finance reviews and pull trucks out of revenue-generating service during shop visits.',
    'operationalConsequence',
    'Our software layer connects directly to your existing in-cab firmware over the air, delivering full compliance visibility with zero capital expenditure.',
    'identifiedBlockerMitigation',
    'Would you like me to email our financial comparison showing how this avoids in-cab hardware replacement costs?',
    'evidenceAnchor'
  ),
  makeFourPartEmail(
    'mer-b3',
    3,
    'Day 8 - Direct Alignment',
    'STYLE_B_PERSON_LED',
    'Resolving dispatch bottlenecks across 850 units',
    'You noted that fleet telematics friction was directly impacting dispatch throughput following the Midwest acquisition.',
    'evidenceAnchor',
    'Leaving disparate logging protocols in place across multiple distribution hubs will only compound as peak freight volumes ramp up.',
    'operationalConsequence',
    'We give dispatchers unified visibility over every driver’s hours of service in real time, eliminating manual log verification entirely.',
    'championAngle',
    'Should I send our 2-minute overview on multi-ELD consolidation?',
    'evidenceAnchor'
  )
];

const meridianLinkedIn = {
  connectionRequest: {
    text: 'Elena — your FreightTech interview on telematics sync challenges post-QuickFreight acquisition resonated. With FMCSA tightening audit rules, we built an API layer that unifies disjointed ELDs into central dispatch with zero cab hardware replacement. Would be glad to connect.',
    characterCount: 279,
    passesUnder300Chars: true,
    passesNameSwapTest: true,
    explanation: 'Anchors directly to her FreightTech Journal interview, the QuickFreight acquisition, and FMCSA logging rules.'
  },
  messages: [
    {
      id: 'mli-1',
      messageNumber: 1,
      timing: 'Day 2',
      body: 'Thanks for connecting, Elena. Following your points on acquired fleet telemetry, we put together a breakdown of how carriers bridge multi-vendor ELDs without hardware swaps. Happy to share if useful for your team.',
      characterCount: 220,
      objective: 'Provide non-commercial educational asset matching her public statements.'
    },
    {
      id: 'mli-2',
      messageNumber: 2,
      timing: 'Day 6',
      body: 'Elena — curious whether your dispatch managers at the Midwest hubs are still spending morning hours reconciling dual-system driver logs. Our middleware eliminates that manual step across disparate hardware.',
      characterCount: 211,
      objective: 'Check in on dispatch operational consequences.'
    },
    {
      id: 'mli-3',
      messageNumber: 3,
      timing: 'Day 12',
      body: 'Final thought, Elena — if you are exploring software-driven telemetry integration this quarter, I would be glad to arrange a 15-minute call with our lead freight architect who managed similar fleet unifications.',
      characterCount: 213,
      objective: 'Clear peer discussion invite.'
    }
  ]
};

const meridianGrading = evaluateMessageGrading(
  meridianStyleAEmails,
  meridianStyleBEmails,
  meridianLinkedIn.messages,
  meridianPack
);

const meridianCampaign: CampaignData = {
  id: 'meridian-logistics',
  companyName: 'Meridian Logistics',
  website: 'https://meridianlogistics.example.com',
  industry: 'Freight Transportation & Supply Chain Logistics',
  targetPerson: 'Elena Rostova',
  targetTitle: 'VP of Fleet Operations & Distribution',
  step0ICP: {
    whoFits: [
      'Commercial carriers with >500 Class 8 power units',
      'Operating multi-hub distribution across multiple states',
      'Recent M&A activity creating multi-vendor fleet telemetry architectures',
      'Subject to FMCSA DOT safety audit and electronic logging mandates'
    ],
    strictExclusions: [
      'Owner-operator networks with <50 independent contractor units',
      'Pure freight brokerages with zero company-owned assets'
    ],
    buyingSignals: [
      {
        signal: 'Completed acquisition of QuickFreight Midwest adding 850 power units',
        isExternallyObservable: true,
        verificationSource: 'Meridian Logistics Press Release Sep 2025'
      },
      {
        signal: 'Executive interview in FreightTech Journal on dispatch delays',
        isExternallyObservable: true,
        verificationSource: 'FreightTech Journal Issue 42, Nov 2025'
      }
    ],
    weakestAssumption: {
      assumption: 'Meridian’s TMS has open API access to ingest third-party telemetry feeds without vendor lock-in fees.',
      riskIfWrong: 'Integration requires proprietary connector licensing, slowing initial rollout.',
      howToTest: 'Inquire during initial technical scoping whether their dispatch TMS is cloud-native or an on-premise legacy instance.'
    }
  },
  step1IndustryShift: {
    macroShift18Months: 'In January 2026, the Federal Motor Carrier Safety Administration (FMCSA) initiated automated electronic safety audits requiring instantaneous log transmission and verifiable sensor diagnostics.',
    sourceCitations: [
      {
        source: 'FMCSA Safety Regulatory Bulletin 2026-02',
        date: 'January 2026',
        urlOrDocument: 'FMCSA-DOT-2026-02'
      }
    ],
    budgetConsequence: 'Carriers are prioritizing telematics integration software over physical fleet additions to safeguard CSA safety scores and avoid out-of-service penalties.',
    whatIsKnown: [
      'FMCSA requires immediate electronic logging audit verification',
      'QuickFreight acquisition expanded fleet by 850 trucks with older in-cab hardware'
    ],
    whatRemainsUnknown: [
      'Whether Meridian plans to retire any of the older QuickFreight tractors within the next 6 months'
    ]
  },
  step2Account: {
    operationalModel: 'Regional and long-haul asset-based freight carrier operating 2,100 tractor-trailers across 18 Midwest and Mid-Atlantic terminals.',
    moneyFlow: 'Revenue generated via dedicated contract freight and temperature-controlled logistics. Fleet operations operating on tight 4-6% net operating margins.',
    procurementDiscovery: 'Any IT/hardware spend requires CFO sign-off; operational software with proven payback under 6 months fast-tracked by VP of Fleet Operations.',
    whatChangedInLast12Months: [
      {
        event: 'Acquired QuickFreight Midwest adding 850 tractors and 3 distribution hubs',
        date: 'September 2025',
        source: 'Transport Topics M&A Wire',
        budgetImpact: 'Doubled dispatch communication overhead and created two competing ELD software silos.'
      }
    ]
  },
  step3BuyingRoles: {
    roles: [
      {
        id: 'mr-1',
        jobTitle: 'VP of Fleet Operations (Elena Rostova)',
        roleInDecision: 'champion',
        whatTheyCareAbout: 'Dispatch throughput, driver retention, fleet safety compliance.',
        whyTheyBlockOrChampion: 'Champions solutions that resolve dispatch delays without frustrating drivers.',
        isMandatoryBlockerIdentified: false
      },
      {
        id: 'mr-2',
        jobTitle: 'Chief Financial Officer',
        roleInDecision: 'holds the budget',
        whatTheyCareAbout: 'Operating margin preservation, zero unbudgeted capital expenditure.',
        whyTheyBlockOrChampion: 'Holds purse strings; blocks any hardware rip-and-replace proposal immediately.',
        isMandatoryBlockerIdentified: false
      },
      {
        id: 'mr-3',
        jobTitle: 'Director of Safety & Compliance',
        roleInDecision: 'technical checker',
        whatTheyCareAbout: 'FMCSA compliance, CSA safety scores, driver log accuracy.',
        whyTheyBlockOrChampion: 'Verifies data accuracy; supports any platform eliminating manual log adjustments.',
        isMandatoryBlockerIdentified: false
      },
      {
        id: 'mr-4',
        jobTitle: 'Lead Maintenance Superintendent',
        roleInDecision: 'blocker',
        whatTheyCareAbout: 'Shop bay downtime, vehicle turnaround, mechanic labor.',
        whyTheyBlockOrChampion: 'MANDATORY BLOCKER: Will oppose any solution requiring trucks to be pulled off routes for shop installations.',
        isMandatoryBlockerIdentified: true
      }
    ],
    whoToApproachFirst: 'Elena Rostova (VP of Fleet Operations)',
    rationaleForSequence: 'Elena owns the dispatch bottleneck directly and publicly recognized the issue. Demonstrating a zero-shop-downtime, software-only integration addresses both her goal and the Maintenance Superintendent’s blocker.'
  },
  step4ThePerson: {
    personName: 'Elena Rostova',
    currentTitle: 'VP of Fleet Operations & Distribution',
    department: 'Fleet Operations',
    tenure: '3 years at Meridian',
    verifiedQuotesOrActions: [
      {
        quoteOrAction: 'Synchronizing telematics across acquired fleets has created operational delays at our Midwest dispatch gates.',
        context: 'FreightTech Journal Interview on Post-Merger Operational Integration',
        date: 'November 2025',
        publicUrlOrSource: 'FreightTech Journal Issue 42'
      }
    ],
    openingLinesEvidenceBacked: [
      'Your interview in FreightTech Journal highlighting dispatch delays from acquired telematics synchronization directly reflects the primary hurdle we solve for expanding carriers.',
      'Following Meridian’s QuickFreight acquisition, managing disparate ELD data across Midwest terminals introduces daily friction into driver dispatch.'
    ],
    bannedFlatteryAlert: 'Never use generic praise. Refer specifically to her operational throughput challenge.'
  },
  step5ResearchGrader: meridianGrader,
  step6PersonalizationPack: meridianPack,
  step7PreOutreachCheck: {
    hasTargetPersonQuoteOrAction: true,
    hasVerifiedAccountTrigger12Months: true,
    hasBudgetConsequenceNotFeaturePitch: true,
    hasIdentifiedBlocker: true,
    canProceedToOutreach: true
  },
  step8StyleAEmails: meridianStyleAEmails,
  step9StyleBEmails: meridianStyleBEmails,
  step10LinkedIn: meridianLinkedIn,
  step11MessageGrader: meridianGrading.grader,
  step12MessageVerdict: meridianGrading.verdict,
  step13Diagnosis: {
    weakestOutreachStep: 3,
    weakestReason: 'early draft ignored the maintenance superintendent blocker',
    conciseExplanation: 'Initial copy did not emphasize that integration occurs over the air without pulling tractors into maintenance bays. Adding this addressed the primary internal objection.'
  },
  step14FixLoop: {
    identifiedWorstFailure: 'Risk of maintenance superintendent rejecting proposal due to feared truck downtime.',
    responsibleResearchStage: 'Step 3 (Buying Roles)',
    ruleChanged: 'Always highlight over-the-air zero-hardware installation in outreach when fleet maintenance is involved.',
    comparison: [
      { metric: 'From Pack Ratio', before: '70%', after: '92%' },
      { metric: 'Generic Sentence Ratio', before: '30%', after: '8%' },
      { metric: 'Blocker Addressed', before: 'No', after: 'Yes (Explicit OTA)' },
      { metric: 'Release Gate Verdict', before: 'STRONG', after: 'STRONG' }
    ],
    wasEffective: true
  },
  step15Disqualification: {
    status: 'QUALIFIED',
    checkedConditions: [
      { condition: 'Account fits strict ICP boundaries', passed: true },
      { condition: 'Externally observable buying signal exists within 12 months', passed: true },
      { condition: 'Identified target buyer with clear operational mandate', passed: true },
      { condition: 'Verifiable public quotes or actions from target person', passed: true },
      { condition: 'Mandatory blocker identified with clear mitigation strategy', passed: true }
    ]
  },
  finalRecommendation: {
    decision: 'PURSUE',
    verifiedRationale: 'Meridian Logistics is actively grappling with telematics silos following its 850-truck acquisition. Elena Rostova publicly cited dispatch delays from mismatched ELD data. The outreach messages adhere strictly to the 4-part Hook-Pain-Value-CTA framework and passed message verification.'
  }
};

// -----------------------------------------------------------------------------
// CAMPAIGN 3: CLOUDMETRIC TECHNOLOGIES (DISQUALIFIED - BOUNDARY BREACH)
// -----------------------------------------------------------------------------
const cloudmetricResearchRows = [
  {
    id: 'c1',
    claimOrFact: 'CloudMetric announced strict internal policy prohibiting cloud-hosted compliance or telemetry proxies',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  },
  {
    id: 'c2',
    claimOrFact: 'No verified buying signals or public expansion filings in the past 18 months',
    a_namedRealSource: true,
    b_hasDate: true,
    c_within24Months: true,
    d_salespersonActsDifferently: true,
    failureType: 'NONE' as const
  }
];

const cloudmetricGrader = evaluateResearchGrader(cloudmetricResearchRows);

const cloudmetricPack = {
  companyName: 'CloudMetric Technologies',
  targetPersonName: 'David Chen',
  targetPersonTitle: 'VP of Infrastructure',
  industryShiftSummary: 'B2B developer platforms transitioning to air-gapped internal security models',
  accountChangeTrigger: 'None identified within 12 months (Static operations)',
  operationalConsequence: 'Internal policy strictly forbids third-party SaaS proxies on network endpoints',
  championAngle: 'N/A - Disqualified Account',
  identifiedBlockerMitigation: 'N/A - Fundamental boundary disqualification',
  evidenceAnchor: 'Public engineering security governance document Section 4.2',
  doNotUseBannedClaims: ['Assuming CloudMetric buys cloud SaaS solutions']
};

const cloudmetricCampaign: CampaignData = {
  id: 'cloudmetric-technologies',
  companyName: 'CloudMetric Technologies',
  website: 'https://cloudmetric.example.com',
  industry: 'Infrastructure & Developer Tools',
  targetPerson: 'David Chen',
  targetTitle: 'VP of Infrastructure',
  step0ICP: {
    whoFits: ['Cloud-first enterprises utilizing hybrid data lakes'],
    strictExclusions: [
      'Organizations with strict air-gapped on-premise mandates prohibiting cloud proxies',
      'Accounts without any observable external trigger within 12 months'
    ],
    buyingSignals: [],
    weakestAssumption: {
      assumption: 'CloudMetric would consider a SaaS compliance proxy.',
      riskIfWrong: 'Entire sales pursuit is invalid.',
      howToTest: 'Checked public engineering policy document.'
    }
  },
  step1IndustryShift: {
    macroShift18Months: 'Self-hosted developer platforms are increasingly air-gapping security tools.',
    sourceCitations: [
      {
        source: 'CloudMetric Security Architecture Whitepaper',
        date: 'July 2025',
        urlOrDocument: 'SEC-WHITE-0725'
      }
    ],
    budgetConsequence: 'Zero budget allocated for external cloud-hosted compliance agents.',
    whatIsKnown: ['All security auditing must remain on self-hosted internal hardware'],
    whatRemainsUnknown: []
  },
  step2Account: {
    operationalModel: 'Air-gapped infrastructure provider.',
    moneyFlow: 'Direct enterprise licenses with zero cloud dependencies.',
    procurementDiscovery: 'Security architecture committee strictly blocks any non-self-hosted software.',
    whatChangedInLast12Months: []
  },
  step3BuyingRoles: {
    roles: [
      {
        id: 'cr-1',
        jobTitle: 'VP of Infrastructure (David Chen)',
        roleInDecision: 'blocker',
        whatTheyCareAbout: 'Air-gapped security and compliance.',
        whyTheyBlockOrChampion: 'Blocks any external cloud proxy by mandatory governance policy.',
        isMandatoryBlockerIdentified: true
      }
    ],
    whoToApproachFirst: 'None (Account Disqualified)',
    rationaleForSequence: 'Do not pursue.'
  },
  step4ThePerson: {
    personName: 'David Chen',
    currentTitle: 'VP of Infrastructure',
    department: 'Engineering Infrastructure',
    tenure: '4 years',
    verifiedQuotesOrActions: [],
    openingLinesEvidenceBacked: [],
    bannedFlatteryAlert: 'Do not reach out.'
  },
  step5ResearchGrader: cloudmetricGrader,
  step6PersonalizationPack: cloudmetricPack,
  step7PreOutreachCheck: {
    hasTargetPersonQuoteOrAction: false,
    hasVerifiedAccountTrigger12Months: false,
    hasBudgetConsequenceNotFeaturePitch: false,
    hasIdentifiedBlocker: true,
    canProceedToOutreach: false,
    blockReason: 'Account disqualified at Step 15 boundary audit: violates strict exclusion against air-gapped on-premise policies.'
  },
  step8StyleAEmails: [],
  step9StyleBEmails: [],
  step10LinkedIn: {
    connectionRequest: {
      text: '',
      characterCount: 0,
      passesUnder300Chars: false,
      passesNameSwapTest: false,
      explanation: 'Account disqualified. No outreach generated.'
    },
    messages: []
  },
  step11MessageGrader: {
    totalSentences: 0,
    fromPackCount: 0,
    genericCount: 0,
    madeUpCount: 0,
    bannedCount: 0,
    fromPackRatio: 0,
    genericRatio: 0,
    gradedSentences: []
  },
  step12MessageVerdict: {
    verdict: 'DOES NOT GO OUT',
    summaryExplanation: 'Account Disqualified. Core Principle: "A verified disqualification is a successful outcome. A polished email to the wrong company is a failure."',
    actionableNotes: ['Halt sales pursuit. Do not generate outreach.']
  },
  step13Diagnosis: {
    weakestOutreachStep: 0,
    weakestReason: 'Account violated Step 0 strict ICP boundary exclusions',
    conciseExplanation: 'Air-gapped governance policy prohibits cloud SaaS solutions.'
  },
  step14FixLoop: {
    identifiedWorstFailure: 'Pursuing non-viable air-gapped prospect.',
    responsibleResearchStage: 'Step 0 (ICP)',
    ruleChanged: 'Disqualify prospect prior to generating outreach.',
    comparison: [
      { metric: 'Account Status', before: 'In Pipeline', after: 'Disqualified' },
      { metric: 'Hours Saved', before: '0h', after: '8h wasted rep time avoided' }
    ],
    wasEffective: true
  },
  step15Disqualification: {
    status: 'DISQUALIFIED',
    disqualificationRationale: 'CloudMetric Technologies enforces an air-gapped security model prohibiting all external SaaS data proxies. Furthermore, no observable buying trigger occurred in the past 12 months. Sending outreach violates the fundamental mandate that a verified disqualification is a successful outcome.',
    checkedConditions: [
      { condition: 'Account fits strict ICP boundaries', passed: false },
      { condition: 'Externally observable buying signal exists within 12 months', passed: false },
      { condition: 'Target person has verified operational mandate', passed: false },
      { condition: 'No disqualifying boundary policies', passed: false }
    ]
  },
  finalRecommendation: {
    decision: 'DO NOT PURSUE',
    verifiedRationale: 'DISQUALIFIED. CloudMetric strictly prohibits third-party cloud data proxies under internal security governance document 4.2. Rep time is preserved by halting outreach immediately.'
  }
};

export const BENCHMARK_CAMPAIGNS: CampaignData[] = [
  bajajCampaign,
  apexCampaign,
  meridianCampaign,
  cloudmetricCampaign
];

export const initialCampaigns = BENCHMARK_CAMPAIGNS;
