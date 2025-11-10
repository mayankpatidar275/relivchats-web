// src/features/insights/types.ts

export interface EvidenceItem {
  message: string;
  speaker: string;
  timestamp: string;
  context?: string;
}

export interface ParticipantMetric {
  name: string;
  [key: string]: string | number;
}

export interface RecommendationItem {
  recommendation_title: string;
  target_participants: string[];
  suggestion: string;
  why_it_helps: string;
  example?: string;
}

// Communication Basics specific structure
export interface CommunicationBasicsContent {
  initiation_balance: {
    participants: Array<{
      name: string;
      percentage: number;
      initiation_count: number;
    }>;
    balance_assessment: {
      rating: "balanced" | "slightly_imbalanced" | "highly_imbalanced";
      interpretation: string;
    };
  };
  response_patterns: {
    participants: Array<{
      name: string;
      avg_response_seconds: number;
      response_style: string;
    }>;
    compatibility_note: string;
  };
  message_contribution: {
    participants: Array<{
      name: string;
      message_percentage: number;
      word_percentage: number;
      avg_words_per_message: number;
      style: string;
    }>;
    balance_note: string;
  };
  engagement_indicators: {
    participants: Array<{
      name: string;
      questions_asked: number;
      double_texting_rate: number;
    }>;
    engagement_insight: string;
  };
  communication_strengths: Array<{
    strength_title: string;
    description: string;
    evidence: EvidenceItem[];
  }>;
  balance_recommendations: RecommendationItem[];
  overall_health_assessment: {
    score: number;
    rating: "excellent" | "good" | "needs_improvement";
    summary: string;
  };
}

// Add these interfaces to your existing types.ts

export interface VulnerabilityParticipant {
  name: string;
  vulnerability_level: "high" | "moderate" | "low";
  description: string;
  evidence: EvidenceItem[];
}

export interface SupportParticipant {
  name: string;
  support_style: string;
  description: string;
}

export interface SupportEvidence {
  context: string;
  exchange: Array<{
    message: string;
    speaker: string;
    timestamp: string;
  }>;
}

export interface AffectionParticipant {
  name: string;
  frequency: "very_frequent" | "frequent" | "moderate" | "occasional" | "rare";
  styles: string[];
  description: string;
}

export interface AffectionEvidence {
  message: string;
  speaker: string;
  timestamp: string;
  affection_type: string;
}

export interface ConflictEvidence {
  context: string;
  exchange: Array<{
    message: string;
    speaker: string;
    timestamp: string;
  }>;
}

// Update these interfaces to match new schema keys
export interface EmotionalIntimacyContent {
  vuln: {
    participants: Array<{
      name: string;
      vulnerability_level: string;
      description: string;
      evidence: EvidenceItem[];
    }>;
    balance_note: string;
  };
  support: {
    participants: Array<{
      name: string;
      support_style: string;
      description: string;
    }>;
    reciprocity_assessment: string;
    evidence: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  affection: {
    participants: Array<{
      name: string;
      frequency: string;
      styles: string[];
      description: string;
    }>;
    comparison: string;
    evidence: Array<{
      message: string;
      speaker: string;
      timestamp: string;
      affection_type: string;
    }>;
  };
  checkins: {
    frequency: string;
    initiator_balance: string;
    description: string;
    evidence: EvidenceItem[];
  };
  conflict: {
    conflict_present: boolean;
    description: string;
    repair_patterns?: string[];
    evidence?: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  strengths: Array<{
    title: string;
    description: string;
    evidence: EvidenceItem[];
  }>;
  growth: Array<{
    title: string;
    target: string[];
    suggestion: string;
    why: string;
    starter: string;
  }>;
  overall: {
    score: number;
    rating: string;
    summary: string;
  };
}

// love language

export interface LoveLanguageContent {
  primary_languages: {
    participants: Array<{
      name: string;
      language: string;
      confidence: string;
      description: string;
      evidence: EvidenceItem[];
    }>;
  };
  secondary_languages: {
    participants: Array<{
      name: string;
      language: string;
      description: string;
      evidence: EvidenceItem[];
    }>;
  };
  appreciation: {
    participants: Array<{
      name: string;
      expression_style: string;
      frequency: string;
    }>;
    frequency_comparison: string;
    evidence: Array<{
      message: string;
      speaker: string;
      timestamp: string;
      appreciation_type: string;
    }>;
  };
  recognition: {
    analysis: string;
    balance: string;
    evidence: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  compatibility: {
    match_type: string;
    analysis: string;
    adaptation_evidence: string;
  };
  missing_languages: Array<{
    language: string;
    explanation: string;
  }>;
  beautiful_moments: Array<{
    moment_title: string;
    description: string;
    exchange: Array<{
      message: string;
      speaker: string;
      timestamp: string;
    }>;
  }>;
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    why: string;
    example_messages: string[];
  }>;
  overall: {
    score: number;
    summary: string;
  };
}

// conflict_resolution

export interface ConflictResolutionContent {
  conflict_presence: {
    visible_conflicts: boolean;
    frequency: string;
    assessment: string;
  };
  conflict_triggers: Array<{
    trigger_type: string;
    description: string;
    evidence?: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  }>;
  individual_styles: {
    participants: Array<{
      name: string;
      style: string;
      intensity: string;
      description: string;
      evidence?: EvidenceItem[];
    }>;
  };
  stress_communication: {
    pattern_description: string;
    initiator: string;
    changes: string[];
  };
  repair_recovery: {
    strategies: string[];
    initiator: string;
    timeframe: string;
    effectiveness: string;
    evidence?: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  positive_behaviors: Array<{
    behavior: string;
    description: string;
    evidence?: EvidenceItem[];
  }>;
  destructive_patterns: {
    present: boolean;
    assessment: string;
    patterns?: Array<{
      pattern_type: string;
      description: string;
      severity: string;
      evidence?: EvidenceItem[];
    }>;
  };
  stress_support: {
    analysis: string;
    evidence: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    technique: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    maturity_level: string;
    summary: string;
  };
}
