import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Define animation for the spinner
const spinnerVariants = {
  rotate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

// Create a styled spinner component using motion and ShadCN's cn utility
export const LoadingSpinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <motion.div
        className={cn(
          "w-36 h-36 border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full"
        )}
        variants={spinnerVariants}
        animate="rotate"
      />
    </div>
  );
};
