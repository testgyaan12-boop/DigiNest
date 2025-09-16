
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, Copy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

type BlogPost = {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string;
  aiHint: string;
};

type Comment = {
  id: number;
  author: string;
  text: string;
  avatar: string;
  date: string;
};

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Server Components",
    date: "October 26, 2023",
    description: "An in-depth look at how React Server Components are changing the way we build web applications, leading to faster and more efficient experiences. This evolution in the React ecosystem allows developers to write UI that runs on the server, reducing the amount of JavaScript sent to the client. This results in significant performance improvements, especially for content-heavy pages. We'll explore the architecture, benefits, and how to get started with this transformative technology.",
    image: "https://picsum.photos/seed/react/1200/600",
    tags: "React, Next.js, Web Dev",
    aiHint: "server code",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    date: "September 15, 2023",
    description: "Tips and tricks for becoming a Tailwind CSS power user and building beautiful, custom UIs faster than ever before. Say goodbye to custom CSS. Tailwind's utility-first approach enables rapid prototyping and development without leaving your HTML. We'll cover advanced configuration, creating custom plugins, and strategies for keeping your projects maintainable and scalable as they grow.",
    image: "https://picsum.photos/seed/tailwind/1200/600",
    tags: "CSS, TailwindCSS, Frontend",
    aiHint: "css design",
  },
  {
    id: 3,
    title: "A Guide to Modern API Design",
    date: "August 5, 2023",
    description: "Best practices for designing clean, consistent, and easy-to-use APIs that your users will love. From REST to GraphQL. An API is the front door to your application's data, and a well-designed one can dramatically improve developer experience. We'll dive into principles like resource naming, status codes, error handling, and versioning to help you build APIs that are both powerful and a pleasure to use.",
    image: "https://picsum.photos/seed/api/1200/600",
    tags: "API, Backend, Architecture",
    aiHint: "network nodes",
  },
  {
    id: 4,
    title: "The Power of Generative AI",
    date: "July 22, 2023",
    description: "Exploring how large language models and generative AI are revolutionizing software development and user interaction. With tools like Genkit, integrating AI into your applications has never been easier. This post will cover the fundamentals of generative models, practical use cases, and how you can start building intelligent, AI-powered features that can write text, generate images, and more.",
    image: "https://picsum.photos/seed/genai/1200/600",
    tags: "AI, Genkit, Machine Learning",
    aiHint: "glowing brain",
  },
];

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

const ShareButton = ({ postTitle }: { postTitle: string }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: postTitle,
            text: `Check out this blog post: ${postTitle}`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (error) {
            console.error('Error sharing:', error);
            await navigator.clipboard.writeText(shareData.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Button variant="outline" onClick={handleShare}>
            {copied ? <Copy className="mr-2" /> : <Share2 className="mr-2" />}
            {copied ? 'Link Copied!' : 'Share'}
        </Button>
    );
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedPosts = localStorage.getItem("blogPosts");
    const allPosts = storedPosts ? JSON.parse(storedPosts) : initialBlogPosts;
    const foundPost = allPosts.find((p: BlogPost) => generateSlug(p.title) === params.slug);
    
    if (foundPost) {
        setPost(foundPost);
        const storedComments = localStorage.getItem(`comments_${foundPost.id}`);
        setComments(storedComments ? JSON.parse(storedComments) : [
            { id: 1, author: 'Jane Doe', text: 'Great insights, thanks for sharing!', avatar: 'https://picsum.photos/seed/jane-comment/40/40', date: '2 days ago' },
            { id: 2, author: 'Mike Smith', text: 'This was a very helpful read.', avatar: 'https://picsum.photos/seed/mike-comment/40/40', date: '1 day ago' },
        ]);
    } else if (typeof window !== 'undefined') {
        // Only call notFound on the client-side after checking
        notFound();
    }
  }, [params.slug]);

  const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newComment.trim() || !post) return;
      
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const comment: Comment = {
          id: Date.now(),
          author: user.name || 'Anonymous',
          text: newComment,
          avatar: `https://picsum.photos/seed/${user.email || 'anon'}/40/40`,
          date: 'Just now'
      };

      const updatedComments = [...comments, comment];
      setComments(updatedComments);
      localStorage.setItem(`comments_${post.id}`, JSON.stringify(updatedComments));
      setNewComment('');
  };
  
  if (!isClient) return null; // Or a loading spinner
  if (!post) return null; // Handled by notFound on client

  return (
    <div className="container py-12 md:py-16">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{post.date}</span>
            <span className="mx-1">&middot;</span>
            <div className="flex flex-wrap gap-2">
                {post.tags.split(',').map(tag => <Badge key={tag.trim()} variant="secondary">{tag.trim()}</Badge>)}
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{post.title}</h1>
        </header>

        <Image
          src={post.image}
          width={1200}
          height={600}
          alt={post.title}
          data-ai-hint={post.aiHint}
          className="rounded-lg mb-8 w-full object-cover aspect-video"
        />

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8 text-muted-foreground text-lg">
          {post.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="flex items-center justify-end">
            <ShareButton postTitle={post.title} />
        </div>

        <Separator className="my-12" />

        <section id="comments">
          <h2 className="text-3xl font-bold mb-8">Comments ({comments.length})</h2>
          
          <Card className="mb-8">
            <CardContent className="p-6">
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <label htmlFor="comment" className="font-semibold">Leave a comment</label>
                    <Textarea
                        id="comment"
                        placeholder="What are your thoughts?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                    <Button type="submit">Post Comment</Button>
                </form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.date}</p>
                  </div>
                  <p className="text-muted-foreground">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
