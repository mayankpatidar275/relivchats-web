import {
  CommunicationBasicsContent,
  EmotionalIntimacyContent,
  ConflictResolutionContent,
  LoveLanguageContent,
  FuturePlanningContent,
  PlayfulnessRomanceContent,
} from "@/src/features/insights/types";

export const dummyCommunicationBasics: CommunicationBasicsContent = {
  initiation_balance: {
    participants: [
      { name: "Alex", percentage: 48, initiation_count: 124 },
      { name: "Jordan", percentage: 52, initiation_count: 135 },
    ],
    balance_assessment: {
      rating: "balanced",
      interpretation:
        "Both Alex and Jordan take turns starting conversations almost equally. This shows a healthy mutual interest where neither person feels like they're always reaching out first.",
    },
  },
  response_patterns: {
    participants: [
      {
        name: "Alex",
        avg_response_seconds: 1847,
        response_style: "responds within hours",
      },
      {
        name: "Jordan",
        avg_response_seconds: 432,
        response_style: "instant responder",
      },
    ],
    compatibility_note:
      "Jordan tends to reply quickly while Alex takes their time. Both styles work well together - Jordan's quick responses show enthusiasm, and Alex's thoughtful replies add depth to conversations.",
  },
  message_contribution: {
    participants: [
      {
        name: "Alex",
        message_percentage: 45,
        word_percentage: 52,
        avg_words_per_message: 18.3,
        style: "balanced",
      },
      {
        name: "Jordan",
        message_percentage: 55,
        word_percentage: 48,
        avg_words_per_message: 13.8,
        style: "concise",
      },
    ],
    balance_note:
      "Message contributions are well-balanced. Jordan sends more messages but Alex's messages are slightly longer, creating an even flow of conversation.",
  },
  engagement_indicators: {
    participants: [
      { name: "Alex", questions_asked: 87, double_texting_rate: 12.4 },
      { name: "Jordan", questions_asked: 102, double_texting_rate: 18.7 },
    ],
    engagement_insight:
      "Both partners show strong curiosity through questions. Jordan's higher double-texting rate reflects genuine excitement and comfort in the relationship rather than anxiety.",
  },
  communication_strengths: [
    {
      strength_title: "Daily Check-ins",
      description:
        "Both partners consistently check in on each other's day, showing genuine interest in the small details that matter.",
      evidence: [
        {
          message: "How was your meeting with the client today?",
          speaker: "Jordan",
          timestamp: "[12/01/24, 06:23:15 PM]",
          context: "Evening check-in after work",
        },
        {
          message:
            "It went better than expected! They loved the presentation. How was your day?",
          speaker: "Alex",
          timestamp: "[12/01/24, 06:45:32 PM]",
          context: "Sharing positive news",
        },
      ],
    },
    {
      strength_title: "Supportive Responses",
      description:
        "When one person shares something important, the other validates their feelings and offers encouragement.",
      evidence: [
        {
          message: "I'm feeling a bit overwhelmed with the project deadline",
          speaker: "Alex",
          timestamp: "[15/01/24, 09:12:08 AM]",
          context: "Sharing work stress",
        },
        {
          message:
            "That makes total sense. You've been working so hard. Want to talk about it over coffee tonight?",
          speaker: "Jordan",
          timestamp: "[15/01/24, 09:14:42 AM]",
          context: "Offering support",
        },
      ],
    },
  ],
  balance_recommendations: [
    {
      recommendation_title: "Ask More Follow-up Questions",
      target_participants: ["Alex"],
      suggestion:
        "When Jordan shares something, try asking one more follow-up question to show deeper interest in their experiences.",
      why_it_helps:
        "Follow-up questions signal that you're truly listening and care about the details, strengthening emotional connection.",
      example: "When they mention a tough day, ask 'What part was hardest for you?'",
    },
    {
      recommendation_title: "Share More Details Spontaneously",
      target_participants: ["Jordan"],
      suggestion:
        "Try sharing little updates about your day without waiting to be asked - it helps Alex feel more connected to your daily life.",
      why_it_helps:
        "Spontaneous sharing creates intimacy and helps your partner feel included in your world.",
      example:
        "Send a quick message like 'Just saw the funniest thing at work' even before they ask about your day",
    },
  ],
  overall_health_assessment: {
    score: 8,
    rating: "excellent",
    summary:
      "Your communication patterns show a healthy, balanced relationship. Both of you initiate conversations, respond thoughtfully, and show genuine interest in each other's lives. The slight differences in response times and message styles actually complement each other well.",
  },
};

export const dummyEmotionalIntimacy: EmotionalIntimacyContent = {
  vuln: {
    participants: [
      {
        name: "Alex",
        vulnerability_level: "high",
        description:
          "Alex frequently shares deep feelings, worries about work and family, and isn't afraid to express when feeling insecure or overwhelmed.",
        evidence: [
          {
            message:
              "I've been feeling really anxious about my parents' health lately",
            speaker: "Alex",
            timestamp: "[18/01/24, 10:32:15 PM]",
          },
          {
            message:
              "Sometimes I worry I'm not good enough at what I do, you know?",
            speaker: "Alex",
            timestamp: "[22/01/24, 11:45:08 PM]",
          },
        ],
      },
      {
        name: "Jordan",
        vulnerability_level: "moderate",
        description:
          "Jordan shares feelings occasionally but tends to process emotions internally first. Opens up more when directly asked or during deeper conversations.",
        evidence: [
          {
            message: "Today was tough. I felt like I let the team down",
            speaker: "Jordan",
            timestamp: "[20/01/24, 07:18:42 PM]",
          },
          {
            message: "I've been thinking a lot about what my future looks like",
            speaker: "Jordan",
            timestamp: "[25/01/24, 09:22:33 PM]",
          },
        ],
      },
    ],
    balance_note:
      "Alex tends to share vulnerabilities more frequently, while Jordan is more selective. This difference is normal - what matters is that both feel safe opening up when they need to.",
  },
  support: {
    participants: [
      {
        name: "Alex",
        support_style: "empathetic and validating",
        description:
          "Alex responds to Jordan's concerns with emotional validation and reassurance, focusing on understanding feelings first.",
      },
      {
        name: "Jordan",
        support_style: "problem-solving and practical",
        description:
          "Jordan shows support through offering solutions and taking concrete actions to help, while also validating Alex's feelings.",
      },
    ],
    reciprocity_assessment:
      "Support flows both ways in this relationship. Alex provides emotional comfort while Jordan offers practical help - both forms of support are valuable and complement each other beautifully.",
    evidence: [
      {
        context: "Alex shares work anxiety, Jordan offers both validation and help",
        exchange: [
          {
            message: "I'm so stressed about this presentation tomorrow",
            speaker: "Alex",
            timestamp: "[16/01/24, 10:12:33 PM]",
          },
          {
            message:
              "That's completely understandable. You've prepared so well though. Want me to listen while you practice?",
            speaker: "Jordan",
            timestamp: "[16/01/24, 10:14:18 PM]",
          },
          {
            message: "That would really help actually. Thank you ❤️",
            speaker: "Alex",
            timestamp: "[16/01/24, 10:15:02 PM]",
          },
        ],
      },
    ],
  },
  affection: {
    participants: [
      {
        name: "Alex",
        frequency: "very_frequent",
        styles: ["compliments", "miss you messages", "terms of endearment"],
        description:
          "Alex expresses affection multiple times daily through sweet messages, using pet names, and frequently saying 'I love you' or 'miss you'.",
      },
      {
        name: "Jordan",
        frequency: "frequent",
        styles: ["appreciation", "supportive messages", "emojis"],
        description:
          "Jordan shows love through thanking Alex for things, supporting their goals, and using heart emojis regularly.",
      },
    ],
    comparison:
      "Alex expresses affection more frequently and verbally, while Jordan's affection comes through actions and appreciation. Both styles create a warm, loving dynamic.",
    evidence: [
      {
        context: "Morning affection exchange",
        exchange: [
          {
            message: "Good morning love ❤️ Hope you slept well",
            speaker: "Alex",
            timestamp: "[14/01/24, 07:32:12 AM]",
          },
          {
            message: "Morning! Slept great. You're the best 🥰",
            speaker: "Jordan",
            timestamp: "[14/01/24, 07:45:28 AM]",
          },
        ],
      },
    ],
  },
  checkins: {
    frequency: "very_frequent",
    initiator_balance: "Both equally - Alex slightly more (55%)",
    description:
      "Emotional check-ins happen daily. Both partners regularly ask 'how are you really feeling?' and 'everything okay?' beyond just surface greetings.",
    evidence: [
      {
        message: "You've been quiet today. Everything alright?",
        speaker: "Jordan",
        timestamp: "[19/01/24, 08:15:42 PM]",
        context: "Noticing mood change",
      },
    ],
  },
  conflict: {
    conflict_present: false,
    description:
      "No significant conflicts visible in conversations. This suggests healthy communication or that disagreements are handled constructively offline.",
    repair_patterns: [],
    evidence: [],
  },
  strengths: [
    {
      title: "Celebrating Each Other's Wins",
      description:
        "You consistently celebrate each other's achievements, no matter how small. This creates a culture of mutual encouragement.",
      evidence: [
        {
          message: "I finally finished the project!",
          speaker: "Alex",
          timestamp: "[21/01/24, 06:42:15 PM]",
        },
        {
          message:
            "That's amazing!! I'm so proud of you! Let's celebrate this weekend 🎉",
          speaker: "Jordan",
          timestamp: "[21/01/24, 06:43:28 PM]",
        },
      ],
    },
  ],
  growth: [
    {
      title: "Deepen Vulnerability Sharing",
      target: ["Jordan"],
      suggestion:
        "Try sharing your worries or insecurities a bit more often, even small ones. It helps Alex feel trusted with your inner world.",
      why: "Mutual vulnerability creates deeper emotional bonds and helps partners feel equally invested in the relationship.",
      starter:
        "Next time something bothers you, try saying: 'Can I share something that's been on my mind?'",
    },
  ],
  overall: {
    score: 9,
    rating: "deeply_connected",
    summary:
      "Your emotional intimacy is beautiful. You support each other consistently, express affection regularly, and create a safe space for vulnerability. The balance of different support styles actually strengthens your connection.",
  },
};

export const dummyConflictResolution: ConflictResolutionContent = {
  conflict_presence: {
    visible_conflicts: true,
    frequency: "occasional",
    assessment:
      "Minor disagreements appear occasionally (every few weeks), which is completely normal and healthy. These conflicts are resolved quickly and respectfully.",
  },
  conflict_triggers: [
    {
      trigger_type: "Time and Attention",
      description:
        "Tension sometimes arises when one person feels the other isn't making enough time for them during busy periods.",
      evidence: [
        {
          context: "Weekend plans discussion",
          exchange: [
            {
              speaker: "Alex",
              message: "You've been working late every night this week",
              timestamp: "[10/01/24, 08:15:22 PM]",
            },
            {
              speaker: "Jordan",
              message: "I know, this project is just really demanding right now",
              timestamp: "[10/01/24, 08:18:45 PM]",
            },
          ],
        },
      ],
    },
  ],
  individual_styles: {
    participants: [
      {
        name: "Alex",
        style: "collaborative",
        intensity: "moderate",
        description:
          "Alex addresses issues directly but calmly, seeking to understand Jordan's perspective and find middle ground.",
        evidence: [
          {
            context: "Discussing hurt feelings",
            exchange: [
              {
                speaker: "Alex",
                message: "Can we talk about something that's been bothering me?",
                timestamp: "[10/01/24, 08:20:12 PM]",
              },
              {
                speaker: "Jordan",
                message: "Of course, what's up?",
                timestamp: "[10/01/24, 08:20:45 PM]",
              },
            ],
          },
        ],
      },
      {
        name: "Jordan",
        style: "accommodating then collaborative",
        intensity: "low",
        description:
          "Jordan initially tries to smooth things over but engages constructively when Alex pursues the conversation.",
        evidence: [
          {
            context: "Responding to concern",
            exchange: [
              {
                speaker: "Jordan",
                message:
                  "You're right, I should have communicated better about my schedule",
                timestamp: "[10/01/24, 08:25:33 PM]",
              },
            ],
          },
        ],
      },
    ],
  },
  stress_communication: {
    pattern_description:
      "When stressed, Jordan becomes quieter and takes longer to respond. Alex tends to check in more frequently when stressed.",
    initiator: "Alex",
    changes: [
      "Response times increase for Jordan during stressful periods",
      "Alex sends more frequent check-in messages when worried",
    ],
  },
  repair_recovery: {
    strategies: ["direct apology", "explanation", "reassurance", "humor"],
    initiator: "Both equally",
    timeframe: "Within hours",
    effectiveness: "Very effective - conflicts rarely linger",
    evidence: [
      {
        context: "Reconciliation after time discussion",
        exchange: [
          {
            speaker: "Jordan",
            message: "I'm sorry I've been so caught up with work. I miss you too",
            timestamp: "[10/01/24, 08:32:18 PM]",
          },
          {
            speaker: "Alex",
            message:
              "Thank you for hearing me. I know this project is important to you",
            timestamp: "[10/01/24, 08:33:42 PM]",
          },
          {
            speaker: "Jordan",
            message:
              "How about we block off Saturday afternoon, just us? No work",
            timestamp: "[10/01/24, 08:34:55 PM]",
          },
        ],
      },
    ],
  },
  positive_behaviors: [
    {
      behavior: "Using 'I feel' statements",
      description:
        "Both partners express concerns using 'I feel' rather than 'you always', which prevents defensiveness.",
      evidence: [
        {
          context: "Expressing needs",
          exchange: [
            {
              speaker: "Alex",
              message:
                "I feel like we haven't had much quality time together lately",
              timestamp: "[10/01/24, 08:21:15 PM]",
            },
          ],
        },
      ],
    },
    {
      behavior: "Acknowledging the other's perspective",
      description:
        "Both validate each other's feelings even when they don't fully agree, showing emotional maturity.",
      evidence: [
        {
          context: "Understanding each other",
          exchange: [
            {
              speaker: "Jordan",
              message: "I can see why you'd feel that way. That makes sense",
              timestamp: "[10/01/24, 08:26:48 PM]",
            },
          ],
        },
      ],
    },
  ],
  destructive_patterns: {
    present: false,
    assessment:
      "No destructive conflict patterns detected. Disagreements are handled with respect, empathy, and genuine effort to resolve.",
  },
  stress_support: {
    analysis:
      "When one person is stressed externally, the other consistently offers support rather than adding pressure. Both create space for the other's challenges.",
    evidence: [
      {
        context: "Supporting during work stress",
        exchange: [
          {
            speaker: "Alex",
            message: "Today was brutal. I need to vent for a minute",
            timestamp: "[15/01/24, 07:42:33 PM]",
          },
          {
            speaker: "Jordan",
            message: "I'm here. Tell me everything",
            timestamp: "[15/01/24, 07:43:12 PM]",
          },
        ],
      },
    ],
  },
  recommendations: [
    {
      title: "Schedule Regular Quality Time Check-ins",
      target: ["Alex", "Jordan"],
      suggestion:
        "Have a brief weekly conversation about whether you're both feeling connected. This prevents small issues from building up.",
      example_phrases: [
        "How are you feeling about us this week?",
        "Do you feel like we've had enough quality time together?",
        "Is there anything I could do differently to make you feel more loved?",
      ],
    },
    {
      title: "Communicate Stress Levels Proactively",
      target: ["Jordan"],
      suggestion:
        "When you know you'll be busy, give Alex a heads-up about your bandwidth. It helps manage expectations and prevents feeling neglected.",
      example_phrases: [
        "This week is going to be intense at work, so I might be less available",
        "I'm in a stressful period - it's not about us, just so you know",
        "I'll be back to normal by Friday, bear with me?",
      ],
    },
  ],
  overall: {
    score: 8,
    summary:
      "Your conflict resolution is healthy and mature. You address issues directly but kindly, repair quickly, and show genuine care for each other's feelings. The occasional disagreements you have are normal and actually show you're both comfortable being honest about your needs.",
  },
};

export const dummyLoveLanguage: LoveLanguageContent = {
  primary_languages: {
    participants: [
      {
        name: "Alex",
        language: "Words of Affirmation",
        confidence: "high",
        description:
          "Alex frequently expresses love through compliments, encouragement, and verbal appreciation. They use 'I love you', 'you're amazing', and similar phrases regularly.",
        evidence: [
          {
            message: "You're honestly the best thing that's happened to me",
            speaker: "Alex",
            timestamp: "[12/01/24, 10:42:15 PM]",
          },
          {
            message: "I'm so proud of how hard you've been working",
            speaker: "Alex",
            timestamp: "[18/01/24, 06:23:42 PM]",
          },
        ],
      },
      {
        name: "Jordan",
        language: "Acts of Service",
        confidence: "high",
        description:
          "Jordan shows love by doing helpful things without being asked - offering to help with tasks, picking up groceries, or handling errands.",
        evidence: [
          {
            message: "I grabbed your favorite coffee on my way home",
            speaker: "Jordan",
            timestamp: "[14/01/24, 05:18:33 PM]",
          },
          {
            message:
              "I finished that task you were worried about. One less thing on your plate",
            speaker: "Jordan",
            timestamp: "[20/01/24, 03:45:22 PM]",
          },
        ],
      },
    ],
  },
  secondary_languages: {
    participants: [
      {
        name: "Alex",
        language: "Quality Time",
        description:
          "Alex also values spending focused time together and frequently suggests activities or dates.",
        evidence: [
          {
            message:
              "Want to have a movie night this weekend? Just us, no phones",
            speaker: "Alex",
            timestamp: "[16/01/24, 07:32:18 PM]",
          },
        ],
      },
      {
        name: "Jordan",
        language: "Words of Affirmation",
        description:
          "While Jordan's primary language is acts of service, they also express appreciation verbally, especially through thank yous and recognition.",
        evidence: [
          {
            message: "Thank you for always being so understanding. Means a lot",
            speaker: "Jordan",
            timestamp: "[19/01/24, 09:15:42 PM]",
          },
        ],
      },
    ],
  },
  appreciation: {
    participants: [
      {
        name: "Alex",
        expression_style: "Verbal and frequent",
        frequency: "very_frequent",
      },
      {
        name: "Jordan",
        expression_style: "Action-oriented and thoughtful",
        frequency: "frequent",
      },
    ],
    frequency_comparison:
      "Alex expresses appreciation more explicitly through words, while Jordan shows it through helpful actions. Both happen regularly.",
    evidence: [
      {
        context: "Mutual appreciation exchange",
        exchange: [
          {
            message: "I really appreciate you listening to me vent today",
            speaker: "Alex",
            timestamp: "[15/01/24, 08:42:15 PM]",
          },
          {
            message: "Always. That's what I'm here for ❤️",
            speaker: "Jordan",
            timestamp: "[15/01/24, 08:43:22 PM]",
          },
        ],
      },
    ],
  },
  recognition: {
    analysis:
      "Both partners recognize and appreciate each other's efforts. Alex notices and thanks Jordan for helpful acts, while Jordan acknowledges Alex's emotional support.",
    balance: "Well balanced - both feel seen and appreciated",
    evidence: [
      {
        context: "Alex recognizing Jordan's acts of service",
        exchange: [
          {
            message: "You're always doing little things to make my life easier",
            speaker: "Alex",
            timestamp: "[21/01/24, 07:18:33 PM]",
          },
          {
            message: "I love taking care of you",
            speaker: "Jordan",
            timestamp: "[21/01/24, 07:19:42 PM]",
          },
        ],
      },
    ],
  },
  compatibility: {
    match_type: "complementary",
    analysis:
      "Your different primary love languages actually complement each other beautifully. Alex fills Jordan's world with affirming words, while Jordan makes Alex's life easier through thoughtful actions.",
    adaptation_evidence:
      "Both show awareness of the other's love language - Alex thanks Jordan for acts of service, and Jordan is learning to verbalize appreciation more.",
  },
  missing_languages: [
    {
      language: "Physical Touch",
      explanation:
        "Since this is a text-based analysis, physical affection can't be measured. Emojis like ❤️ and 🥰 suggest warmth, but in-person touch may be happening outside of chat.",
    },
  ],
  beautiful_moments: [
    {
      moment_title: "Surprise Coffee Delivery",
      description:
        "Jordan brought Alex their favorite coffee without being asked, and Alex's appreciation created a sweet exchange.",
      exchange: [
        {
          message: "I grabbed your favorite coffee on my way home",
          speaker: "Jordan",
          timestamp: "[14/01/24, 05:18:33 PM]",
        },
        {
          message: "Omg you're the BEST! I was just thinking about getting one",
          speaker: "Alex",
          timestamp: "[14/01/24, 05:20:12 PM]",
        },
        {
          message: "I know you 😊",
          speaker: "Jordan",
          timestamp: "[14/01/24, 05:21:05 PM]",
        },
      ],
    },
  ],
  recommendations: [
    {
      title: "Speak Alex's Language More",
      target: ["Jordan"],
      suggestion:
        "Since words of affirmation are Alex's primary language, try saying 'I love you' or giving compliments more often, even through text.",
      why: "Hearing these words directly makes Alex feel most loved and secure in the relationship.",
      example_messages: [
        "I'm so lucky to have you",
        "You mean everything to me",
        "I love how thoughtful you are",
      ],
    },
    {
      title: "Let Jordan Help You",
      target: ["Alex"],
      suggestion:
        "When Jordan offers to do something for you, accept it graciously. Acts of service are how they show love, and accepting help makes them feel valued.",
      why: "Rejecting help (even out of politeness) can make Jordan feel like their primary way of showing love isn't valued.",
      example_messages: [
        "That would be so helpful, thank you!",
        "I'd love that, you're the best",
        "Yes please! That takes a load off my mind",
      ],
    },
  ],
  overall: {
    score: 9,
    summary:
      "Your love languages complement each other beautifully. Alex fills the relationship with affirming words while Jordan expresses love through thoughtful actions. You both recognize and appreciate each other's unique ways of showing love.",
  },
};

export const dummyFuturePlanning: FuturePlanningContent = {
  frequency: {
    level: "very_frequent",
    assessment:
      "Future-oriented conversations happen multiple times per week. Both partners actively discuss plans ranging from next weekend to long-term life goals.",
  },
  categories: [
    {
      category: "Near-term plans (1-3 months)",
      discussed: true,
      summary:
        "Frequent discussions about upcoming weekends, holidays, and seasonal plans. Both contribute ideas and coordinate schedules.",
      evidence: [
        {
          message: "Should we plan a trip for your birthday next month?",
          speaker: "Jordan",
          timestamp: "[10/01/24, 08:15:42 PM]",
        },
        {
          message: "Yes! I was thinking maybe a beach weekend?",
          speaker: "Alex",
          timestamp: "[10/01/24, 08:17:15 PM]",
        },
      ],
    },
    {
      category: "Living situation",
      discussed: true,
      summary:
        "Conversations suggest you're thinking about or already discussing living together. References to 'our place' and shared furniture decisions.",
      evidence: [
        {
          message: "We should start looking at apartments in that neighborhood",
          speaker: "Alex",
          timestamp: "[15/01/24, 07:32:18 PM]",
        },
      ],
    },
    {
      category: "Career and finances",
      discussed: true,
      summary:
        "Both share career goals and support each other's professional growth. Some discussion of shared financial decisions.",
      evidence: [
        {
          message: "If I get this promotion, maybe we can finally take that Europe trip",
          speaker: "Jordan",
          timestamp: "[18/01/24, 06:42:33 PM]",
        },
      ],
    },
  ],
  alignment: {
    overall_level: "well_aligned",
    analysis:
      "You share similar timelines for major life decisions and support each other's individual goals. There's a strong sense of 'we' in planning without losing individual identities.",
    category_alignment: [
      {
        category: "Near-term plans",
        alignment_status: "Fully aligned - both excited about upcoming trips and activities",
      },
      {
        category: "Living situation",
        alignment_status: "Aligned - both seem ready for next step",
      },
      {
        category: "Career",
        alignment_status:
          "Supportive - each person's career goals complement rather than conflict",
      },
    ],
  },
  planning_styles: {
    participants: [
      {
        name: "Alex",
        style: "Visionary planner",
        description:
          "Alex loves imagining the big picture and gets excited about future possibilities. Tends to dream big first, then figure out details.",
        evidence: [
          {
            message: "I keep imagining what our place will look like when we decorate it",
            speaker: "Alex",
            timestamp: "[16/01/24, 09:42:15 PM]",
          },
        ],
      },
      {
        name: "Jordan",
        style: "Practical planner",
        description:
          "Jordan thinks through logistics and timelines. Helps turn Alex's visions into actionable steps.",
        evidence: [
          {
            message:
              "Let's make a budget first, then we can prioritize what we want to get",
            speaker: "Jordan",
            timestamp: "[16/01/24, 09:45:33 PM]",
          },
        ],
      },
    ],
    compatibility:
      "Your planning styles complement each other perfectly. Alex brings the vision and excitement, while Jordan ensures things actually happen. Neither feels stifled or unsupported.",
    initiator: "Both equally - Alex initiates dream conversations, Jordan initiates practical planning",
  },
  timelines: {
    concrete_vs_vague: "Mix of concrete near-term and flexible long-term",
    alignment:
      "Both comfortable with the balance of defined short-term plans and open-ended long-term dreams",
    evidence: [
      {
        message: "Let's book that weekend trip by next Friday",
        speaker: "Jordan",
        timestamp: "[12/01/24, 07:18:42 PM]",
        context: "Concrete timeline for near-term plan",
      },
      {
        message: "Someday I want us to have a place with a balcony for morning coffee",
        speaker: "Alex",
        timestamp: "[14/01/24, 08:32:15 AM]",
        context: "Flexible long-term vision",
      },
    ],
  },
  enthusiasm: {
    participants: [
      {
        name: "Alex",
        level: "very_high",
        description:
          "Uses excited language, lots of emojis, and frequently brings up future plans with enthusiasm.",
      },
      {
        name: "Jordan",
        level: "high",
        description:
          "Shows enthusiasm through action - researching options, making concrete suggestions, and following through on plans.",
      },
    ],
    evidence: [
      {
        context: "Planning a future trip",
        exchange: [
          {
            message: "I'm SO excited about Europe!! 🎉✈️",
            speaker: "Alex",
            timestamp: "[18/01/24, 06:45:18 PM]",
          },
          {
            message: "Me too! I started looking at flight prices already",
            speaker: "Jordan",
            timestamp: "[18/01/24, 06:47:32 PM]",
          },
        ],
      },
    ],
  },
  shared_dreams: [
    {
      dream_title: "Creating a Home Together",
      description:
        "Both partners dream about having a shared living space that reflects both of your personalities. References to furniture, decor, and lifestyle choices show aligned visions.",
      exchange: [
        {
          message: "I can't wait to have a place that's ours",
          speaker: "Alex",
          timestamp: "[16/01/24, 09:38:42 PM]",
        },
        {
          message: "Same. I keep seeing furniture and thinking 'that's so us'",
          speaker: "Jordan",
          timestamp: "[16/01/24, 09:40:15 PM]",
        },
      ],
    },
    {
      dream_title: "Traveling Together",
      description:
        "A shared vision of exploring new places together. Both excited about specific destinations and the experience of traveling as a couple.",
      exchange: [
        {
          message: "Europe has been my dream forever. Doing it with you makes it perfect",
          speaker: "Alex",
          timestamp: "[18/01/24, 06:48:55 PM]",
        },
        {
          message: "We're going to make so many memories",
          speaker: "Jordan",
          timestamp: "[18/01/24, 06:49:42 PM]",
        },
      ],
    },
  ],
  missing_conversations: [
    {
      topic: "Family planning timeline",
      why_important:
        "If children (or choosing not to have them) are important to either of you, discussing timelines helps ensure you're on the same page.",
    },
    {
      topic: "Long-term career locations",
      why_important:
        "Understanding if either person's career might require relocation helps plan your shared future proactively.",
    },
  ],
  recommendations: [
    {
      title: "Schedule a 'Future Us' Conversation",
      suggestion:
        "Set aside relaxed time (maybe over dinner) to talk about your 5-year vision. What does life look like? Where are you living? What have you achieved together?",
      conversation_starters: [
        "If money wasn't an issue, where would we be living in 5 years?",
        "What's one big goal you want us to achieve together?",
        "How do you imagine our life looking different 5 years from now?",
      ],
    },
    {
      title: "Address the Missing Conversations",
      suggestion:
        "Gently bring up topics like family planning or career paths when you're both relaxed. These don't need decisions now, but knowing each other's thoughts prevents surprises later.",
      conversation_starters: [
        "I've been thinking about our future... have you thought about whether you want kids someday?",
        "Where do you see your career taking you in the next few years? Any cities you'd want to live in?",
        "What matters most to you in our long-term future together?",
      ],
    },
  ],
  overall: {
    score: 8,
    vision_status: "aligned",
    summary:
      "You're building a shared vision of the future together beautifully. Both partners contribute to planning, share enthusiasm, and support each other's goals. Your different planning styles actually complement each other well.",
  },
};

export const dummyPlayfulnessRomance: PlayfulnessRomanceContent = {
  overall_playfulness: {
    level: "high",
    assessment:
      "This relationship has a wonderful playful energy. Humor, teasing, and lighthearted moments appear frequently throughout conversations.",
  },
  humor_styles: {
    participants: [
      {
        name: "Alex",
        humor_types: ["witty comebacks", "self-deprecating", "puns"],
        description:
          "Alex uses clever wordplay and quick wit. Often makes fun of themselves in an endearing way.",
        evidence: [
          {
            message: "I'm basically a professional procrastinator at this point 😂",
            speaker: "Alex",
            timestamp: "[12/01/24, 03:42:15 PM]",
          },
        ],
      },
      {
        name: "Jordan",
        humor_types: ["playful teasing", "situational comedy", "memes"],
        description:
          "Jordan loves playful banter and sends funny memes or references that make Alex laugh.",
        evidence: [
          {
            message: "*sends meme about coffee addiction* This is literally you",
            speaker: "Jordan",
            timestamp: "[14/01/24, 09:15:33 AM]",
          },
        ],
      },
    ],
    initiator:
      "Both equally - Alex with wordplay, Jordan with visual humor and teasing",
  },
  inside_jokes: [
    {
      joke_or_reference: "The Great Pizza Debate",
      context:
        "Ongoing playful argument about pineapple on pizza that's become a recurring joke",
      evidence: [
        {
          message: "Still team pineapple pizza, sorry not sorry 🍍",
          speaker: "Alex",
          timestamp: "[10/01/24, 06:42:18 PM]",
        },
        {
          message: "We can't keep having this conversation 😂 But I love you anyway",
          speaker: "Jordan",
          timestamp: "[10/01/24, 06:43:25 PM]",
        },
      ],
    },
    {
      joke_or_reference: "Dramatic Weather Commentary",
      context:
        "They dramatically narrate weather conditions to each other like nature documentary hosts",
      evidence: [
        {
          message:
            "*David Attenborough voice* And here we see the majestic human, venturing out into the wild rain",
          speaker: "Jordan",
          timestamp: "[16/01/24, 07:18:42 AM]",
        },
      ],
    },
  ],
  flirtation: {
    participants: [
      {
        name: "Alex",
        frequency: "very_frequent",
        style: "Sweet and romantic with playful undertones",
      },
      {
        name: "Jordan",
        frequency: "frequent",
        style: "Flirty teasing mixed with genuine compliments",
      },
    ],
    balance:
      "Both partners flirt regularly. Alex leans more romantic, Jordan more playfully teasing - the mix keeps things fun and sweet.",
    evidence: [
      {
        context: "Evening flirty exchange",
        exchange: [
          {
            message: "How did I get so lucky? 😍",
            speaker: "Alex",
            timestamp: "[18/01/24, 09:32:15 PM]",
          },
          {
            message:
              "I ask myself that every day 😏 Also you're cute when you're sappy",
            speaker: "Jordan",
            timestamp: "[18/01/24, 09:33:42 PM]",
          },
          {
            message: "Stoppp you're making me blush",
            speaker: "Alex",
            timestamp: "[18/01/24, 09:34:18 PM]",
          },
        ],
      },
    ],
  },
  teasing_banter: {
    present: true,
    assessment:
      "Playful teasing is frequent and always affectionate. Both partners can dish it out and take it, creating a fun dynamic.",
    balance: "Well balanced - both tease each other equally and it's always lighthearted",
    evidence: [
      {
        context: "Teasing about coffee addiction",
        exchange: [
          {
            message: "That's your third coffee today 👀",
            speaker: "Jordan",
            timestamp: "[15/01/24, 03:15:42 PM]",
          },
          {
            message:
              "Listen, you knew what you were getting into with me 😂☕",
            speaker: "Alex",
            timestamp: "[15/01/24, 03:16:55 PM]",
          },
          {
            message: "True. I love my caffeinated partner 😘",
            speaker: "Jordan",
            timestamp: "[15/01/24, 03:17:32 PM]",
          },
        ],
      },
    ],
  },
  spontaneity: {
    present: true,
    initiator: "Both",
    description:
      "Both partners suggest spontaneous activities and surprise each other with unexpected messages or plans.",
    evidence: [
      {
        message: "Random thought: let's get ice cream right now",
        speaker: "Jordan",
        timestamp: "[20/01/24, 08:42:15 PM]",
        context: "Spontaneous date idea",
      },
      {
        message: "I'm so down. Meet you in 10?",
        speaker: "Alex",
        timestamp: "[20/01/24, 08:43:22 PM]",
        context: "Enthusiastic response",
      },
    ],
  },
  emoji_usage: {
    description:
      "Both use emojis liberally - hearts, laughing faces, playful emojis create a warm, expressive tone throughout conversations.",
    match_level: "very_aligned",
  },
  fun_activities: {
    discussed: true,
    types: [
      "movie nights",
      "trying new restaurants",
      "spontaneous adventures",
      "game nights",
    ],
    evidence: [
      {
        message: "Want to try that new Thai place everyone's talking about?",
        speaker: "Alex",
        timestamp: "[17/01/24, 06:18:33 PM]",
      },
    ],
  },
  mood_lifting: {
    present: true,
    description:
      "When one person is down, the other consistently uses humor, cute messages, or surprise suggestions to lift their mood.",
    evidence: [
      {
        context: "Cheering up Alex after tough day",
        exchange: [
          {
            message: "Today was awful",
            speaker: "Alex",
            timestamp: "[19/01/24, 06:42:15 PM]",
          },
          {
            message:
              "*sends funny cat video* Here's something to make you smile",
            speaker: "Jordan",
            timestamp: "[19/01/24, 06:44:32 PM]",
          },
          {
            message: "Okay that did help 😂 Thank you",
            speaker: "Alex",
            timestamp: "[19/01/24, 06:45:18 PM]",
          },
        ],
      },
    ],
  },
  romance_maintenance: {
    rating: "excellent",
    description:
      "The spark is alive and well. Flirtation, spontaneous romance, and affection appear regularly even in everyday conversations.",
    evidence: [
      {
        message: "Missing you ❤️",
        speaker: "Alex",
        timestamp: "[21/01/24, 02:32:15 PM]",
      },
      {
        message: "Miss you more. Can't wait to see you tonight",
        speaker: "Jordan",
        timestamp: "[21/01/24, 02:33:42 PM]",
      },
    ],
  },
  playfulness_gaps: [
    {
      gap: "Shared creative projects",
      suggestion:
        "Consider starting a fun shared project - cooking challenge, photo series, or building something together - to add another layer of playfulness.",
    },
  ],
  best_moments: [
    {
      moment_title: "Spontaneous Ice Cream Adventure",
      why_special:
        "Jordan's random suggestion and Alex's immediate yes captures the spontaneous, fun energy of your relationship.",
      exchange: [
        {
          message: "Random thought: let's get ice cream right now",
          speaker: "Jordan",
          timestamp: "[20/01/24, 08:42:15 PM]",
        },
        {
          message: "I'm so down. Meet you in 10?",
          speaker: "Alex",
          timestamp: "[20/01/24, 08:43:22 PM]",
        },
        {
          message: "Best decision of the day 🍦",
          speaker: "Jordan",
          timestamp: "[20/01/24, 09:15:42 PM]",
        },
      ],
    },
  ],
  recommendations: [
    {
      title: "Create New Inside Jokes",
      suggestion:
        "Inside jokes are relationship gold. Pay attention to funny moments that could become recurring jokes between you two.",
      examples: [
        "Turn a funny autocorrect into a running gag",
        "Give each other silly nicknames based on recent events",
        "Create your own rating system for things (e.g., rating everything on a taco scale)",
      ],
    },
    {
      title: "Keep Surprising Each Other",
      suggestion:
        "You're already great at spontaneity - keep it up! Small unexpected gestures keep the romance alive.",
      examples: [
        "Send a random 'thinking of you' message during the workday",
        "Suggest an impromptu date or activity",
        "Share something that reminded you of them",
      ],
    },
  ],
  overall: {
    score: 9,
    spark_status: "strong",
    summary:
      "Your relationship has a beautiful balance of playfulness and romance. The humor, inside jokes, and spontaneous moments keep things fun, while regular flirtation and affection maintain the spark. You genuinely enjoy each other's company.",
  },
};
