
'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContactRequest {
    id: number;
    name: string;
    email: string;
    description: string;
    budget: string;
    timeline: string;
    mobile: string;
    projectType: 'company' | 'self';
    status: 'Pending' | 'In Progress' | 'Completed';
    submittedAt: string;
}

const statusColors: { [key: string]: "secondary" | "default" | "destructive" | "outline" } = {
    "Pending": "secondary",
    "In Progress": "outline",
    "Completed": "default",
};

export default function ManageProjectsPage() {
    const [projects, setProjects] = useState<ContactRequest[]>([]);

    useEffect(() => {
        const storedRequests = localStorage.getItem("contactRequests");
        if (storedRequests) {
            // Add a unique ID if it's missing for backward compatibility
            const requests = JSON.parse(storedRequests).map((req: any, index: number) => ({
                ...req,
                id: req.id || Date.now() + index,
            }));
            setProjects(requests);
        }
    }, []);

    const handleStatusChange = (projectId: number, newStatus: 'Pending' | 'In Progress' | 'Completed') => {
        const updatedProjects = projects.map(p => 
            p.id === projectId ? { ...p, status: newStatus } : p
        );
        setProjects(updatedProjects);
        localStorage.setItem("contactRequests", JSON.stringify(updatedProjects));
    };

    return (
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Manage Project Status</CardTitle>
                    <CardDescription>Update the status of submitted client projects.</CardDescription>
                </CardHeader>
                <CardContent>
                     {/* Desktop Table View */}
                    <Table className="hidden md:table">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="font-medium">{project.name}</div>
                                        <div className="text-sm text-muted-foreground">{project.email}</div>
                                    </TableCell>
                                    <TableCell className="max-w-sm truncate">{project.description}</TableCell>
                                    <TableCell>{project.submittedAt}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusColors[project.status] || 'secondary'}>
                                            {project.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <StatusActionsDropdown project={project} onStatusChange={handleStatusChange} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Mobile Card View */}
                    <div className="grid gap-4 md:hidden">
                        {projects.map((project) => (
                             <Card key={project.id}>
                                <CardHeader className="flex flex-row items-center justify-between p-4">
                                     <div>
                                        <CardTitle className="text-base">{project.name}</CardTitle>
                                        <CardDescription>{project.email}</CardDescription>
                                    </div>
                                    <StatusActionsDropdown project={project} onStatusChange={handleStatusChange} />
                                </CardHeader>
                                <CardContent className="p-4 pt-0 space-y-2">
                                    <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                                    <div className="flex items-center justify-between text-sm">
                                         <Badge variant={statusColors[project.status] || 'secondary'}>
                                            {project.status}
                                        </Badge>
                                        <span className="text-muted-foreground">{project.submittedAt}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {projects.length === 0 && (
                        <div className="text-center text-muted-foreground py-12">
                            <p>No project requests found.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}


function StatusActionsDropdown({ project, onStatusChange }: { 
    project: ContactRequest, 
    onStatusChange: (projectId: number, newStatus: 'Pending' | 'In Progress' | 'Completed') => void 
}) {
    const statuses: ('Pending' | 'In Progress' | 'Completed')[] = ['Pending', 'In Progress', 'Completed'];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <span>Update Status</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup 
                            value={project.status} 
                            onValueChange={(newStatus) => onStatusChange(project.id, newStatus as any)}
                        >
                            {statuses.map(status => (
                                <DropdownMenuRadioItem key={status} value={status}>
                                    {status}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

