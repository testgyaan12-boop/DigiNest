
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialContent = {
    title: "Our Mission",
    paragraph1: "We are a passionate team of software developers and designers with a knack for building beautiful, functional, and scalable applications. With years of experience in the industry, we have a deep understanding of modern web technologies and a commitment to writing clean, efficient code.",
    paragraph2: "Our journey began with a fascination for how things work, which quickly blossomed into a company dedicated to creating elegant digital experiences. We empower businesses and developers by providing a platform that accelerates development and elevates product quality.",
    paragraph3: "We thrive on challenges, are always eager to innovate, and believe in the power of collaboration to build amazing products that shape the future.",
    imageUrl: "https://picsum.photos/seed/company/256/256",
};


export default function ManageAboutPage() {
    const [formData, setFormData] = useState(initialContent);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const storedContent = localStorage.getItem('aboutPageContent');
        if (storedContent) {
            setFormData(JSON.parse(storedContent));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        localStorage.setItem('aboutPageContent', JSON.stringify(formData));
        setTimeout(() => {
            setIsSaving(false);
            // In a real app you might show a toast notification here
        }, 1000);
    };

    return (
        <div className="p-4 md:p-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Manage About Page</CardTitle>
                    <CardDescription>Edit the content of your public 'About Us' page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Headline Title</Label>
                        <Input id="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="paragraph1">First Paragraph</Label>
                        <Textarea id="paragraph1" value={formData.paragraph1} onChange={handleChange} rows={4} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="paragraph2">Second Paragraph</Label>
                        <Textarea id="paragraph2" value={formData.paragraph2} onChange={handleChange} rows={4} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="paragraph3">Third Paragraph</Label>
                        <Textarea id="paragraph3" value={formData.paragraph3} onChange={handleChange} rows={4} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input id="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
