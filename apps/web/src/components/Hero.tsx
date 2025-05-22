"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export const Hero = ({isVisible}: {isVisible: boolean}) => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/hero.jpeg"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-4 max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center justify-items-center">
          <div className="space-y-4 text-center lg:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Predict. <span className="text-primary">Win.</span>
            </motion.h1>
            <motion.p
              className="text-xl text-slate-300 max-w-[600px] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              The smartest betting platform with top odds and instant payouts.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10"
              >
                View Odds
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.9,
            }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative h-[400px] w-full max-w-md lg:max-w-none rounded-xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <Image
              src="/hero03.jpeg"
              alt="Betting platform preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-sm font-medium mb-2">Featured Match</div>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="font-bold">Arsenal</div>
                    <div className="text-xs text-slate-300">2.10</div>
                  </div>
                  <div className="text-center px-2">
                    <div className="text-xs text-slate-300">Draw</div>
                    <div className="text-xs font-bold">3.25</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">Liverpool</div>
                    <div className="text-xs text-slate-300">3.40</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3 bg-primary/90 hover:bg-primary"
                >
                  Place Bet
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};