
'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Image from "next/image";

const initialBlogPosts = [
  {
    id: 1,
    title: "The Rise of Server Components",
    date: "October 26, 2023",
    description: "An in-depth look at how React Server Components are changing the way we build web applications, leading to faster and more efficient experiences.",
    image: "https://picsum.photos/seed/react/600/400",
    tags: "React, Next.js, Web Dev",
    aiHint: "server code",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    date: "September 15, 2023",
    description: "Tips and tricks for becoming a Tailwind CSS power user and building beautiful, custom UIs faster than ever before. Say goodbye to custom CSS.",
    image: "https://picsum.photos/seed/tailwind/600/400",
    tags: "CSS, TailwindCSS, Frontend",
    aiHint: "css design",
  },
  {
    id: 3,
    title: "A Guide to Modern API Design",
    date: "August 5, 2023",
    description: "Best practices for designing clean, consistent, and easy-to-use APIs that your users will love. From REST to GraphQL.",
    image: "https://picsum.photos/seed/api/600/400",
    tags: "API, Backend, Architecture",
    aiHint: "network nodes",
  },
  {
    id: 4,
    title: "The Power of Generative AI",
    date: "July 22, 2023",
    description: "Exploring how large language models and generative AI are revolutionizing software development and user interaction.",
    image: "https://picsum.photos/seed/genai/600/400",
    tags: "AI, Genkit, Machine Learning",
    aiHint: "glowing brain",
  },
];


type BlogPost = {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string; // Storing as comma-separated string
  aiHint: string;
};

export default function ManageBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        const storedPosts = localStorage.getItem("blogPosts");
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        } else {
            setPosts(initialBlogPosts);
        }
    }, []);

    const handleSave = (postData: Omit<BlogPost, 'id' | 'date'> & { id?: number }) => {
        let updatedPosts;
        if (editingPost) {
            updatedPosts = posts.map(p => p.id === editingPost.id ? { ...editingPost, ...postData } : p);
        } else {
            const newPost: BlogPost = {
                id: Date.now(),
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                ...postData,
            } as BlogPost;
            updatedPosts = [...posts, newPost];
        }
        setPosts(updatedPosts);
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
        setIsDialogOpen(false);
        setEditingPost(null);
    };

    const handleDelete = (id: number) => {
        const updatedPosts = posts.filter(p => p.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    };

    const openDialogForEdit = (post: BlogPost) => {
        setEditingPost(post);
        setIsDialogOpen(true);
    };

    const openDialogForNew = () => {
        setEditingPost(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CardTitle>Manage Blog</CardTitle>
                        <CardDescription>Create, edit, or delete blog posts.</CardDescription>
                    </div>
                    <Button onClick={openDialogForNew} className="w-full md:w-auto"><PlusCircle className="mr-2 h-4 w-4" />Add New Post</Button>
                </CardHeader>
                <CardContent>
                    {/* Desktop Table View */}
                    <Table className="hidden md:table">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <Image src={post.image} alt={post.title} width={80} height={60} className="rounded-md object-cover" />
                                    </TableCell>
                                    <TableCell className="font-medium max-w-sm truncate">{post.title}</TableCell>
                                    <TableCell>{post.date}</TableCell>
                                    <TableCell className="text-right">
                                        <ActionsDropdown post={post} onEdit={openDialogForEdit} onDelete={handleDelete} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    
                    {/* Mobile Card View */}
                    <div className="grid gap-4 md:hidden">
                        {posts.map((post) => (
                            <Card key={post.id}>
                                <CardHeader className="flex flex-row items-center justify-between p-4">
                                     <div className="flex items-center gap-4">
                                        <Image src={post.image} alt={post.title} width={60} height={45} className="rounded-md object-cover" />
                                        <div>
                                            <CardTitle className="text-base leading-tight">{post.title}</CardTitle>
                                            <CardDescription className="text-xs">{post.date}</CardDescription>
                                        </div>
                                    </div>
                                    <ActionsDropdown post={post} onEdit={openDialogForEdit} onDelete={handleDelete} />
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <PostFormDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSave}
                post={editingPost}
            />
        </div>
    )
}

function ActionsDropdown({ post, onEdit, onDelete }: { post: BlogPost, onEdit: (post: BlogPost) => void, onDelete: (id: number) => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(post)}>
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
                                This action cannot be undone. This will permanently delete the blog post.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(post.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function PostFormDialog({ isOpen, onOpenChange, onSave, post }: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSave: (data: Omit<BlogPost, 'id' | 'date'>) => void;
    post: BlogPost | null;
}) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        tags: '',
        aiHint: '',
    });

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                description: post.description,
                image: post.image,
                tags: post.tags,
                aiHint: post.aiHint,
            });
        } else {
            // Reset for new post
            setFormData({ title: '', description: '', image: 'https://picsum.photos/seed/new/600/400', tags: '', aiHint: '' });
        }
    }, [post, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>{post ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
                    <DialogDescription>
                        Fill in the details below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right pt-2">Description</Label>
                        <Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image URL</Label>
                        <Input id="image" value={formData.image} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tags" className="text-right">Tags</Label>
                        <Input id="tags" placeholder="Comma-separated" value={formData.tags} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="aiHint" className="text-right">AI Hint</Label>
                        <Input id="aiHint" value={formData.aiHint} onChange={handleChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

