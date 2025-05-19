"use client"

import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

const Projects = () => {
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

  const projects = [
    {
      title: "Medical Insurance App",
      type: "SAAS Product",
      description: "This app is used to create insurance for family and companies, based out of Dubai.",
      responsibilities: [
        "Understand the business requirement and rules of Dubai for creating an Insurance for Private organisation and family.",
        "Developed AI-generated UI as per stakeholder needs, validated PRs, and monitored Vercel deployments, leveraging technical expertise to accelerate delivery.",
        "Manage 3 stakeholders and 2 developers on project ensuring smooth communication inside and outside the organisation.",
      ],
      link: "#",
      technologies: ["Next.js", "Vercel", "AI UI Generation"],
    },
    {
      title: "Avkash",
      type: "Leave Management App",
      description: "Avkash is a Leave management app for any organisation with new tech and UI.",
      responsibilities: [
        "Initiated and led in-house SaaS product development from zero to release, performed market research and competitive analysis.",
        "Collaborated directly with the CEO to break down product vision into actionable tasks and Created and maintained GitHub Boards, sprints, and backlog.",
        "Onboarded 3 teams (45 users) and collected structured feedback for sprint improvements.",
      ],
      link: "#",
      technologies: ["SaaS", "GitHub", "Agile"],
    },
    {
      title: "Social Media App for Film Industry",
      type: "Web Platform",
      description: "A specialized social media platform for the film industry professionals.",
      responsibilities: [
        "Acted as communication bridge between 2 non-technical stakeholders and dev team.",
        "Led product development from planning to deployment in 3 months.",
        "Tested application end-to-end, onboarded 50-70 users for real-time feedback and feature validation.",
      ],
      link: "https://myprodxn.com",
      technologies: ["Social Media", "User Testing", "Deployment"],
    },
    {
      title: "E-Commerce Platform On Shopify",
      type: "E-Commerce",
      description: "Fully built and launched a design-sensitive e-commerce platform.",
      responsibilities: [
        "Fully built and launched a design-sensitive e-commerce platform with managing my own issues with JIRA and client communication.",
        "Integrated WhatsApp API and Google App Script for real-time order sync, meeting designer's detailed requirements.",
      ],
      link: "https://bhavinijohar.com/",
      technologies: ["Shopify", "JIRA", "WhatsApp API", "Google App Script"],
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial="hidden" animate={controls} variants={containerVariants}>
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of the key projects I've managed and contributed to throughout my career.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full flex flex-col border-none shadow-lg overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                  <CardContent className="p-6 flex-grow">
                    <div className="mb-4">
                      <Badge className="mb-2">{project.type}</Badge>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                      <ul className="space-y-2 list-disc pl-5">
                        {project.responsibilities.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    {project.link !== "#" && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
