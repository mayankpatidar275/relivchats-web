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
  context: string;
  exchange: Array<{
    message: string;
    speaker: string;
    timestamp: string;
  }>;
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
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
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
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
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

// conflict_resolution - Finalized Schema with Nested Evidence

export interface ConflictEvidence {
  context: string;
  exchange: Array<{
    speaker: string;
    message: string;
    timestamp: string;
  }>;
}

export interface ConflictResolutionContent {
  conflict_presence: {
    visible_conflicts: boolean;
    frequency: string;
    assessment: string;
  };
  conflict_triggers: Array<{
    trigger_type: string;
    description: string;
    evidence: ConflictEvidence[];
  }>;
  individual_styles: {
    participants: Array<{
      name: string;
      style: string;
      intensity: string;
      description: string;
      evidence: ConflictEvidence[];
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
    evidence: ConflictEvidence[];
  };
  positive_behaviors: Array<{
    behavior: string;
    description: string;
    evidence: ConflictEvidence[];
  }>;
  destructive_patterns: {
    present: boolean;
    assessment: string;
    patterns?: Array<{
      pattern_type: string;
      description: string;
      severity: string;
      evidence: ConflictEvidence[];
    }>;
  };
  stress_support: {
    analysis: string;
    evidence: ConflictEvidence[];
  };
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    summary: string;
  };
}

// Future Planning Types
export interface FuturePlanningContent {
  frequency: {
    level: string;
    assessment: string;
  };
  categories: Array<{
    category: string;
    discussed: boolean;
    summary: string;
    evidence?: EvidenceItem[];
  }>;
  alignment: {
    overall_level: string;
    analysis: string;
    category_alignment: Array<{
      category: string;
      alignment_status: string;
    }>;
  };
  planning_styles: {
    participants: Array<{
      name: string;
      style: string;
      description: string;
      evidence?: EvidenceItem[];
    }>;
    compatibility: string;
    initiator: string;
  };
  timelines: {
    concrete_vs_vague: string;
    alignment: string;
    evidence: EvidenceItem[];
  };
  enthusiasm: {
    participants: Array<{
      name: string;
      level: string;
      description: string;
    }>;
    evidence: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  shared_dreams: Array<{
    dream_title: string;
    description: string;
    exchange: Array<{
      message: string;
      speaker: string;
      timestamp: string;
    }>;
  }>;
  missing_conversations: Array<{
    topic: string;
    why_important: string;
  }>;
  recommendations: Array<{
    title: string;
    suggestion: string;
    conversation_starters: string[];
  }>;
  overall: {
    score: number;
    vision_status: string;
    summary: string;
  };
}

// ─── FRIENDSHIP INSIGHT TYPES ──────────────────────────────────────────────

export interface FriendshipTrustLoyaltyContent {
  reliability_patterns: {
    participants: Array<{
      name: string;
      reliability_rating: string;
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
    assessment: string;
  };
  showing_up: {
    analysis: string;
    initiator: string;
    evidence: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  promise_keeping: {
    assessment: string;
    patterns_observed: string[];
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  confidentiality: {
    assessment: string;
    sensitive_content_present: boolean;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  consistency: {
    rating: string;
    initiator_balance: string;
    description: string;
  };
  loyalty_signals: {
    present: boolean;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  trust_gaps: {
    present: boolean;
    assessment: string;
    gaps?: Array<{
      gap_type: string;
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    trust_status: string;
    summary: string;
  };
}

export interface FriendshipSupportDynamicsContent {
  support_presence: {
    level: string;
    assessment: string;
  };
  support_styles: {
    participants: Array<{
      name: string;
      style: string;
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  reciprocity: {
    balance_rating: string;
    analysis: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  emotional_availability: {
    analysis: string;
    evidence: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  checking_in: {
    present: boolean;
    initiator: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  hard_times_moments: Array<{
    situation: string;
    response_quality: string;
    exchange: Array<{ speaker: string; message: string; timestamp: string }>;
  }>;
  friendship_strengths: Array<{
    strength: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  }>;
  growth_areas: Array<{
    area: string;
    description: string;
  }>;
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    bond_status: string;
    summary: string;
  };
}

export interface FriendshipVitalityContent {
  energy_level: {
    rating: string;
    assessment: string;
  };
  humor_banter: {
    participants: Array<{
      name: string;
      humor_style: string;
      description: string;
      evidence?: Array<{ message: string; speaker: string; timestamp: string }>;
    }>;
    initiator: string;
  };
  inside_references: Array<{
    reference: string;
    context: string;
    evidence?: Array<{ message: string; speaker: string; timestamp: string }>;
  }>;
  shared_activities: {
    discussed: boolean;
    activity_types: string[];
    follow_through_assessment: string;
    evidence?: Array<{ message: string; speaker: string; timestamp: string; context?: string }>;
  };
  initiation_balance: {
    rating: string;
    description: string;
    primary_initiator: string;
  };
  conversation_depth: {
    rating: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  enthusiasm: {
    participants: Array<{ name: string; level: string; description: string }>;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  best_moments: Array<{
    moment_title: string;
    why_special: string;
    exchange: Array<{ speaker: string; message: string; timestamp: string }>;
  }>;
  vitality_gaps: Array<{ gap: string; suggestion: string }>;
  recommendations: Array<{ title: string; suggestion: string; examples: string[] }>;
  overall: {
    score: number;
    friendship_status: string;
    summary: string;
  };
}

// ─── FAMILY INSIGHT TYPES ────────────────────────────────────────────────────

export interface FamilyDynamicsContent {
  visible_roles: {
    participants: Array<{
      name: string;
      roles: string[];
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  decision_making: {
    primary_decision_maker: string;
    style: string;
    analysis: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  communication_hierarchy: {
    rating: string;
    analysis: string;
  };
  expectation_patterns: {
    present: boolean;
    description: string;
    expectations?: Array<{
      expectation_type: string;
      directed_at: string;
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  autonomy_space: {
    rating: string;
    analysis: string;
  };
  family_strengths: Array<{
    strength: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  }>;
  patterns_to_reflect: Array<{
    pattern: string;
    description: string;
    reflection_prompt: string;
  }>;
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    dynamics_status: string;
    summary: string;
  };
}

export interface FamilyEmotionalClimateContent {
  overall_warmth: {
    rating: string;
    assessment: string;
  };
  affection_expression: {
    participants: Array<{
      name: string;
      expression_style: string;
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  emotional_openness: {
    participants: Array<{
      name: string;
      openness_style: string;
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  vulnerability_moments: {
    present: boolean;
    response_quality: string;
    description: string;
    moments?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  warmth_appreciation: {
    present: boolean;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  emotional_avoidance: {
    present: boolean;
    description: string;
    avoided_areas?: string[];
  };
  positive_emotional_moments: Array<{
    moment_title: string;
    why_meaningful: string;
    exchange: Array<{ speaker: string; message: string; timestamp: string }>;
  }>;
  growth_opportunities: Array<{ opportunity: string; description: string }>;
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    climate_status: string;
    summary: string;
  };
}

export interface FamilyConflictPatternsContent {
  conflict_presence: {
    level: string;
    expression_style: string;
    assessment: string;
  };
  family_specific_patterns: Array<{
    pattern_name: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  }>;
  individual_styles: {
    participants: Array<{
      name: string;
      style: string;
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  tension_topics: Array<{
    topic: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  }>;
  conflict_resolution: {
    approach: string;
    effectiveness: string;
    description: string;
  };
  positive_conflict_behaviors: Array<{
    behavior: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  }>;
  patterns_to_address: Array<{
    pattern: string;
    description: string;
    reflection_prompt: string;
  }>;
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    conflict_health: string;
    summary: string;
  };
}

// ─── WORKPLACE INSIGHT TYPES ─────────────────────────────────────────────────

export interface WorkplaceCommunicationContent {
  overall_quality: {
    rating: string;
    assessment: string;
  };
  clarity_directness: {
    participants: Array<{
      name: string;
      clarity_rating: string;
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  tone_professionalism: {
    overall_tone: string;
    assessment: string;
    participants: Array<{
      name: string;
      tone_description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  responsiveness: {
    rating: string;
    analysis: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  information_flow: {
    style: string;
    proactive_participant: string;
    analysis: string;
  };
  conciseness: {
    assessment: string;
    description: string;
  };
  communication_strengths: Array<{
    strength: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  }>;
  communication_gaps: Array<{
    gap: string;
    description: string;
    impact: string;
  }>;
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    effectiveness_status: string;
    summary: string;
  };
}

export interface WorkplaceCollaborationContent {
  task_ownership: {
    participants: Array<{
      name: string;
      ownership_style: string;
      description: string;
      evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
    }>;
  };
  follow_through: {
    rating: string;
    analysis: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  decision_making: {
    style: string;
    primary_decision_maker: string;
    analysis: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  blocker_communication: {
    rating: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  workload_balance: {
    rating: string;
    analysis: string;
    primary_driver: string;
  };
  coordination_quality: {
    assessment: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  collaboration_strengths: Array<{
    strength: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  }>;
  accountability_gaps: Array<{
    gap: string;
    description: string;
    suggestion: string;
  }>;
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    collaboration_status: string;
    summary: string;
  };
}

export interface WorkplaceRelationshipHealthContent {
  overall_quality: {
    rating: string;
    assessment: string;
  };
  mutual_respect: {
    rating: string;
    analysis: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  psychological_safety: {
    rating: string;
    analysis: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  power_dynamics: {
    assessment: string;
    description: string;
  };
  positive_reinforcement: {
    level: string;
    primary_giver: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  stress_signals: {
    present: boolean;
    description: string;
    signals?: string[];
  };
  interpersonal_rapport: {
    rating: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  };
  relationship_strengths: Array<{
    strength: string;
    description: string;
    evidence?: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }>;
  }>;
  areas_to_strengthen: Array<{ area: string; description: string }>;
  recommendations: Array<{
    title: string;
    target: string[];
    suggestion: string;
    example_phrases: string[];
  }>;
  overall: {
    score: number;
    health_status: string;
    summary: string;
  };
}

// Playfulness & Romance Types
export interface PlayfulnessRomanceContent {
  overall_playfulness: {
    level: string;
    assessment: string;
  };
  humor_styles: {
    participants: Array<{
      name: string;
      humor_types: string[];
      description: string;
      evidence?: EvidenceItem[];
    }>;
    initiator: string;
  };
  inside_jokes: Array<{
    joke_or_reference: string;
    context: string;
    evidence: EvidenceItem[];
  }>;
  flirtation: {
    participants: Array<{
      name: string;
      frequency: string;
      style: string;
    }>;
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
  teasing_banter: {
    present: boolean;
    assessment: string;
    balance: string;
    evidence?: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  spontaneity: {
    present: boolean;
    initiator: string;
    description: string;
    evidence?: EvidenceItem[];
  };
  emoji_usage: {
    description: string;
    match_level: string;
  };
  fun_activities: {
    discussed: boolean;
    types: string[];
    evidence?: EvidenceItem[];
  };
  mood_lifting: {
    present: boolean;
    description: string;
    evidence?: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  romance_maintenance: {
    rating: string;
    description: string;
    evidence?: EvidenceItem[];
  };
  playfulness_gaps: Array<{
    gap: string;
    suggestion: string;
  }>;
  best_moments: Array<{
    moment_title: string;
    why_special: string;
    exchange: Array<{
      message: string;
      speaker: string;
      timestamp: string;
    }>;
  }>;
  recommendations: Array<{
    title: string;
    suggestion: string;
    examples: string[];
  }>;
  overall: {
    score: number;
    spark_status: string;
    summary: string;
  };
}
