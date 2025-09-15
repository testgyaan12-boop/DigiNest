import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Users } from "lucide-react";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce site with a modern frontend, robust backend, and a seamless user experience for online shopping.",
    image: "https://picsum.photos/seed/ecomm/600/400",
    aiHint: "online store",
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL"],
    developers: ["John Doe", "Jane Smith"],
    liveDemoUrl: "#",
  },
  {
    title: "Project Management Tool",
    description: "A collaborative tool to help teams manage tasks, track progress, and communicate effectively to deliver projects on time.",
    image: "https://picsum.photos/seed/pmtool/600/400",
    aiHint: "kanban board",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    developers: ["Mike Johnson"],
    liveDemoUrl: "#",
  },
  {
    title: "AI-Powered Chatbot",
    description: "An intelligent chatbot that provides instant customer support, answers queries, and integrates with existing business workflows.",
    image: "https://picsum.photos/seed/chatbot/600/400",
    aiHint: "robot conversation",
    technologies: ["Genkit", "TypeScript", "Next.js"],
    developers: ["Emily White", "John Doe"],
    liveDemoUrl: "#",
  },
  {
    title: "Personal Finance Tracker",
    description: "A mobile-friendly web app to track expenses, manage budgets, and visualize spending habits with interactive charts.",
    image: "https://picsum.photos/seed/finance/600/400",
    aiHint: "financial charts",
    technologies: ["React", "Chart.js", "Vercel"],
    developers: ["Jane Smith"],
    liveDemoUrl: "#",
  },
];

export default function PortfolioPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">My Work</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        A selection of projects that showcase my skills and passion for development.
      </p>
      <div className="grid gap-8 mt-12 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
              <Image
                src={project.image}
                width={600}
                height={400}
                alt={project.title}
                data-ai-hint={project.aiHint}
                className="object-cover w-full aspect-video"
              />
            </CardHeader>
            <div className="flex flex-col flex-grow p-6">
              <CardTitle className="mb-2">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>

              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>

               <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Users/>Developers:</h4>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {project.developers.join(', ')}
                </div>
              </div>
            </div>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href={project.liveDemoUrl} target="_blank">
                  <ExternalLink />
                  Live Demo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
