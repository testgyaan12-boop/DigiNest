
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ContactRequest {
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

export default function ContactUsPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [timeline, setTimeline] = useState('');
    const [mobile, setMobile] = useState('');
    const [projectType, setProjectType] = useState<'company' | 'self'>('company');
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
            budget,
            timeline,
            mobile,
            projectType,
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
        setBudget('');
        setTimeline('');
        setMobile('');
        setProjectType('company');
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Contact Us</CardTitle>
                        <CardDescription>
                            Have a project in mind? Fill out the form and we'll get back to you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="mobile">Mobile Number</Label>
                                    <Input id="mobile" type="tel" placeholder="+1 (555) 123-4567" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Project Type</Label>
                                    <RadioGroup defaultValue="company" value={projectType} onValueChange={(value: 'company' | 'self') => setProjectType(value)} className="flex items-center gap-4 pt-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="company" id="company" />
                                            <Label htmlFor="company">For Company</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="self" id="self" />
                                            <Label htmlFor="self">For Self</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="budget">Project Budget ($)</Label>
                                    <Input id="budget" type="number" placeholder="e.g., 5000" value={budget} onChange={(e) => setBudget(e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="timeline">Timeline</Label>
                                    <Input id="timeline" placeholder="e.g., 3-6 months" value={timeline} onChange={(e) => setTimeline(e.target.value)} />
                                </div>
                            </div>

                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="description">Project Description</Label>
                                <Textarea id="description" placeholder="Tell us about your project..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>
                            <Button type="submit" className="w-full md:col-span-2">Submit Request</Button>
                        </form>
                    </CardContent>
                </Card>

                 <div className="space-y-4">
                     <h2 className="text-3xl font-bold tracking-tighter">Your Project Requests</h2>
                     <p className="text-muted-foreground">Track the status of your submitted projects here.</p>
                      <Card>
                        <CardContent className="p-0">
                            <ScrollArea>
                                <div className="overflow-x-auto">
                                    <Table className="min-w-full">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="min-w-[250px]">Project</TableHead>
                                                <TableHead>Submitted</TableHead>
                                                <TableHead>Budget</TableHead>
                                                <TableHead className="text-right">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {requests.length > 0 ? (
                                                requests.map((req, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium max-w-xs truncate">{req.description}</TableCell>
                                                        <TableCell>{req.submittedAt}</TableCell>
                                                        <TableCell>${req.budget}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Badge variant={req.status === 'Pending' ? 'secondary' : 'default'}>
                                                                {req.status}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="text-center h-24">
                                                        You haven't submitted any projects yet.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
