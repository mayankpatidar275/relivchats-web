"use client";

import { useCategoryTheme } from "@/src/lib/theme";

interface Column {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any) => string;
}

interface ParticipantComparisonTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  participants: Array<Record<string, any>>;
  columns: Column[];
  highlightMetric?: string;
  categorySlug?: string;
}

export default function ParticipantComparisonTable({
  participants,
  columns,
  highlightMetric,
  categorySlug,
}: ParticipantComparisonTableProps) {
  const theme = useCategoryTheme(categorySlug);

  const getHighlightedParticipant = () => {
    if (!highlightMetric) return null;
    return participants.reduce((max, p) =>
      p[highlightMetric] > max[highlightMetric] ? p : max
    );
  };

  const highlighted = getHighlightedParticipant();

  return (
    <div className="overflow-x-auto">
      {/* Desktop table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, idx) => {
            const isHighlighted =
              highlighted && participant.name === highlighted.name;
            return (
              <tr
                key={idx}
                className={`border-b border-gray-100 ${
                  isHighlighted ? `${theme.bg} bg-opacity-20` : ""
                } hover:bg-gray-50 transition-colors`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-3 px-4 ${
                      col.key === highlightMetric
                        ? "font-bold text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {col.format
                      ? col.format(participant[col.key])
                      : participant[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {participants.map((participant, idx) => {
          const isHighlighted =
            highlighted && participant.name === highlighted.name;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border-2 ${
                isHighlighted
                  ? `${theme.bg} ${theme.text.replace("text-", "border-")}`
                  : "bg-white border-gray-200"
              }`}
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-xs font-semibold text-gray-600 uppercase">
                    {col.label}
                  </span>
                  <span
                    className={`text-sm ${
                      col.key === highlightMetric
                        ? "font-bold text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {col.format
                      ? col.format(participant[col.key])
                      : participant[col.key]}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
