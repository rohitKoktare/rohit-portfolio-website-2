"use client"

import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Skills = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const skillCategories = [
    {
      category: "Project Management",
      skills: ["Scrum", "Agile", "Product Development", "Stakeholder Management", "Budgeting"],
    },
    {
      category: "Technical Skills",
      skills: ["UI/UX Design", "SaaS", "E-Commerce"],
    },
    {
      category: "Tools & Platforms",
      skills: ["Jira", "GitHub Projects", "Shopify", "Vercel", "Figma"],
    },
    {
      category: "Achievements",
      skills: [
        "Founded and led a 9-driver service in Pune during COVID",
        "Achieved 80% customer retention",
        "Launched a brand on Amazon.in with ₹1 lakh in sales within 3 months",
        "Reached standard seller status with profitable margins",
      ],
    },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Achievements</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full border-none shadow-lg overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <Badge
                          key={i}
                          variant={category.category === "Achievements" ? "default" : "secondary"}
                          className="text-sm py-1.5"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
