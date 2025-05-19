"use client"

import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

const About = () => {
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

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 md:p-8">
                <p className="text-lg mb-6">
                  I'm an Associate Project Manager at Zero8.Dev with 2 years of experience in project and product
                  management. I've successfully delivered 6 software projects, including 2 SaaS platforms, 2 e-commerce
                  stores, and 1 social media app.
                </p>
                <p className="text-lg mb-6">
                  My expertise lies in managing development teams, communicating effectively with stakeholders, and
                  ensuring projects are delivered on time and within scope. I'm skilled in Jira, Agile methodologies,
                  and various SaaS tools.
                </p>
                <p className="text-lg">
                  I'm passionate about creating efficient processes for project onboarding, monitoring, and closure,
                  always with a focus on stakeholder satisfaction. My technical background allows me to bridge the gap
                  between development teams and non-technical stakeholders.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
