"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-600/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-navy-200">AI-Powered Product Discovery</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">Find the </span>
            <span className="text-gradient">Perfect Products</span>
            <br />
            <span className="text-white">with AI Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-navy-300 max-w-2xl mx-auto mb-10"
          >
            Our AI analyzes thousands of products to deliver personalized recommendations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              <Sparkles className="w-5 h-5" />
              Start AI Discovery
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Browse Products
            </button>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: Zap, label: "10K+ Products" },
              { icon: Shield, label: "Verified Reviews" },
              { icon: TrendingUp, label: "98% Accuracy" },
              { icon: Sparkles, label: "AI-Powered" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-navy-400">
                <badge.icon className="w-5 h-5 text-gold-500" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
