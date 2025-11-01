"use client";

import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  category: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Digital Marketer",
    image: "👩‍💼",
    rating: 5,
    text: "Reliv Chats helped me understand my communication patterns in my relationship. The emotional depth analysis was spot-on and gave us actionable ways to improve!",
    category: "Romantic",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    image: "👨‍💻",
    rating: 5,
    text: "I analyzed my team's work chat and discovered we were missing key collaboration patterns. The insights helped us restructure our communication. Game changer!",
    category: "Work",
  },
  {
    name: "Priya Sharma",
    role: "Student",
    image: "👩‍🎓",
    rating: 5,
    text: "The friendship analysis showed me who I really connect with most. The response time patterns and conversation starters were fascinating! Worth every coin.",
    category: "Friendship",
  },
  {
    name: "David Martinez",
    role: "Entrepreneur",
    image: "👨‍💼",
    rating: 5,
    text: "I uploaded 6 months of family group chat. The AI insights revealed beautiful patterns of support and celebration we didn't even notice. Made me emotional!",
    category: "Family",
  },
  {
    name: "Emily Roberts",
    role: "Content Creator",
    image: "👩‍🎨",
    rating: 5,
    text: "The free stats alone are amazing! Message counts, emoji usage, top words - I shared my stats on Instagram and everyone wanted to try it. Love it!",
    category: "General",
  },
  {
    name: "Alex Thompson",
    role: "Product Manager",
    image: "👨‍💼",
    rating: 5,
    text: "Used it to analyze customer support chats. The sentiment analysis and response patterns helped us improve our support strategy significantly.",
    category: "Work",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-linear-to-br from-primary/5 via-white to-accent-pink/5">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full border border-amber-300 mb-6">
            <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span className="text-sm font-semibold text-amber-700">
              Loved by thousands
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from people who discovered deeper connections
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mb-6">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent-pink flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                  {testimonial.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-12 flex-wrap">
            <div>
              <div className="text-4xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent mb-1">
                10,000+
              </div>
              <div className="text-gray-600">Chats Analyzed</div>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div>
              <div className="text-4xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent mb-1">
                4.9/5
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div>
              <div className="text-4xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent mb-1">
                5,000+
              </div>
              <div className="text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
