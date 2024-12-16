"use client";

import { motion } from "framer-motion";
import { Hospital, ArrowRight, Notebook, House } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Notebook,
    title: "Education",
    description: "Learning shapes the future, one step at a time.",
  },
  {
    icon: Hospital,
    title: "Medical Treatment",
    description: "Compassion and care are the heart of healing.",
  },
  {
    icon: House,
    title: "Home Support",
    description: "A strong home is built on love and support.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function WhatWeDo() {
  return (
    <section id="whatWeDo" className="py-16 px-4 bg-gray-50">
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
              What We Do
            </motion.span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Learn More What We Do
          </motion.h2>
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900"
          >
            And Get Involved
          </motion.h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="text-center border-none shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 mb-4">
                    <service.icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-4">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-lg mb-6">{service.description}</p>
                  <Button
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
