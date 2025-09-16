
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialTeamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Co-Founder & CEO",
    avatar: "https://picsum.photos/seed/john/128/128",
    bio: "The visionary and lead architect of our platform. John has over 10 years of experience turning complex problems into elegant software solutions.",
    techStack: "Next.js, Node.js, System Design",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Co-Founder & Head of Design",
    avatar: "https://picsum.photos/seed/jane/128/128",
    bio: "Jane is the creative mind behind our user interfaces. She turns complex problems into beautiful and intuitive designs that users love.",
    techStack: "Figma, UI/UX Research, Tailwind CSS",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Lead Backend Engineer",
    avatar: "https://picsum.photos/seed/mike/128/128",
    bio: "Mike ensures our platform is fast, scalable, and secure. He's a wizard with databases, server-side logic, and cloud infrastructure.",
    techStack: "PostgreSQL, GraphQL, DevOps",
  },
  {
    id: 4,
    name: "Emily White",
    role: "Lead Frontend Developer",
    avatar: "https://picsum.photos/seed/emily/128/128",
    bio: "Emily brings designs to life with her expertise in modern frontend frameworks. She has a passion for pixel-perfect UIs and a keen eye for detail.",
    techStack: "React, TypeScript, Genkit",
  },
];

type TeamMember = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  techStack: string; // Comma-separated
};

export default function ManageTeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        const storedMembers = localStorage.getItem("teamMembers");
        if (storedMembers) {
            setMembers(JSON.parse(storedMembers));
        } else {
            setMembers(initialTeamMembers);
        }
    }, []);

    const handleSave = (memberData: Omit<TeamMember, 'id'> & { id?: number }) => {
        let updatedMembers;
        if (editingMember) {
            updatedMembers = members.map(m => m.id === editingMember.id ? { ...editingMember, ...memberData } : m);
        } else {
            const newMember: TeamMember = {
                id: Date.now(),
                ...memberData,
            } as TeamMember;
            updatedMembers = [...members, newMember];
        }
        setMembers(updatedMembers);
        localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
        setIsDialogOpen(false);
        setEditingMember(null);
    };

    const handleDelete = (id: number) => {
        const updatedMembers = members.filter(m => m.id !== id);
        setMembers(updatedMembers);
        localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
    };

    const openDialogForEdit = (member: TeamMember) => {
        setEditingMember(member);
        setIsDialogOpen(true);
    };

    const openDialogForNew = () => {
        setEditingMember(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CardTitle>Manage Team</CardTitle>
                        <CardDescription>Add, edit, or remove team members.</CardDescription>
                    </div>
                    <Button onClick={openDialogForNew} className="w-full md:w-auto"><PlusCircle className="mr-2 h-4 w-4" />Add New Member</Button>
                </CardHeader>
                <CardContent>
                    {/* Desktop Table View */}
                    <Table className="hidden md:table">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Avatar</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member.id}>
                                     <TableCell>
                                        <Avatar>
                                            <AvatarImage src={member.avatar} alt={member.name} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{member.name}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell className="text-right">
                                        <ActionsDropdown member={member} onEdit={openDialogForEdit} onDelete={handleDelete} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    
                    {/* Mobile Card View */}
                    <div className="grid gap-4 md:hidden">
                        {members.map((member) => (
                            <Card key={member.id}>
                                <CardHeader className="flex flex-row items-center justify-between p-4">
                                     <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={member.avatar} alt={member.name} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-base">{member.name}</CardTitle>
                                            <CardDescription>{member.role}</CardDescription>
                                        </div>
                                    </div>
                                    <ActionsDropdown member={member} onEdit={openDialogForEdit} onDelete={handleDelete} />
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <MemberFormDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSave}
                member={editingMember}
            />
        </div>
    )
}

function ActionsDropdown({ member, onEdit, onDelete }: { member: TeamMember, onEdit: (member: TeamMember) => void, onDelete: (id: number) => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(member)}>
                    Edit
                </DropdownMenuItem>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the team member.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(member.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function MemberFormDialog({ isOpen, onOpenChange, onSave, member }: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSave: (data: Omit<TeamMember, 'id'> & { id?: number }) => void;
    member: TeamMember | null;
}) {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        avatar: '',
        bio: '',
        techStack: '',
    });

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name,
                role: member.role,
                avatar: member.avatar,
                bio: member.bio,
                techStack: member.techStack,
            });
        } else {
            // Reset for new member
            setFormData({ name: '', role: '', avatar: '', bio: '', techStack: '' });
        }
    }, [member, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{member ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
                    <DialogDescription>
                        Fill in the details below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Role</Label>
                        <Input id="role" value={formData.role} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="avatar" className="text-right">Avatar URL</Label>
                        <Input id="avatar" value={formData.avatar} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">Bio</Label>
                        <Textarea id="bio" value={formData.bio} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="techStack" className="text-right">Tech Stack</Label>
                        <Input id="techStack" placeholder="Comma-separated" value={formData.techStack} onChange={handleChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

    