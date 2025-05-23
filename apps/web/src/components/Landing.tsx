"use client";
import { useState, useEffect } from "react";
import { InternalHeader } from "./InternalHeader";
import { Hero } from "./Hero";
import { Feature } from "./FeatureSection";
import { StatsSection } from "./StatsSection";
import { Footer } from "./Footer";
import { CTASection } from "./CTASection";

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const interval1 = setInterval(() => {
      setCount1((prev) => (prev < 500000 ? prev + 10000 : prev));
    }, 20);

    const interval2 = setInterval(() => {
      setCount2((prev) => (prev < 50 ? prev + 1 : prev));
    }, 60);

    const interval3 = setInterval(() => {
      setCount3((prev) => (prev < 98 ? prev + 1 : prev));
    }, 30);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <InternalHeader />

      <main className="flex-1">
        <Hero isVisible={isVisible} />

        <Feature container={container} item={item} />

        <StatsSection count1={count1} count2={count2} count3={count3} />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
