"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from '../ui/aceternity/SparklesCore';
import { Brain, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ShootingStarField } from '../ui/aceternity/ShootingStarField';
import { TextReveal } from '../ui/aceternity/TextReveal';
export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Static Stars Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_100%)]" />
      </div>

      {/* Shooting Stars Background */}
      <ShootingStarField 
        starCount={30} 
        minSpeed={8}
        maxSpeed={15}
        className="absolute inset-0"
      />
      
      {/* Sparkles Effect */}
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={2}
        maxSize={3}
        particleDensity={1.5}
        className="absolute inset-0"
        particleColor="#FFFFFF"
        speed={1.5}
        particleCount={100}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="w-16 h-16 rounded-xl bg-transparent flex items-center justify-center mx-auto mb-8"
                >
                    <img src="/assets/icons/login-Group 43071.svg" alt="GemText Logo" className="w-14 h-14" />
                </motion.div>

        {/* Headings */}
        <div className="space-y-4 mb-12">
          <TextReveal
            text="Next Generation"
            className="text-white/50 text-xl font-bold tracking-widest uppercase"
          />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
            AI Mapping
          </h1>
          <div>
              
          </div>
          <TextReveal
            text="Your personal AI productivity partner"
            className="text-white/70 text-xl md:text-2xl font-light mt-4"
          />
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={() => router.push('/login')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-gradient-to-r from-primary/80 to-secondary/80 rounded-full overflow-hidden transition-all duration-300 hover:from-primary hover:to-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
        </motion.button>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent opacity-80" />
    </div>
  );
}