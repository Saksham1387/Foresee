"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronRight, Eye } from "lucide-react";

export const Hero = ({ isVisible }: { isVisible: boolean }) => {
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 group cursor-pointer border border-gray-500"
                >
                  Get Started
                  <motion.div
                    className="ml-2"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
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
                <div className="text-lg font-bold mb-2 text-center">
                  Foresee
                </div>
                <div className="items-center flex justify-center">
                  <Eye className="h-7  w-7 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
