import { motion } from "framer-motion";
import { Check, Trophy, Users } from "lucide-react";

export const StatsSection = ({
  count1,
  count2,
  count3,
}: {
  count1: number;
  count2: number;
  count3: number;
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
            <div className="text-4xl font-bold">{count1.toLocaleString()}+</div>
            <div className="text-slate-300">Active Users</div>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
            <div className="text-4xl font-bold">{count2}+</div>
            <div className="text-slate-300">Sports Available</div>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Check className="h-8 w-8 mx-auto text-primary mb-2" />
            <div className="text-4xl font-bold">{count3}%</div>
            <div className="text-slate-300">Customer Satisfaction</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
