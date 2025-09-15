'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, Share2, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const teamMembers = [
  {
    name: "John Doe",
    role: "Co-Founder & CEO",
    avatar: "https://picsum.photos/seed/john/128/128",
    bio: "The visionary and lead architect of our platform. John has over 10 years of experience turning complex problems into elegant software solutions.",
    aiHint: "professional man",
    techStack: ["Next.js", "Node.js", "System Design"],
    linkedinUrl: "https://www.linkedin.com/in/johndoe",
    category: "Leadership",
  },
  {
    name: "Jane Smith",
    role: "Co-Founder & Head of Design",
    avatar: "https://picsum.photos/seed/jane/128/128",
    bio: "Jane is the creative mind behind our user interfaces. She turns complex problems into beautiful and intuitive designs that users love.",
    aiHint: "professional woman",
    techStack: ["Figma", "UI/UX Research", "Tailwind CSS"],
    linkedinUrl: "https://www.linkedin.com/in/janesmith",
    category: "Frontend",
  },
  {
    name: "Mike Johnson",
    role: "Lead Backend Engineer",
    avatar: "https://picsum.photos/seed/mike/128/128",
    bio: "Mike ensures our platform is fast, scalable, and secure. He's a wizard with databases, server-side logic, and cloud infrastructure.",
    aiHint: "developer portrait",
    techStack: ["PostgreSQL", "GraphQL", "DevOps"],
    linkedinUrl: "https://www.linkedin.com/in/mikejohnson",
    category: "Backend",
  },
    {
    name: "Emily White",
    role: "Lead Frontend Developer",
    avatar: "https://picsum.photos/seed/emily/128/128",
    bio: "Emily brings designs to life with her expertise in modern frontend frameworks. She has a passion for pixel-perfect UIs and a keen eye for detail.",
    aiHint: "smiling woman",
    techStack: ["React", "TypeScript", "Genkit"],
    linkedinUrl: "https://www.linkedin.com/in/emilywhite",
    category: "Frontend",
  },
  {
    name: "Chris Green",
    role: "DevOps Specialist",
    avatar: "https://picsum.photos/seed/chris/128/128",
    bio: "Chris automates our infrastructure and streamlines our deployment pipelines, ensuring maximum uptime and reliability.",
    aiHint: "focused developer",
    techStack: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    linkedinUrl: "https://www.linkedin.com/in/chrisgreen",
    category: "DevOps",
  },
  {
    name: "Maria Garcia",
    role: "Quality Assurance Engineer",
    avatar: "https://picsum.photos/seed/maria/128/128",
    bio: "Maria is dedicated to perfection, rigorously testing our platform to find and fix bugs before they reach our users.",
    aiHint: "QA engineer testing",
    techStack: ["Cypress", "Jest", "Playwright"],
    linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
    category: "QA",
  },
];

const ShareButton = ({ memberName }: { memberName: string }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: `Meet ${memberName}`,
            text: `Check out ${memberName}'s profile on Novasuites!`,
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
        <Button variant="ghost" size="icon" onClick={handleShare} aria-label={`Share ${memberName}'s profile`}>
            {copied ? <Copy className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
        </Button>
    );
};

const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => (
    <Card className="flex flex-col">
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left p-6">
            <Avatar className="h-24 w-24 mb-4 sm:mb-0 sm:mr-6 shrink-0">
                <AvatarImage src={member.avatar} data-ai-hint={member.aiHint} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="mb-2">{member.role}</CardDescription>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
            </div>
        </div>
        <CardContent className="px-6 flex-grow">
             <div>
                <h4 className="font-semibold text-sm mb-2">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2">
                    {member.techStack.map(tech => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                </div>
             </div>
        </CardContent>
        <div className="flex items-center justify-between p-4 border-t">
             <p className="text-sm text-muted-foreground">Follow & Share</p>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={member.linkedinUrl} target="_blank" aria-label={`LinkedIn profile of ${member.name}`}>
                        <Linkedin className="h-5 w-5"/>
                    </Link>
                </Button>
                <ShareButton memberName={member.name} />
             </div>
        </div>
    </Card>
);

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Leadership", "Frontend", "Backend", "DevOps", "QA"];
  
  const filteredMembers = teamMembers.filter(member => 
    activeTab === "All" || member.category === activeTab
  );

  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">Meet the Team</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        We are a team of passionate developers and designers dedicated to building the best development platform.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto">
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab}>
            <div className="grid gap-8 mt-8 md:grid-cols-2">
                {filteredMembers.map((member) => (
                    <TeamMemberCard key={member.name} member={member} />
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
