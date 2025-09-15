import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

const ProjectCard = ({ project }: { project: typeof saasPlatforms.restaurant[0] }) => (
  <Card className="flex flex-col overflow-hidden">
    <CardHeader className="p-0 relative">
      <Carousel className="w-full">
        <CarouselContent>
          {project.images.map((img, index) => (
            <CarouselItem key={index}>
              <Image
                src={img}
                width={600}
                height={400}
                alt={`${project.title} screenshot ${index + 1}`}
                data-ai-hint={project.aiHints[index]}
                className="object-cover w-full aspect-video"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </CardHeader>
    <div className="flex flex-col flex-grow p-6">
      <CardTitle className="mb-2">{project.title}</CardTitle>
      <p className="text-muted-foreground mb-4">{project.description}</p>

      <div className="mt-auto">
        <h4 className="font-semibold text-sm mb-2">Technologies Used:</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </div>
    </div>
    <CardFooter>
      <Button asChild className="w-full">
        <Link href={project.liveDemoUrl} target="_blank">
          <ExternalLink />
          Live Demo
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function SaasPlatformsPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">Our SaaS Platforms</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        Industry-specific solutions, tailor-made for your business needs.
      </p>

      <Tabs defaultValue="restaurant" className="mt-12">
        <TabsList className="grid w-full grid-cols-2 h-auto p-0 md:grid-cols-4">
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="retail">Retail</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

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
