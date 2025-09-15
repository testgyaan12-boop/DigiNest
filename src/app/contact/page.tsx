
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ContactRequest {
    name: string;
    email: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    submittedAt: string;
}

export default function ContactUsPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [requests, setRequests] = useState<ContactRequest[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Hydration safety: ensure local storage is only accessed on the client
        setIsClient(true);
        if (typeof window !== 'undefined') {
            const storedRequests = localStorage.getItem('contactRequests');
            if (storedRequests) {
                setRequests(JSON.parse(storedRequests));
            }
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: ContactRequest = {
            name,
            email,
            description,
            status: 'Pending',
            submittedAt: new Date().toLocaleDateString(),
        };

        const updatedRequests = [...requests, newRequest];
        setRequests(updatedRequests);
        localStorage.setItem('contactRequests', JSON.stringify(updatedRequests));

        // Reset form
        setName('');
        setEmail('');
        setDescription('');
    };

    if (!isClient) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="container py-12 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Contact Us</CardTitle>
                        <CardDescription>
                            Have a project in mind? Fill out the form and we'll get back to you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Project Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Tell us about your project..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">Submit Request</Button>
                        </form>
                    </CardContent>
                </Card>

                 <div className="space-y-4">
                     <h2 className="text-3xl font-bold tracking-tighter">Your Project Requests</h2>
                     <p className="text-muted-foreground">Track the status of your submitted projects here.</p>
                      <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Project</TableHead>
                                        <TableHead>Submitted</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {requests.length > 0 ? (
                                        requests.map((req, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium max-w-xs truncate">{req.description}</TableCell>
                                                <TableCell>{req.submittedAt}</TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant={req.status === 'Pending' ? 'secondary' : 'default'}>
                                                        {req.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center">
                                                You haven't submitted any projects yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

