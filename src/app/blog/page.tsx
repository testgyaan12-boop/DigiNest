import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    title: "The Rise of Server Components",
    date: "October 26, 2023",
    description: "An in-depth look at how React Server Components are changing the way we build web applications.",
    image: "https://picsum.photos/seed/react/600/400",
    tags: ["React", "Next.js", "Web Dev"],
    aiHint: "server code",
  },
  {
    title: "Mastering Tailwind CSS",
    date: "September 15, 2023",
    description: "Tips and tricks for becoming a Tailwind CSS power user and building beautiful UIs faster than ever.",
    image: "https://picsum.photos/seed/tailwind/600/400",
    tags: ["CSS", "TailwindCSS", "Frontend"],
    aiHint: "css design",
  },
  {
    title: "A Guide to API Design",
    date: "August 5, 2023",
    description: "Best practices for designing clean, consistent, and easy-to-use APIs that your users will love.",
    image: "https://picsum.photos/seed/api/600/400",
    tags: ["API", "Backend", "Architecture"],
    aiHint: "network nodes",
  },
];

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">From the Blog</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        Thoughts on software, design, and everything in between.
      </p>
      <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.title} className="flex flex-col">
            <CardHeader className="p-0">
                <Image 
                    src={post.image}
                    width={600}
                    height={400}
                    alt={post.title}
                    data-ai-hint={post.aiHint}
                    className="object-cover w-full rounded-t-lg aspect-video"
                />
            </CardHeader>
            <div className="flex flex-col flex-grow p-6">
                <CardTitle className="mb-2">
                    <Link href="#" className="hover:underline">
                        {post.title}
                    </Link>
                </CardTitle>
                <CardDescription>{post.description}</CardDescription>
                <div className="mt-4">
                {post.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2">{tag}</Badge>)}
                </div>
            </div>
            <CardFooter>
                <p className="text-sm text-muted-foreground">{post.date}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
