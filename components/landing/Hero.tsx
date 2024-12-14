"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      {/* Background Image */}
      <Image
        src="/bgHero.png"
        alt="Heart2Hand"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute z-[-100] inset-0 opacity-60 w-full h-full object-cover"
        priority
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center opacity-100 z-10">
        <div className="container mx-auto px-6 relative text-center space-y-16">
          {/* Heading */}
          <motion.h1
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline"
          >
            Bridge Generosity with Need
          </motion.h1>

          {/* Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button className="shadow-[inset_0_0_0_2px_#616467] text-blue-800 bg-white/[0.2] px-6 py-2 rounded-full tracking-widest font-bold hover:bg-[#2d6fb1] hover:text-white dark:text-neutral-200 transition duration-200">
              <Link href="/signup/helper">Donate Now</Link>
            </button>
            <button className="shadow-[inset_0_0_0_2px_#616467] text-blue-800 bg-white/[0.2] px-6 py-2 rounded-full tracking-widest font-bold hover:bg-[#2d6fb1] hover:text-white dark:text-neutral-200 transition duration-200">
              <Link href="/signup/needer">Create Request</Link>
            </button>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.0, ease: "easeOut" }}
            className="text-lg md:text-2xl font-medium text-gray-800 w-[80%] lg:w-[60%] m-auto"
          >
            Join our mission to connect those in need with compassionate donors.
            Together, we can make a difference.
          </motion.p>
        </div>

        {/* Floating Animations */}
        <motion.div
          className="absolute top-10 left-10 w-16 h-16 bg-pink-400 rounded-full opacity-50"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute bottom-10 right-10 w-20 h-20 bg-purple-300 rounded-full opacity-50"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-indigo-400 rounded-full opacity-50"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        ></motion.div>
      </section>
    </>
  );
}
