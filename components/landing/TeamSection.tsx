'use client'

import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { containerVariants, itemVariants, imageVariants, overlayVariants, socialIconVariants } from '@/lib/framer';

const teamMembers = [
  {
    name: "Manas Kumar Pradhan",
    designation: "Tech Lead",
    image:
      "https://manaskpradhan.vercel.app/image%20resource/photo.jpg?height=400&width=300",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Manas Kumar Pradhan",
    designation: "Tech Lead",
    image:
      "https://manaskpradhan.vercel.app/image%20resource/photo.jpg?height=400&width=300",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Manas Kumar Pradhan",
    designation: "Tech Lead",
    image:
      "https://manaskpradhan.vercel.app/image%20resource/photo.jpg?height=400&width=300",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Manas Kumar Pradhan",
    designation: "Tech Lead",
    image:
      "https://manaskpradhan.vercel.app/image%20resource/photo.jpg?height=400&width=300",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
];

export default function TeamSection() {
  return (
    <section id='team' className="py-16 px-4 bg-gray-50">
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
              Team Members
            </motion.span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Let&apos;s Meet With Our
          </motion.h2>
          <motion.h3 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900"
          >
            Ordinary Soldiers
          </motion.h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden">
                <motion.div 
                  className="relative overflow-hidden"
                  initial="hidden"
                  whileHover="hover"
                >
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[300px] object-cover"
                    variants={imageVariants}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                    variants={overlayVariants}
                  >
                    {Object.entries(member.socials).map(([platform, url]) => (
                      <motion.a
                        key={platform}
                        href={url}
                        variants={socialIconVariants}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                      >
                        {platform === 'facebook' && <Facebook className="w-5 h-5" />}
                        {platform === 'twitter' && <Twitter className="w-5 h-5" />}
                        {platform === 'instagram' && <Instagram className="w-5 h-5" />}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
                <CardContent className="text-center p-6">
                  <motion.h3 
                    className="font-bold text-lg mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p 
                    className="text-orange-500"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {member.designation}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

