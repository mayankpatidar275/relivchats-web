"use client";

import Image from "next/image";
import ChatIllustration from "@/src/app/assets/Chat-pana-bg-hidden.svg";
import StatsExamplesSection from "./StatsExamplesSection";

export default function ShareableCardsFeature() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Illustration */}
          <div className="flex items-center justify-center order-2 md:order-1">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse" />
              <Image
                src={ChatIllustration}
                alt="Analyze your conversations"
                width={600}
                height={600}
                className="relative z-10 w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Right side - Stats Examples */}
          <div className="order-1 md:order-2">
            <StatsExamplesSection />
          </div>
        </div>
      </div>
    </section>
  );
}
