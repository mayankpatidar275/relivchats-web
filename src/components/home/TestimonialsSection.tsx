"use client";

import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  category: string;
}

// Curated top testimonials - show 3-4 on mobile, 6 on desktop
const testimonials: Testimonial[] = [
  {
    name: "Sarah J.",
    role: "Digital Marketer",
    image: "👩‍💼",
    rating: 5,
    text: "The emotional depth analysis was spot-on! Helped us improve our relationship communication significantly.",
    category: "Romantic",
  },
  // {
  //   name: "Michael C.",
  //   role: "Software Engineer",
  //   image: "👨‍💻",
  //   rating: 5,
  //   text: "Analyzed our team chat and discovered missing collaboration patterns. Game changer for remote work!",
  //   category: "Work",
  // },
  {
    name: "Priya S.",
    role: "Student",
    image: "👩‍🎓",
    rating: 5,
    text: "Free stats are amazing! The response time patterns and conversation starters were so insightful.",
    category: "Romantic",
  },
  // {
  //   name: "David M.",
  //   role: "Entrepreneur",
  //   image: "👨‍💼",
  //   rating: 5,
  //   text: "Family chat analysis revealed beautiful support patterns we didn't notice. Made me emotional! 💙",
  //   category: "Family",
  // },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-linear-to-br from-primary/5 via-white to-accent-pink/5">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-amber-50 rounded-full border border-amber-200 mb-4">
            <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600 fill-amber-600" />
            <span className="text-xs md:text-sm font-semibold text-amber-700">
              Loved by thousands
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            What Our Users Say
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            Real stories from people who discovered deeper connections
          </p>
        </div>

        {/* Testimonials Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent-pink flex items-center justify-center text-xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                  {testimonial.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof - Compact */}
        <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
              597+
            </div>
            <div className="text-xs md:text-sm text-gray-600">
              Chats Analyzed
            </div>
          </div>
          <div className="h-10 w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
              4.9/5
            </div>
            <div className="text-xs md:text-sm text-gray-600">
              Average Rating
            </div>
          </div>
          <div className="h-10 w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
              500+
            </div>
            <div className="text-xs md:text-sm text-gray-600">Happy Users</div>
          </div>
        </div>
      </div>
    </section>
  );
}
