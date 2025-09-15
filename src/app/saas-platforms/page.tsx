'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Share2, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";

const saasPlatforms = {
  restaurant: [
    {
      title: "RestroManager",
      description: "An all-in-one restaurant management system with online ordering, table reservations, and POS integration.",
      images: [
        "https://picsum.photos/seed/resto1/600/400",
        "https://picsum.photos/seed/resto2/600/400",
        "https://picsum.photos/seed/resto3/600/400",
      ],
      aiHints: ["restaurant dashboard", "online menu", "table booking"],
      technologies: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
      liveDemoUrl: "#",
    },
  ],
  education: [
    {
      title: "EduLearn",
      description: "A comprehensive e-learning platform for schools and colleges, featuring course management, virtual classrooms, and student assessments.",
      images: [
        "https://picsum.photos/seed/edu1/600/400",
        "https://picsum.photos/seed/edu2/600/400",
      ],
      aiHints: ["online course", "virtual classroom"],
      technologies: ["React", "Firebase", "WebRTC", "Tailwind CSS"],
      liveDemoUrl: "#",
    },
  ],
  retail: [
    {
      title: "Clothify",
      description: "An e-commerce solution for fashion and apparel brands with inventory management, AI-powered recommendations, and a loyalty program.",
      images: [
        "https://picsum.photos/seed/cloth1/600/400",
        "https://picsum.photos/seed/cloth2/600/400",
        "https://picsum.photos/seed/cloth3/600/400",
      ],
      aiHints: ["fashion website", "clothing store", "product page"],
      technologies: ["Next.js", "Genkit", "Shopify API", "Vercel"],
      liveDemoUrl: "#",
    },
  ],
  community: [
    {
      title: "MasjidConnect",
      description: "A platform for mosques and Islamic centers to manage prayer times, events, donations, and community announcements.",
      images: [
        "https://picsum.photos/seed/masjid1/600/400",
        "https://picsum.photos/seed/masjid2/600/400",
      ],
      aiHints: ["mosque interior", "prayer times"],
      technologies: ["React Native", "Firebase", "Node.js"],
      liveDemoUrl: "#",
    },
  ],
};

const ShareButton = ({ projectTitle }: { projectTitle: string }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: projectTitle,
            text: `Check out this amazing SaaS platform: ${projectTitle}`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that don't support the Web Share API
                await navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
            }
        } catch (error) {
            console.error('Error sharing:', error);
            // Fallback to clipboard if sharing fails
            await navigator.clipboard.writeText(shareData.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Button variant="outline" className="w-full" onClick={handleShare}>
            {copied ? (
                <>
                    <Copy />
                    Copied!
                </>
            ) : (
                <>
                    <Share2 />
                    Share
                </>
            )}
        </Button>
    );
};

const ProjectCard = ({ project }: { project: typeof saasPlatforms.restaurant[0] }) => (
  <Card className="flex flex-col overflow-hidden group">
    <CardHeader className="p-0 relative">
      <Carousel className="w-full">
        <CarouselContent>
          {project.images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="overflow-hidden">
                <Image
                    src={img}
                    width={600}
                    height={400}
                    alt={`${project.title} screenshot ${index + 1}`}
                    data-ai-hint={project.aiHints[index]}
                    className="object-cover w-full aspect-video transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </CardHeader>
    <div className="flex flex-col flex-grow p-6">
      <CardTitle className="mb-2">{project.title}</CardTitle>
      <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

      <div className="mt-auto">
        <h4 className="font-semibold text-sm mb-2">Technologies Used:</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </div>
    </div>
    <CardFooter className="grid grid-cols-2 gap-4">
        <Button asChild className="w-full">
            <Link href={project.liveDemoUrl} target="_blank">
                <ExternalLink />
                Live Demo
            </Link>
        </Button>
        <ShareButton projectTitle={project.title} />
    </CardFooter>
  </Card>
);

export default function SaasPlatformsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our SaaS Platforms</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Industry-specific solutions, tailor-made for your business needs.
        </p>
      </div>

      <Tabs defaultValue="restaurant" className="w-full">
        <div className="flex justify-center">
            <ScrollArea className="w-full max-w-4xl pb-4 whitespace-nowrap">
                <TabsList className="inline-flex h-auto p-1">
                    <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="retail">Retail</TabsTrigger>
                    <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>

        <TabsContent value="restaurant">
          <div className="grid gap-8 mt-8 md:grid-cols-2">
            {saasPlatforms.restaurant.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education">
          <div className="grid gap-8 mt-8 md:grid-cols-2">
            {saasPlatforms.education.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="retail">
          <div className="grid gap-8 mt-8 md:grid-cols-2">
            {saasPlatforms.retail.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community">
          <div className="grid gap-8 mt-8 md:grid-cols-2">
            {saasPlatforms.community.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
