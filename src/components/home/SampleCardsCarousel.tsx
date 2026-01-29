"use client";

import { useEffect, useState } from "react";
import BaseCard from "../chat/cards/BaseCard";

const sampleCards = [
  {
    id: 1,
    pattern: "dots" as const,
    bgColor: "bg-purple-600",
    title: "TOTAL MESSAGES",
    mainContent: "2,547",
    subtitle: "messages exchanged together",
    bottomText: "Over 127 days of conversation",
  },
  {
    id: 2,
    pattern: "waves" as const,
    bgColor: "bg-blue-600",
    title: "PEAK CHATTING HOUR",
    mainContent: "9:00 PM",
    subtitle: "you're most active then",
    bottomText: "Evening chatters",
  },
  {
    id: 3,
    pattern: "circles" as const,
    bgColor: "bg-orange-600",
    title: "MOST USED EMOJI",
    mainContent: "😂",
    subtitle: "used 342 times",
    bottomText: "Your signature emoji",
  },
  {
    id: 4,
    pattern: "dots" as const,
    bgColor: "bg-amber-600",
    title: "EARLY BIRD",
    mainContent: "SARAH",
    subtitle: "rises with the sun",
    bottomText: "Peak at 7AM",
  },
  {
    id: 5,
    pattern: "diagonal" as const,
    bgColor: "bg-cyan-600",
    title: "SPEED TEXTER",
    mainContent: "ALEX",
    subtitle: "replies lightning fast",
    bottomText: "3 min average response",
  },
  {
    id: 6,
    pattern: "circles" as const,
    bgColor: "bg-green-600",
    title: "QUESTION MASTER",
    mainContent: "JORDAN",
    subtitle: "keeps the conversation going",
    bottomText: "Asked 156 questions",
  },
];

export default function SampleCardsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleCards.length);
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Show 2 cards at a time
  const visibleCards = [
    sampleCards[currentIndex],
    sampleCards[(currentIndex + 1) % sampleCards.length],
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center gap-4 py-8">
      {visibleCards.map((card, index) => (
        <div
          key={card.id}
          className="transition-all duration-700 ease-in-out"
          style={{
            opacity: index === 0 ? 1 : 0.7,
            transform: index === 0 ? "scale(1)" : "scale(0.95)",
          }}
        >
          <BaseCard pattern={card.pattern} bgColor={card.bgColor}>
            <div className="flex-1 flex flex-col justify-between py-2">
              {/* Title */}
              <div className="text-center">
                <h3 className="text-[10px] font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
                  {card.title}
                </h3>
              </div>

              {/* Main content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center px-2">
                  <div
                    className={`${
                      card.mainContent.length > 10 ? "text-3xl" : "text-5xl"
                    } font-black mb-1 leading-tight`}
                  >
                    {card.mainContent}
                  </div>
                  <p className="text-[10px] italic opacity-80">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom text */}
              <div className="text-center">
                <p className="text-[9px] opacity-75 font-medium">
                  {card.bottomText}
                </p>
              </div>
            </div>
          </BaseCard>
        </div>
      ))}

      {/* Indicator dots */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {sampleCards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-purple-600 w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
