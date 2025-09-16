
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type BlogPost = {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string; // Storing as comma-separated string
  aiHint: string;
};

const initialBlogPosts = [
  {
    id: 1,
    title: "The Rise of Server Components",
    date: "October 26, 2023",
    description: "An in-depth look at how React Server Components are changing the way we build web applications, leading to faster and more efficient experiences.",
    image: "https://picsum.photos/seed/react/600/400",
    tags: "React, Next.js, Web Dev",
    aiHint: "server code",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    date: "September 15, 2023",
    description: "Tips and tricks for becoming a Tailwind CSS power user and building beautiful, custom UIs faster than ever before. Say goodbye to custom CSS.",
    image: "https://picsum.photos/seed/tailwind/600/400",
    tags: "CSS, TailwindCSS, Frontend",
    aiHint: "css design",
  },
  {
    id: 3,
    title: "A Guide to Modern API Design",
    date: "August 5, 2023",
    description: "Best practices for designing clean, consistent, and easy-to-use APIs that your users will love. From REST to GraphQL.",
    image: "https://picsum.photos/seed/api/600/400",
    tags: "API, Backend, Architecture",
    aiHint: "network nodes",
  },
    {
    id: 4,
    title: "The Power of Generative AI",
    date: "July 22, 2023",
    description: "Exploring how large language models and generative AI are revolutionizing software development and user interaction.",
    image: "https://picsum.photos/seed/genai/600/400",
    tags: "AI, Genkit, Machine Learning",
    aiHint: "glowing brain",
  },
];

const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("blogPosts");
    if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
    } else {
        setPosts(initialBlogPosts);
    }
  }, []);


  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">From the Blog</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        Thoughts on software, design, and everything in between.
      </p>
      <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden group">
             <CardHeader className="p-0">
                <Link href={`/blog/${generateSlug(post.title)}`}>
                    <Image 
                        src={post.image}
                        width={600}
                        height={400}
                        alt={post.title}
                        data-ai-hint={post.aiHint}
                        className="object-cover w-full aspect-video group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </CardHeader>
            <div className="flex flex-col flex-grow p-6">
                <CardTitle className="mb-2">
                    <Link href={`/blog/${generateSlug(post.title)}`} className="hover:underline">
                        {post.title}
                    </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.split(',').map(tag => <Badge key={tag.trim()} variant="secondary">{tag.trim()}</Badge>)}
                </div>
            </div>
            <CardFooter className="mt-auto p-6 pt-0 flex-col items-start gap-4">
                 <Link href={`/blog/${generateSlug(post.title)}`} className="text-sm font-semibold text-primary hover:underline">
                    Read More &rarr;
                </Link>
                <p className="text-sm text-muted-foreground">{post.date}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
