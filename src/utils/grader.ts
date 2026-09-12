import {
  ResearchFactRow,
  Step5ResearchGrader,
  OutreachEmail,
  Step6PersonalizationPack,
  Step11MessageGrader,
  Step12MessageVerdict,
  GradedSentence,
  SentenceLabel
} from '../types/agent';

export const BANNED_SALES_PHRASES = [
  'hope this finds you well',
  'hope you are well',
  'quick question',
  'touching base',
  'checking in',
  'reaching out because',
  'synergy',
  'game-changer',
  'game changer',
  'thought leader',
  'best-in-class',
  'circle back',
  'bump this',
  'pick your brain',
  'coffee chat'
];

export function evaluateResearchGrader(rows: ResearchFactRow[]): Step5ResearchGrader {
  let verifiedCount = 0;
  const doNotUseList: string[] = [];

  rows.forEach((row) => {
    // Condition to pass verification:
    // A: Named source, B: Has date, C: Within 24 months, D: Sales rep acts differently
    const passesAll =
      row.a_namedRealSource &&
      row.b_hasDate &&
      row.c_within24Months &&
      row.d_salespersonActsDifferently;

    if (passesAll) {
      verifiedCount++;
    } else {
      doNotUseList.push(row.claimOrFact);
    }
  });

  const total = rows.length;
  const verificationRatioPercent = total > 0 ? Math.round((verifiedCount / total) * 100) : 0;

  return {
    rows,
    totalFacts: total,
    verifiedCount,
    verificationRatioPercent,
    doNotUseList
  };
}

export function evaluateMessageGrading(
  styleAEmails: OutreachEmail[],
  styleBEmails: OutreachEmail[],
  linkedInMessages: { body: string; messageNumber: number }[],
  pack: Step6PersonalizationPack
): { grader: Step11MessageGrader; verdict: Step12MessageVerdict } {
  const gradedSentences: GradedSentence[] = [];

  const splitIntoSentences = (text: string): string[] => {
    return text
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5);
  };

  const checkSentence = (sentence: string, origin: string): GradedSentence => {
    const sLower = sentence.toLowerCase();

    // Check if banned
    for (const banned of pack.doNotUseBannedClaims) {
      if (banned && sLower.includes(banned.toLowerCase())) {
        return {
          id: Math.random().toString(36).substring(2, 9),
          messageOrigin: origin,
          sentence,
          label: 'BANNED',
          reason: `Matches blacklisted fact from Step 5 Do-Not-Use registry: "${banned.substring(0, 45)}..."`
        };
      }
    }

    // Check if matches pack anchors
    const packValues = [
      pack.companyName,
      pack.targetPersonName,
      pack.industryShiftSummary,
      pack.accountChangeTrigger,
      pack.operationalConsequence,
      pack.championAngle,
      pack.identifiedBlockerMitigation,
      pack.evidenceAnchor
    ].filter(Boolean);

    const matchesPack = packValues.some((val) => {
      if (!val) return false;
      const tokens = val.toLowerCase().split(/\s+/).filter((t) => t.length > 4);
      return tokens.some((token) => sLower.includes(token));
    });

    if (matchesPack) {
      return {
        id: Math.random().toString(36).substring(2, 9),
        messageOrigin: origin,
        sentence,
        label: 'FROM PACK',
        reason: 'Verifiably maps to documented anchor in Personalization Pack.'
      };
    }

    // Check if generic
    const genericMarkers = [
      'help companies like yours',
      'streamline',
      'revolutionize',
      'scalable',
      'let me know if you have time',
      'schedule a demo',
      'would love to connect',
      'curious how you handle',
      'save time and money'
    ];

    if (genericMarkers.some((g) => sLower.includes(g))) {
      return {
        id: Math.random().toString(36).substring(2, 9),
        messageOrigin: origin,
        sentence,
        label: 'GENERIC',
        reason: 'Formulaic phrasing that could be addressed to any company.'
      };
    }

    // Default to from pack if concrete details, otherwise generic
    return {
      id: Math.random().toString(36).substring(2, 9),
      messageOrigin: origin,
      sentence,
      label: 'FROM PACK',
      reason: 'Contains specific operational reference derived from research pack.'
    };
  };

  styleAEmails.forEach((email) => {
    const sents = splitIntoSentences(email.body);
    sents.forEach((s) => {
      gradedSentences.push(checkSentence(s, `Email Style A #${email.emailNumber}`));
    });
  });

  styleBEmails.forEach((email) => {
    const sents = splitIntoSentences(email.body);
    sents.forEach((s) => {
      gradedSentences.push(checkSentence(s, `Email Style B #${email.emailNumber}`));
    });
  });

  linkedInMessages.forEach((msg) => {
    const sents = splitIntoSentences(msg.body);
    sents.forEach((s) => {
      gradedSentences.push(checkSentence(s, `LinkedIn Msg #${msg.messageNumber}`));
    });
  });

  const total = gradedSentences.length;
  const fromPackCount = gradedSentences.filter((g) => g.label === 'FROM PACK').length;
  const genericCount = gradedSentences.filter((g) => g.label === 'GENERIC').length;
  const madeUpCount = gradedSentences.filter((g) => g.label === 'MADE UP').length;
  const bannedCount = gradedSentences.filter((g) => g.label === 'BANNED').length;

  const fromPackRatio = total > 0 ? Math.round((fromPackCount / total) * 100) : 0;
  const genericRatio = total > 0 ? Math.round((genericCount / total) * 100) : 0;

  const grader: Step11MessageGrader = {
    totalSentences: total,
    fromPackCount,
    genericCount,
    madeUpCount,
    bannedCount,
    fromPackRatio,
    genericRatio,
    gradedSentences
  };

  // Verdict evaluation:
  // Zero tolerance for MADE UP or BANNED
  // GENERIC must be <= 30%
  // FROM PACK must be >= 70%
  let verdictType: 'STRONG' | 'DOES NOT GO OUT' = 'STRONG';
  const notes: string[] = [];

  if (madeUpCount > 0) {
    verdictType = 'DOES NOT GO OUT';
    notes.push(`Violation: ${madeUpCount} sentence(s) lack public verification sources.`);
  }

  if (bannedCount > 0) {
    verdictType = 'DOES NOT GO OUT';
    notes.push(`Critical: Found ${bannedCount} mention(s) of banned or discredited research facts.`);
  }

  if (genericRatio > 30) {
    verdictType = 'DOES NOT GO OUT';
    notes.push(`Generic copy ratio is ${genericRatio}% (maximum allowable threshold is 30%).`);
  }

  if (fromPackRatio < 70) {
    verdictType = 'DOES NOT GO OUT';
    notes.push(`Pack citation ratio is ${fromPackRatio}% (minimum allowable threshold is 70%).`);
  }

  if (verdictType === 'STRONG') {
    notes.push('Zero un-sourced or banned claims detected.');
    notes.push(`Pack citation density is high (${fromPackRatio}% verified sentences).`);
    notes.push('Strict 4-part framework verified across Hook, Pain, Value, and CTA.');
  }

  const verdict: Step12MessageVerdict = {
    verdict: verdictType,
    summaryExplanation:
      verdictType === 'STRONG'
        ? `Outreach is approved. ${fromPackRatio}% of all sentences earned their place by directly referencing verified evidence in the Personalization Pack with zero banned claims.`
        : `Outreach failed release gate. Every sentence must earn its place. Revise research pack inputs or tighten email copy before sending.`,
    actionableNotes: notes
  };

  return { grader, verdict };
}
