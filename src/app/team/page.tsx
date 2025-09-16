'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, Share2, Copy } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const initialTeamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Co-Founder & CEO",
    avatar: "https://picsum.photos/seed/john/128/128",
    bio: "The visionary and lead architect of our platform. John has over 10 years of experience turning complex problems into elegant software solutions.",
    techStack: "Next.js, Node.js, System Design",
    linkedinUrl: "https://www.linkedin.com/in/johndoe",
    category: "Leadership",
    aiHint: "professional man",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Co-Founder & Head of Design",
    avatar: "https://picsum.photos/seed/jane/128/128",
    bio: "Jane is the creative mind behind our user interfaces. She turns complex problems into beautiful and intuitive designs that users love.",
    techStack: "Figma, UI/UX Research, Tailwind CSS",
    linkedinUrl: "https://www.linkedin.com/in/janesmith",
    category: "Frontend",
     aiHint: "professional woman",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Lead Backend Engineer",
    avatar: "https://picsum.photos/seed/mike/128/128",
    bio: "Mike ensures our platform is fast, scalable, and secure. He's a wizard with databases, server-side logic, and cloud infrastructure.",
    techStack: "PostgreSQL, GraphQL, DevOps",
    linkedinUrl: "https://www.linkedin.com/in/mikejohnson",
    category: "Backend",
     aiHint: "developer portrait",
  },
    {
    id: 4,
    name: "Emily White",
    role: "Lead Frontend Developer",
    avatar: "https://picsum.photos/seed/emily/128/128",
    bio: "Emily brings designs to life with her expertise in modern frontend frameworks. She has a passion for pixel-perfect UIs and a keen eye for detail.",
    techStack: "React, TypeScript, Genkit",
    linkedinUrl: "https://www.linkedin.com/in/emilywhite",
    category: "Frontend",
     aiHint: "smiling woman",
  },
  {
    id: 5,
    name: "Chris Green",
    role: "DevOps Specialist",
    avatar: "https://picsum.photos/seed/chris/128/128",
    bio: "Chris automates our infrastructure and streamlines our deployment pipelines, ensuring maximum uptime and reliability.",
    techStack: "Docker, Kubernetes, AWS, CI/CD",
    linkedinUrl: "https://www.linkedin.com/in/chrisgreen",
    category: "DevOps",
     aiHint: "focused developer",
  },
  {
    id: 6,
    name: "Maria Garcia",
    role: "Quality Assurance Engineer",
    avatar: "https://picsum.photos/seed/maria/128/128",
    bio: "Maria is dedicated to perfection, rigorously testing our platform to find and fix bugs before they reach our users.",
    techStack: "Cypress, Jest, Playwright",
    linkedinUrl: "https://www.linkedin.com/in/mariagarcia",
    category: "QA",
     aiHint: "QA engineer testing",
  },
];

type TeamMember = typeof initialTeamMembers[0];


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

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
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
                    {member.techStack.split(',').map(tech => (
                        <Badge key={tech.trim()} variant="secondary">{tech.trim()}</Badge>
                    ))}
                </div>
             </div>
        </CardContent>
        <div className="flex items-center justify-between p-4 border-t">
             <p className="text-sm text-muted-foreground">Follow & Share</p>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={member.linkedinUrl || '#'} target="_blank" aria-label={`LinkedIn profile of ${member.name}`}>
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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const storedMembers = localStorage.getItem("teamMembers");
    if (storedMembers) {
      setTeamMembers(JSON.parse(storedMembers));
    } else {
      setTeamMembers(initialTeamMembers);
    }
  }, []);

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
        <div className="flex justify-center">
            <ScrollArea className="w-full max-w-2xl pb-4 whitespace-nowrap">
                <TabsList className="inline-flex h-auto p-1">
                    {categories.map(category => (
                        <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                    ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
        
        {categories.map(category => (
            <TabsContent key={category} value={category}>
                <div className="grid gap-8 mt-8 md:grid-cols-2">
                    {filteredMembers.map((member) => (
                        <TeamMemberCard key={member.name} member={member} />
                    ))}
                </div>
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
