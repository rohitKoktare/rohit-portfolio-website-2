"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link href="/" className="text-2xl font-bold text-primary">
              RK
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex space-x-4 mb-6"
          >
            <Link href="https://github.com/rohitKoktare" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/rohit-koktare/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            {/* <Link href="mailto:rohitkoktarebugatti@gmail.com">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            <Link
              href={isHomePage ? "#about" : "/#about"}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href={isHomePage ? "#experience" : "/#experience"}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Experience
            </Link>
            <Link
              href={isHomePage ? "#projects" : "/#projects"}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href={isHomePage ? "#skills" : "/#skills"}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Skills
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link
              href={isHomePage ? "#contact" : "/#contact"}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-muted-foreground"
          >
            © {currentYear} Rohit Koktare. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
