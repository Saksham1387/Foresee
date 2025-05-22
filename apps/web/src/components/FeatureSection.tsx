import { motion } from "framer-motion";
import { DollarSign, Shield, Star, Zap } from "lucide-react";

export const Feature = ({container, item}: {container: any, item: any}) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Foresee</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Best odds. Fast payouts. Secure platform.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            variants={item}
            className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Payouts</h3>
            <p className="text-muted-foreground">
              Get your winnings instantly with secure payments.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
            <p className="text-muted-foreground">
              State-of-the-art security for your data and funds.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Best Odds</h3>
            <p className="text-muted-foreground">
              Competitive odds across all sports and events.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bonuses & Promos</h3>
            <p className="text-muted-foreground">
              Enjoy regular bonuses, free bets, and exciting promotions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};