"use client";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
const socialIcons = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];
const quickLinks = [
  { href: "#", label: "About Us" },
  { href: "#", label: "Contact Us" },
  { href: "#", label: "Our Services" },
  { href: "#", label: "Terms & Condition" },
  { href: "#", label: "Support" },
];
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Logo href="#"/>
            <p className="text-sm">
              Heart2Hand connects donors with those in need, making a positive
              impact on lives around the world.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full border border-gray-300 p-2 hover:border-orange-500 hover:text-orange-500"
                >
                  <social.icon className="size-4" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          {/* Address Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Address</h3>
            <div className="space-y-2 text-sm">
              <p className="text-sm">Email: info@heart2hand.com</p>
              <p className="text-sm">Phone: +1 (555) 123-4567</p>
              <p className="text-sm">Address: Ghatikia, Bhubaneswar, 756019</p>
            </div>
          </motion.div>
          {/* Quick Links Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.label}
                  whileHover={{ x: 5 }}
                  className="w-fit"
                >
                  <Link
                    href={link.href}
                    className="text-sm hover:text-orange-500"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
      {/* Copyright Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-gray-200 py-4"
      >
        <div className="container mx-auto text-center space-y-2 px-4 text-sm md:flex-row md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} Heart2Hand. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
