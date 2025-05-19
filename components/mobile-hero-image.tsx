"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function MobileHeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="flex justify-center mt-8 mb-4 lg:hidden"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-background shadow-xl">
            <Image src="/images/rohit.png" alt="Rohit Koktare" fill className="object-cover" priority />
          </div>
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-primary/20 dark:bg-primary/10"
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-secondary/20 dark:bg-secondary/10"
            animate={{
              y: [0, 5, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 6,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl -z-10 scale-75 opacity-50" />
      </div>
    </motion.div>
  )
}
