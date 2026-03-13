"use client";

import { WorkplaceCollaborationContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Target, Users, CheckCircle2, AlertTriangle, ArrowLeftRight } from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";

interface Props {
  content: WorkplaceCollaborationContent;
  categorySlug?: string;
}

function EvidenceBlock({ evidence }: { evidence: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }> }) {
  return (
    <div className="space-y-2">
      {evidence.map((ev, i) => (
        <div key={i} className="p-3 bg-white rounded-lg border border-gray-200">
          {ev.context && <p className="text-xs text-gray-500 italic mb-2">{ev.context}</p>}
          <div className="space-y-1">
            {ev.exchange.map((msg, j) => (
              <div key={j} className="text-xs md:text-sm">
                <span className="font-semibold text-gray-900">{msg.speaker}:</span>{" "}
                <span className="text-gray-700">{msg.message}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorkplaceCollaborationView({ content, categorySlug }: Props) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.overall.collaboration_status}
      />

      {/* Task Ownership */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Target className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Task Ownership</h4>
        </div>
        <div className="space-y-4">
          {content.task_ownership.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-sm text-gray-900">{p.name}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">{p.ownership_style}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2 ml-12">{p.description}</p>
              {p.evidence && p.evidence.length > 0 && <div className="ml-12"><EvidenceBlock evidence={p.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Follow-Through */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Follow-Through</h4>
        </div>
        <div className="p-3 bg-green-50 rounded-lg border border-green-200 mb-3">
          <p className="text-xs font-medium text-green-700 mb-1">Rating</p>
          <p className="text-sm text-gray-900">{content.follow_through.rating}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.follow_through.analysis}</p>
        {content.follow_through.evidence && content.follow_through.evidence.length > 0 && (
          <EvidenceBlock evidence={content.follow_through.evidence} />
        )}
      </div>

      {/* Decision Making */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Decision-Making</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-700 mb-1">Style</p>
            <p className="text-sm text-gray-900">{content.decision_making.style}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-medium text-purple-700 mb-1">Primary Decision-Maker</p>
            <p className="text-sm text-gray-900">{content.decision_making.primary_decision_maker}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.decision_making.analysis}</p>
        {content.decision_making.evidence && content.decision_making.evidence.length > 0 && (
          <EvidenceBlock evidence={content.decision_making.evidence} />
        )}
      </div>

      {/* Blocker Communication */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span>🚧</span> Blocker Communication
        </h4>
        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 mb-3">
          <p className="text-xs font-medium text-orange-700 mb-1">Rating</p>
          <p className="text-sm text-gray-900">{content.blocker_communication.rating}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.blocker_communication.description}</p>
        {content.blocker_communication.evidence && content.blocker_communication.evidence.length > 0 && (
          <EvidenceBlock evidence={content.blocker_communication.evidence} />
        )}
      </div>

      {/* Workload Balance */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftRight className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Workload Balance</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-700 mb-1">Balance Rating</p>
            <p className="text-sm text-gray-900">{content.workload_balance.rating}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-medium text-purple-700 mb-1">Main Driver</p>
            <p className="text-sm text-gray-900">{content.workload_balance.primary_driver}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-700">{content.workload_balance.analysis}</p>
      </div>

      {/* Collaboration Strengths */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Collaboration Strengths</h4>
        </div>
        <div className="space-y-3">
          {content.collaboration_strengths.map((s, i) => (
            <div key={i}>
              <div className="flex items-start gap-2 mb-1">
                <span>✅</span>
                <p className="font-semibold text-sm text-gray-900">{s.strength}</p>
              </div>
              <p className="text-xs md:text-sm text-gray-700 ml-6">{s.description}</p>
              {s.evidence && s.evidence.length > 0 && <div className="ml-6 mt-2"><EvidenceBlock evidence={s.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Accountability Gaps */}
      {content.accountability_gaps.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
            <h4 className="font-bold text-base md:text-lg text-gray-900">Accountability Gaps</h4>
          </div>
          <div className="space-y-3">
            {content.accountability_gaps.map((g, i) => (
              <div key={i} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-semibold text-sm text-gray-900 mb-1">{g.gap}</p>
                <p className="text-xs md:text-sm text-gray-700 mb-1">{g.description}</p>
                <p className="text-xs text-green-700 italic">💡 {g.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>Work Better Together</span>
        </h4>
        <div className="space-y-4">
          {content.recommendations.map((rec, i) => (
            <div key={i}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h5 className="font-semibold text-sm md:text-base text-gray-900">{rec.title}</h5>
                <div className="flex gap-1 shrink-0">
                  {rec.target.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 bg-purple-50 rounded-full text-purple-700 border border-purple-200">{t}</span>
                  ))}
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2">{rec.suggestion}</p>
              {rec.example_phrases.length > 0 && (
                <div className="pl-4 border-l-2 border-purple-200 space-y-1">
                  {rec.example_phrases.map((ph, j) => (
                    <p key={j} className="text-xs md:text-sm italic text-gray-600">&quot;{ph}&quot;</p>
                  ))}
                </div>
              )}
              {i < content.recommendations.length - 1 && <div className="border-t border-gray-100 mt-3" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
