import React from "react";
import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  handle: string;
  image: string;
  quote: string;
};

// 10+ sample testimonials
const testimonials: Testimonial[] = [
  { name: "Briar Martin", handle: "@neilstellar", image: "/users/user1.jpg", quote: "ResuMate made building my resume an absolute breeze." },
  { name: "Avery Johnson", handle: "@averywrites", image: "/users/user2.jpg", quote: "ResuMate helped me craft a professional resume in minutes!" },
  { name: "Jordan Lee", handle: "@jordantalks", image: "/users/user3.jpg", quote: "Creating my resume with ResuMate was seamless and easy." },
  { name: "Sophia Green", handle: "@sophiag", image: "/users/user4.jpg", quote: "AI suggestions helped me highlight my strengths perfectly." },
  { name: "Liam Smith", handle: "@liamsmith", image: "/users/user5.jpg", quote: "I landed interviews faster thanks to ResuMate." },
  { name: "Olivia Brown", handle: "@oliviab", image: "/users/user6.jpg", quote: "Professional templates made my resume shine." },
  { name: "Ethan White", handle: "@ethanw", image: "/users/user7.jpg", quote: "Easy to use and very intuitive AI tool." },
  { name: "Ava Davis", handle: "@avadavis", image: "/users/user8.jpg", quote: "Loved how quick and smooth the process was." },
  { name: "Noah Wilson", handle: "@noahw", image: "/users/user9.jpg", quote: "ResuMate optimized my resume for ATS perfectly." },
  { name: "Mia Taylor", handle: "@miat", image: "/users/user10.jpg", quote: "Highly recommend it for anyone job hunting!" },
];

const TestimonialsCarousel: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Hear from our users
        </h2>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          See how ResuMate has helped thousands craft professional resumes with ease.
        </p>
      </div>

      {/* Infinite scrolling carousel */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {/* Duplicate testimonials for seamless loop */}
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="shrink-0 w-72 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-4 object-cover mx-auto"
              />
              <h3 className="font-semibold text-gray-900 text-center">{t.name}</h3>
              <span className="text-gray-500 text-sm mb-3 block text-center">{t.handle}</span>
              <p className="text-gray-600 text-center">{t.quote}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
