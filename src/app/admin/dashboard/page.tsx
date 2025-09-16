
'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ListChecks, Newspaper, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Interfaces based on existing data structures in the app
interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  submittedAt: string;
  assignedTo?: string; // Name of the team member
}

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
}

interface BlogPost {
  id: number;
  title: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ projects: 0, team: 0, blogs: 0 });
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('contactRequests') || '[]');
    const storedTeam = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    const storedBlogs = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    setStats({ projects: storedProjects.length, team: storedTeam.length, blogs: storedBlogs.length });
    setTeamMembers(storedTeam);
    
    // Assign team members to projects for demonstration
    const projectsWithAssignments = storedProjects
        .map((p: any, index: number) => ({...p, id: p.id || Date.now() + index})) // Ensure ID
        .map((p: Project, index: number) => ({
            ...p,
            // Simple logic to assign a team member
            assignedTo: storedTeam.length > 0 ? storedTeam[index % storedTeam.length].name : 'Unassigned',
        }));

    setRecentProjects(projectsWithAssignments.slice(-5).reverse());
  }, []);

  const getMemberAvatar = (name: string) => {
    const member = teamMembers.find(m => m.name === name);
    return member?.avatar;
  }

  const getMemberFallback = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.team}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogs}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects and Team Assignments */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Project Submissions</CardTitle>
            <CardDescription>The latest 5 projects submitted by clients.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentProjects.length > 0 ? (
                <div className="space-y-4">
                {recentProjects.map(project => (
                    <div key={project.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="font-medium truncate max-w-[200px] sm:max-w-xs">{project.name}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-xs">{project.description}</p>
                        </div>
                        <Badge variant={project.status === 'Pending' ? 'secondary' : 'default'}>
                            {project.status}
                        </Badge>
                    </div>
                ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No projects found.</p>
            )}
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Active Project Assignments</CardTitle>
                <CardDescription>Who is working on what.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentProjects.filter(p => p.status === 'In Progress' || p.status === 'Pending').map(project => (
                         <div key={project.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="font-medium truncate">{project.description}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={getMemberAvatar(project.assignedTo || '')} />
                                    <AvatarFallback>{getMemberFallback(project.assignedTo || 'U')}</AvatarFallback>
                                </Avatar>
                                <span>{project.assignedTo}</span>
                            </div>
                        </div>
                    ))}
                    {recentProjects.filter(p => p.status === 'In Progress').length === 0 && (
                         <p className="text-sm text-muted-foreground text-center py-8">No active projects being worked on.</p>
                    )}
                </div>
            </CardContent>
        </Card>
      </div>

       <div className="text-center">
            <Button asChild>
                <Link href="/admin/projects">Manage All Projects</Link>
            </Button>
        </div>

    </div>
  );
}
