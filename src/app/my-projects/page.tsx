'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface User {
    name: string;
    email: string;
}

const userProjects = [
    {
        title: "E-commerce Platform Frontend",
        status: "In Progress",
        progress: 75,
        developer: { name: "Emily White", avatar: "https://picsum.photos/seed/emily/128/128", aiHint: "smiling woman" },
        description: "Building out the React components and connecting to the Shopify API."
    },
    {
        title: "AI Chatbot Integration",
        status: "Completed",
        progress: 100,
        developer: { name: "John Doe", avatar: "https://picsum.photos/seed/john/128/128", aiHint: "professional man" },
        description: "Successfully integrated the Genkit-powered chatbot into the support page."
    },
    {
        title: "Database Migration",
        status: "On Hold",
        progress: 20,
        developer: { name: "Mike Johnson", avatar: "https://picsum.photos/seed/mike/128/128", aiHint: "developer portrait" },
        description: "Project paused pending client feedback on the new schema."
    }
];

const statusColors: { [key: string]: "secondary" | "default" | "destructive" } = {
    "In Progress": "secondary",
    "Completed": "default",
    "On Hold": "destructive"
};

export default function MyProjectsPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if no user is found
            window.location.href = '/login';
        }
    }, []);

    if (!user) {
        return (
             <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="container py-12 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">My Projects</h1>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
                    Track the progress of your ongoing projects with our team.
                </p>
            </div>
            <div className="grid gap-8">
                {userProjects.map((project) => (
                    <Card key={project.title}>
                        <CardHeader className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <CardTitle className="mb-2">{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-2">
                                <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={project.developer.avatar} data-ai-hint={project.developer.aiHint} />
                                        <AvatarFallback>{project.developer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <span>{project.developer.name}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label className="text-sm text-muted-foreground">Progress: {project.progress}%</Label>
                                <Progress value={project.progress} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// Add a label component here since it's used in this page and might not be globally available.
const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" />
);