
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Handshake } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

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

const DeveloperCard = ({ member, onHire, isHired }: { member: TeamMember; onHire: (member: TeamMember) => void; isHired: boolean; }) => (
    <Card className="flex flex-col">
        <CardHeader className="text-center p-6">
            <Avatar className="h-24 w-24 mb-4 mx-auto">
                <AvatarImage src={member.avatar} data-ai-hint={member.aiHint} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle>{member.name}</CardTitle>
            <CardDescription>{member.role}</CardDescription>
        </CardHeader>
        <CardContent className="px-6 flex-grow space-y-4">
             <p className="text-muted-foreground text-sm text-center">{member.bio}</p>
             <div>
                <h4 className="font-semibold text-sm mb-2 text-center">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                    {member.techStack.split(',').map(tech => (
                        <Badge key={tech.trim()} variant="secondary">{tech.trim()}</Badge>
                    ))}
                </div>
             </div>
        </CardContent>
        <CardFooter>
            <Button onClick={() => onHire(member)} className="w-full" disabled={isHired}>
                {isHired ? <><Check className="mr-2 h-4 w-4" />Hired</> : <><Handshake className="mr-2 h-4 w-4" />Hire Me</>}
            </Button>
        </CardFooter>
    </Card>
);

const HiredDeveloperCard = ({ member }: { member: TeamMember; }) => (
     <Card>
        <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} data-ai-hint={member.aiHint} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
            </div>
            <Button variant="outline" asChild>
                <a href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@novasuites.com`}>Contact</a>
            </Button>
        </CardContent>
    </Card>
)

export default function HireDeveloperPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [allDevelopers, setAllDevelopers] = useState<TeamMember[]>([]);
  const [hiredDevelopers, setHiredDevelopers] = useState<TeamMember[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedMembers = localStorage.getItem("teamMembers");
    const members = storedMembers ? JSON.parse(storedMembers) : initialTeamMembers;
    setAllDevelopers(members);

    const storedHiredDevelopers = localStorage.getItem("hiredDevelopers");
    if (storedHiredDevelopers) {
      setHiredDevelopers(JSON.parse(storedHiredDevelopers));
    }
  }, []);

  const handleHire = (developer: TeamMember) => {
    const isAlreadyHired = hiredDevelopers.some(d => d.id === developer.id);
    if (!isAlreadyHired) {
        const updatedHired = [...hiredDevelopers, developer];
        setHiredDevelopers(updatedHired);
        localStorage.setItem("hiredDevelopers", JSON.stringify(updatedHired));
        toast({
            title: "Developer Hired!",
            description: `${developer.name} has been added to your hired developers list.`,
        });
    }
  };

  const categories = ["All", "Leadership", "Frontend", "Backend", "DevOps", "QA"];
  
  const filteredMembers = allDevelopers.filter(member => 
    activeTab === "All" || member.category === activeTab
  );

  return (
    <div className="container py-12 md:py-24">
      <Toaster />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Hire a Developer</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
            Find the perfect developer for your project from our team of experts.
        </p>
      </div>

      <Tabs defaultValue="find" className="w-full">
         <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto">
          <TabsTrigger value="find">Find a Developer</TabsTrigger>
          <TabsTrigger value="hired">My Hired Developers ({hiredDevelopers.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="find" className="mt-8">
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
                
                <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredMembers.map((member) => (
                        <DeveloperCard 
                            key={member.id} 
                            member={member} 
                            onHire={handleHire}
                            isHired={hiredDevelopers.some(d => d.id === member.id)}
                        />
                    ))}
                </div>
            </Tabs>
        </TabsContent>
        <TabsContent value="hired" className="mt-8">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>My Hired Developers</CardTitle>
                    <CardDescription>Contact the developers you've chosen to work with.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {hiredDevelopers.length > 0 ? (
                        hiredDevelopers.map(dev => <HiredDeveloperCard key={dev.id} member={dev} />)
                    ) : (
                        <div className="text-center text-muted-foreground py-12">
                            <p>You haven't hired any developers yet.</p>
                            <p className="text-sm">Browse the "Find a Developer" tab to get started.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
