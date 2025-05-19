"use client"

import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Experience = () => {
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
        staggerChildren: 0.2,
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

  const experiences = [
    {
      title: "Associate Project Manager",
      company: "Zero8.Dev",
      period: "January 2024 - Present",
      location: "Remote",
      description: [
        "Accelerated performance by leading 10 developers team and communicating with 8 stakeholders around the 1.5 years.",
        "Successfully completed 6 projects which includes 2 SAAS, 2 E-commerce platforms and one social media application.",
        "Developed a process of onboarding new project, monitor and control and closure of project, with stakeholder satisfaction.",
        "Contributed individually in 2 projects, managing my own issues and communication with the stakeholders and company.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Godspeed",
      period: "June 2024 - December 2024",
      location: "Los Angeles, CA",
      description: [
        "Built a VS Code extension for Godspeed, increasing coding speed by 70% and reducing errors by 50%. Worked on VS Code documentation.",
        "Converted client Python code to YAML-based Godspeed format using Frappe for enhanced data security.",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-none shadow-lg overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold">{exp.title}</h3>
                        <p className="text-lg text-primary font-medium">{exp.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 md:text-right">
                        <Badge variant="outline" className="mb-2">
                          {exp.period}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{exp.location}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 list-disc pl-5">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
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

export default Experience
