"use client";

import { motion } from 'framer-motion';

export default function SpeedAnimation() {
  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Background Speed Lines */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#b2d7e9] to-transparent"
            style={{
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 100}%`,
              left: '-100%',
            }}
            animate={{
              x: ['0%', '200%'],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated Mail Icons */}
      <div className="flex justify-center space-x-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="relative"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            <div className="w-12 h-8 bg-gradient-to-r from-[#b3cde0] to-[#b2d7e9] rounded relative">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-[#011f4b] rounded-t"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Speed Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-8"
      >
        <span className="text-4xl font-bold bg-clip-text text-transparent bg-speed-gradient animate-shimmer bg-[length:200%_auto]">
          Lightning Fast Delivery
        </span>
        <p className="text-[#b2d7e9] mt-2 animate-pulse-slow">
          APIs that deliver in milliseconds
        </p>
      </motion.div>
    </div>
  );
}