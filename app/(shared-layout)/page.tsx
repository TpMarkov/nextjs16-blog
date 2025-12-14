"use client"

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BlogCard } from "./blog/blog-card";
import { ArrowRight, Edit3, MessageSquare, Search, Users } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useConvexAuth();
  const posts = useQuery(api.posts.getPosts);
  const recentPosts = posts?.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 -z-10" />

        <div className="container mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              Welcome to NextPro Blog
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Share Your Ideas with the{" "}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-accent bg-clip-text text-transparent">
                World
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A modern blogging platform with real-time collaboration, rich commenting,
              and beautiful content creation tools. Start writing today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              {isAuthenticated ? (
                <>
                  <Link href="/create">
                    <Button size="lg" className="text-base px-8 group">
                      Create Your First Post
                      <Edit3 className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button size="lg" variant="outline" className="text-base px-8">
                      Browse Posts
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/sign-up">
                    <Button size="lg" className="text-base px-8 group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button size="lg" variant="outline" className="text-base px-8">
                      Explore Posts
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Blog
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to make your blogging experience seamless and enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Real-time Presence",
                description: "See who's reading your posts in real-time with live presence indicators",
                delay: "delay-300"
              },
              {
                icon: MessageSquare,
                title: "Rich Comments",
                description: "Engage with your readers through our beautiful commenting system",
                delay: "delay-400"
              },
              {
                icon: Search,
                title: "Powerful Search",
                description: "Find any post instantly with our fast and accurate search feature",
                delay: "delay-500"
              },
              {
                icon: Edit3,
                title: "Beautiful Editor",
                description: "Create stunning posts with image support and rich formatting",
                delay: "delay-600"
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-1000 ${feature.delay}`}
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section - Only show when authenticated and posts exist */}
      {isAuthenticated && recentPosts && recentPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Recent Posts</h2>
                <p className="text-muted-foreground text-lg">
                  Check out the latest from our community
                </p>
              </div>
              <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  body={post.body}
                  imageUrl={post.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-chart-2/10 to-accent/20 -z-10" />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {isAuthenticated ? (
              <>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Ready to Share Your Story?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Create your first blog post and join our community of writers
                </p>
                <Link href="/create">
                  <Button size="lg" className="text-base px-8 mt-4 group">
                    Start Writing Now
                    <Edit3 className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Join Our Community Today
                </h2>
                <p className="text-lg text-muted-foreground">
                  Sign up now and start sharing your ideas with the world
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Link href="/sign-up">
                    <Button size="lg" className="text-base px-8 group">
                      Sign Up Free
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="text-base px-8">
                      Login
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
