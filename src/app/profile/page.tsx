'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface User {
    name: string;
    email: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if no user is found
            window.location.href = '/login';
        }
    }, []);

    const handleSave = () => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
            setIsEditing(false);
        }
    }

    if (!user) {
        return (
             <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="container py-12 md:py-24">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src={`https://picsum.photos/seed/${user.email}/128/128`} data-ai-hint="user avatar" />
                        <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="mt-6 space-y-6">
                    {isEditing ? (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={handleSave} className="w-full">Save</Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full">Cancel</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <h3 className="font-semibold">Bio</h3>
                                <p className="text-muted-foreground">
                                    A passionate developer changing the world one line of code at a time. I specialize in building scalable web applications with modern technologies.
                                </p>
                            </div>
                             <div>
                                <h3 className="font-semibold">Details</h3>
                                <ul className="list-disc list-inside text-muted-foreground">
                                    <li>Based in San Francisco, CA</li>
                                    <li>Joined in {new Date().getFullYear()}</li>
                                </ul>
                            </div>
                            <Button onClick={() => setIsEditing(true)} className="w-full">Edit Profile</Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
