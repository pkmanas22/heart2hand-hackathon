"use client";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import { containerVariants, itemVariants } from "@/lib/framer";

// const stories = [
//   {
//     id: 1,
//     title: "Seema's child's surgery funded successfully",
//     description:
//       "Thanks to generous donors, Seema's child received life-changing surgery.",
//     image: "/bgHero.png",
//   },
//   {
//     id: 2,
//     title: "John's education dreams fulfilled",
//     description:
//       "John can now attend college thanks to the support of our community. John can now attend college thanks to the support of our community. John can now attend college thanks to the support of our community.",
//     image: "/bgHero.png",
//   },
//   {
//     id: 3,
//     title: "Maria's small business thrives",
//     description:
//       "With a microloan from donors, Maria's bakery is now flourishing.",
//     image: "/bgHero.png",
//   },
// ];


export default function Highlights() {
  const testimonials = [
    {
      quote:
        "Your solution is a game-changer; it's streamlined our entire process!",
      name: "M K Pradhan",
      designation: "",
      src: "/bgHero.png",
    },
    {
      quote:
        "This is exactly what we needed to overcome our challenges—simple yet effective.",
      name: "U Sahoo",
      designation: "",
      src: "/bgHero.png",
    },
    {
      quote: "The level of support and precision you provide is unparalleled.",
      name: "A Nayak",
      designation: "",
      src: "/bgHero.png",
    },
    {
      quote:
        "You've turned our vision into reality with innovative and practical solutions.",
      name: "M Rout",
      designation: "",
      src: "/bgHero.png",
    },
  ];

  return (
    <section id="highlights" className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants}>
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-500 font-medium text-sm mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Highlights
            </motion.span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Explore what Needers Say
          </motion.h2>
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900"
          >
            About Helper
          </motion.h3>
        </motion.div>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
