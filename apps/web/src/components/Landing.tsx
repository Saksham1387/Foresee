"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  ClubIcon as Football,
  ShoppingBasketIcon as Basketball,
  BeerIcon as Baseball,
  TurtleIcon as Tennis,
  ChevronRight,
  Star,
  Shield,
  Zap,
  DollarSign,
  Clock,
  Users,
  Check,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { InternalHeader } from "./InternalHeader";
import { Hero } from "./Hero";
import { Feature } from "./FeatureSection";
import { StatsSection } from "./StatsSection";

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

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Win?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join Foresee today. Get 100% bonus on your first deposit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-white">Foresee</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Foresee: Best odds. Fast payouts. Secure betting.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Sports</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Football
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Basketball
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Tennis
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Baseball
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Hockey
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Affiliates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Responsible Gambling
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-sm text-slate-500">
                © {new Date().getFullYear()} Foresee. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-4 md:justify-end text-sm text-slate-500">
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Cookies
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Licenses
                </Link>
                <Link
                  href="#"
                  className="hover:text-slate-300 transition-colors"
                >
                  Settings
                </Link>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500">
              <p>
                Gambling can be addictive. Please play responsibly. Foresee
                promotes responsible gambling.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
