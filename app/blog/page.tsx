"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Clock, Search, Tag } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { blogPosts } from "@/data/blog-posts"
import { formatDate } from "@/lib/utils"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Extract unique categories and tags
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))
  const tags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

  // Filter posts based on search query, category, and tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === null || post.category === selectedCategory

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-5xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Management Insights</h1>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sharing my experiences, lessons learned, and best practices in project management and software delivery.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedTag === null ? "secondary" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(null)}
                >
                  All Tags
                </Badge>
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "secondary" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {sortedPosts.length === 0 ? (
              <motion.div variants={itemVariants} className="text-center py-10">
                <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="grid grid-cols-1 gap-8">
                {sortedPosts.map((post) => (
                  <Card key={post.slug} className="border-none shadow-lg overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge>{post.category}</Badge>
                            <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
                          </div>
                          <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>
                          <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/blog/${post.slug}`}>
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
