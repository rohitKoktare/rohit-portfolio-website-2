"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { blogPosts } from "@/data/blog-posts"
import { formatDate } from "@/lib/utils"
import Markdown from "react-markdown"

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState(blogPosts.find((p) => p.slug === params.slug))
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (!post) {
      notFound()
      return
    }

    // Find related posts (same category or shared tags)
    const related = blogPosts
      .filter((p) => p.id !== post.id) // Exclude current post
      .filter((p) => p.category === post.category || p.tags.some((tag) => post.tags.includes(tag)))
      .slice(0, 3) // Limit to 3 related posts

    setRelatedPosts(related)
  }, [post, params.slug])

  if (!post) {
    return null // This will be handled by notFound() above
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="mb-8">
              <Button asChild variant="ghost" size="sm" className="mb-6">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
                </Link>
              </Button>

              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <Markdown>{post.content}</Markdown>
              </div>
            </motion.div>

            {relatedPosts.length > 0 && (
              <motion.div variants={itemVariants} className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                      <div className="border border-border rounded-lg p-4 hover:border-primary transition-colors">
                        <Badge variant="outline" className="mb-2">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
