// Core Data Types for EvidenceSales AI (16-Step Evidence-First Engine)

export type ResearchGradingCheck = 'a' | 'b' | 'c' | 'd';
export type ResearchFailureType = 'NONE' | 'OUT OF DATE' | 'MADE UP';

export interface ResearchFactRow {
  id: string;
  claimOrFact: string;
  a_namedRealSource: boolean; // Must name specific public source
  b_hasDate: boolean; // Must have an explicit date
  c_within24Months: boolean; // Must be within the last 24 months
  d_salespersonActsDifferently: boolean; // Does it change what the rep says or does?
  failureType: ResearchFailureType;
  bannedReason?: string;
}

export interface Step5ResearchGrader {
  rows: ResearchFactRow[];
  totalFacts: number;
  verifiedCount: number;
  verificationRatioPercent: number;
  doNotUseList: string[]; // Banned claims automatically added to "DO NOT USE"
}

export interface Step0ICP {
  whoFits: string[];
  strictExclusions: string[];
  buyingSignals: {
    signal: string;
    isExternallyObservable: boolean;
    verificationSource: string;
  }[];
  weakestAssumption: {
    assumption: string;
    riskIfWrong: string;
    howToTest: string;
  };
}

export interface Step1IndustryShift {
  macroShift18Months: string;
  sourceCitations: {
    source: string;
    date: string;
    urlOrDocument: string;
  }[];
  budgetConsequence: string;
  whatIsKnown: string[];
  whatRemainsUnknown: string[];
}

export interface Step2AccountDiagnostics {
  operationalModel: string;
  moneyFlow: string;
  procurementDiscovery: string;
  whatChangedInLast12Months: {
    event: string;
    date: string;
    source: string;
    budgetImpact: string;
  }[];
}

export type BuyingRoleType =
  | 'champion'
  | 'holds the budget'
  | 'technical checker'
  | 'daily user'
  | 'blocker';

export interface BuyingRoleItem {
  id: string;
  jobTitle: string;
  roleInDecision: BuyingRoleType;
  whatTheyCareAbout: string;
  whyTheyBlockOrChampion: string;
  isMandatoryBlockerIdentified: boolean;
}

export interface Step3BuyingRoles {
  roles: BuyingRoleItem[];
  whoToApproachFirst: string;
  rationaleForSequence: string;
}

export interface Step4ThePerson {
  personName: string;
  currentTitle: string;
  department: string;
  tenure: string;
  verifiedQuotesOrActions: {
    quoteOrAction: string;
    context: string;
    date: string;
    publicUrlOrSource: string;
  }[];
  openingLinesEvidenceBacked: string[];
  bannedFlatteryAlert: string;
}

export interface Step6PersonalizationPack {
  companyName: string;
  targetPersonName: string;
  targetPersonTitle: string;
  industryShiftSummary: string;
  accountChangeTrigger: string;
  operationalConsequence: string;
  championAngle: string;
  identifiedBlockerMitigation: string;
  evidenceAnchor: string;
  doNotUseBannedClaims: string[];
}

export interface Step7PreOutreachGate {
  hasTargetPersonQuoteOrAction: boolean;
  hasVerifiedAccountTrigger12Months: boolean;
  hasBudgetConsequenceNotFeaturePitch: boolean;
  hasIdentifiedBlocker: boolean;
  canProceedToOutreach: boolean;
  blockReason?: string;
}

export interface EmailFourPartStructure {
  hook: {
    label: 'Hook';
    job: 'Prove in one line that this was written for them.';
    content: string;
    packTraceField: string;
  };
  pain: {
    label: 'Pain';
    job: 'Name the consequence of the trigger, not the trigger itself.';
    content: string;
    packTraceField: string;
  };
  value: {
    label: 'Value';
    job: 'One sentence on what changes. Not a feature list.';
    content: string;
    packTraceField: string;
  };
  cta: {
    label: 'CTA';
    job: 'One specific, small ask.';
    content: string;
    packTraceField: string;
  };
}

export interface OutreachEmail {
  id: string;
  emailNumber: number;
  sequenceTiming: string;
  style: 'STYLE_A_INDUSTRY_LED' | 'STYLE_B_PERSON_LED';
  subject: string;
  greeting?: string;
  heading?: string;
  body: string;
  parts: EmailFourPartStructure;
  thankYou?: string;
  signOff?: string;
  senderSignature?: string;
  wordCount: number;
  subjectWordCount: number;
  bannedPhrasesFound: string[];
  sentenceTrace: {
    sentence: string;
    derivedFromPackField: string;
    isVerifiedInPack: boolean;
  }[];
}

export interface Step10LinkedIn {
  connectionRequest: {
    text: string;
    characterCount: number;
    passesUnder300Chars: boolean;
    passesNameSwapTest: boolean;
    explanation: string;
  };
  messages: {
    id: string;
    messageNumber: number;
    timing: string;
    body: string;
    characterCount: number;
    objective: string;
  }[];
}

export type SentenceLabel = 'FROM PACK' | 'GENERIC' | 'MADE UP' | 'BANNED';

export interface GradedSentence {
  id: string;
  messageOrigin: string;
  source?: string;
  sentence: string;
  label: SentenceLabel;
  classification?: SentenceLabel;
  reason: string;
  traceField?: string;
}

export type PersonalizationPack = Step6PersonalizationPack;
export type Step7PreOutreachCheck = Step7PreOutreachGate;

export interface Step11MessageGrader {
  totalSentences: number;
  fromPackCount: number;
  genericCount: number;
  madeUpCount: number;
  bannedCount: number;
  fromPackRatio: number;
  genericRatio: number;
  gradedSentences: GradedSentence[];
}

export interface Step12MessageVerdict {
  verdict: 'STRONG' | 'DOES NOT GO OUT';
  summaryExplanation: string;
  actionableNotes: string[];
}

export interface Step13Diagnosis {
  weakestOutreachStep: number;
  weakestReason: string;
  conciseExplanation: string;
}

export interface Step14FixLoop {
  identifiedWorstFailure: string;
  responsibleResearchStage: string;
  ruleChanged: string;
  comparison: {
    metric: string;
    before: string;
    after: string;
  }[];
  wasEffective: boolean;
}

export interface Step15Disqualification {
  status: 'QUALIFIED' | 'DISQUALIFIED';
  disqualificationRationale?: string;
  checkedConditions: {
    condition: string;
    passed: boolean;
  }[];
}

export interface Step16FinalRecommendation {
  decision: 'PURSUE' | 'PURSUE WITH CAUTION' | 'DO NOT PURSUE';
  verifiedRationale: string;
}

export interface CampaignData {
  id: string;
  companyName: string;
  website: string;
  industry: string;
  targetPerson: string;
  targetTitle: string;
  step0ICP: Step0ICP;
  step1IndustryShift: Step1IndustryShift;
  step2Account: Step2AccountDiagnostics;
  step3BuyingRoles: Step3BuyingRoles;
  step4ThePerson: Step4ThePerson;
  step5ResearchGrader: Step5ResearchGrader;
  step6PersonalizationPack: Step6PersonalizationPack;
  step7PreOutreachCheck: Step7PreOutreachGate;
  step8StyleAEmails: OutreachEmail[];
  step9StyleBEmails: OutreachEmail[];
  step10LinkedIn: Step10LinkedIn;
  step11MessageGrader: Step11MessageGrader;
  step12MessageVerdict: Step12MessageVerdict;
  step13Diagnosis: Step13Diagnosis;
  step14FixLoop: Step14FixLoop;
  step15Disqualification: Step15Disqualification;
  finalRecommendation: Step16FinalRecommendation;
}

export interface WhatWeSell {
  company: string;
  productOrService: string;
  whatItDoes: string;
  problemsItSolves: string;
  keyCapabilities: string[];
  targetIndustries: string[];
  targetBuyers: string[];
  relevantBusinessOutcomes: string[];
  approvedProductClaims: string[];
  claimsWeMustNotMake: string[];
}

export interface TargetAccount {
  company: string;
  website: string;
  industry: string;
  country: string;
  trigger: string;
  knownPerson: string;
  knownDepartment: string;
}

export interface InputContext {
  whatWeSell: WhatWeSell;
  targetAccount: TargetAccount;
}
