import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 border-4 border-blue-400/30 border-t-blue-400 rounded-full"
        />

        {/* Inner Pulse */}
        <motion.div
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        >
          <span className="text-[10px]">💧</span>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-xs font-black tracking-[0.3em] text-blue-300 uppercase animate-pulse"
      >
        Syncing DWSSM Records...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
