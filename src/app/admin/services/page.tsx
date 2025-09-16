
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, AppWindow, Code, BrainCircuit, Database, Brush, Server } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialServices = [
  {
    id: 1,
    title: "Web Application Development",
    description: "Building responsive and dynamic web applications tailored to your business needs using the latest technologies like Next.js and React.",
    icon: "AppWindow",
  },
  {
    id: 2,
    title: "API Development",
    description: "Designing and implementing robust and scalable RESTful and GraphQL APIs that form the backbone of your applications.",
    icon: "Code",
  },
  {
    id: 3,
    title: "AI Integration",
    description: "Integrating cutting-edge AI solutions like generative models and intelligent agents to enhance functionality and user engagement.",
    icon: "BrainCircuit",
  },
  {
    id: 4,
    title: "Database Design & Management",
    description: "Expertise in designing and managing both SQL and NoSQL databases for optimal performance, reliability, and scalability.",
    icon: "Database",
  },
  {
    id: 5,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces that provide an excellent user experience and drive engagement.",
    icon: "Brush",
  },
  {
    id: 6,
    title: "DevOps & Cloud Deployment",
    description: "Automating development pipelines and deploying applications to cloud platforms like Vercel, AWS, and Google Cloud.",
    icon: "Server",
  },
];

const icons: { [key: string]: React.ElementType } = {
    AppWindow,
    Code,
    BrainCircuit,
    Database,
    Brush,
    Server,
};

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export default function ManageServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    useEffect(() => {
        const storedServices = localStorage.getItem("services");
        if (storedServices) {
            setServices(JSON.parse(storedServices));
        } else {
            setServices(initialServices);
        }
    }, []);

    const handleSave = (serviceData: Omit<Service, 'id'> & { id?: number }) => {
        let updatedServices;
        if (editingService) {
            updatedServices = services.map(s => s.id === editingService.id ? { ...editingService, ...serviceData } : s);
        } else {
            const newService: Service = {
                id: Date.now(),
                ...serviceData,
            } as Service;
            updatedServices = [...services, newService];
        }
        setServices(updatedServices);
        localStorage.setItem("services", JSON.stringify(updatedServices));
        setIsDialogOpen(false);
        setEditingService(null);
    };

    const handleDelete = (id: number) => {
        const updatedServices = services.filter(s => s.id !== id);
        setServices(updatedServices);
        localStorage.setItem("services", JSON.stringify(updatedServices));
    };

    const openDialogForEdit = (service: Service) => {
        setEditingService(service);
        setIsDialogOpen(true);
    };

    const openDialogForNew = () => {
        setEditingService(null);
        setIsDialogOpen(true);
    };

    const getIconComponent = (iconName: string) => {
        const Icon = icons[iconName];
        return Icon ? <Icon className="h-6 w-6" /> : null;
    }

    return (
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CardTitle>Manage Services</CardTitle>
                        <CardDescription>Add, edit, or remove the services you offer.</CardDescription>
                    </div>
                    <Button onClick={openDialogForNew} className="w-full md:w-auto"><PlusCircle className="mr-2 h-4 w-4" />Add New Service</Button>
                </CardHeader>
                <CardContent>
                    {/* Desktop Table View */}
                    <Table className="hidden md:table">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Icon</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell>{getIconComponent(service.icon)}</TableCell>
                                    <TableCell className="font-medium">{service.title}</TableCell>
                                    <TableCell className="max-w-md truncate">{service.description}</TableCell>
                                    <TableCell className="text-right">
                                        <ActionsDropdown service={service} onEdit={openDialogForEdit} onDelete={handleDelete} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    
                    {/* Mobile Card View */}
                    <div className="grid gap-4 md:hidden">
                        {services.map((service) => (
                            <Card key={service.id}>
                                <CardHeader className="flex flex-row items-center justify-between p-4">
                                     <div className="flex items-center gap-4">
                                        {getIconComponent(service.icon)}
                                        <div>
                                            <CardTitle className="text-base">{service.title}</CardTitle>
                                        </div>
                                    </div>
                                    <ActionsDropdown service={service} onEdit={openDialogForEdit} onDelete={handleDelete} />
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <ServiceFormDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSave}
                service={editingService}
            />
        </div>
    )
}

function ActionsDropdown({ service, onEdit, onDelete }: { service: Service, onEdit: (service: Service) => void, onDelete: (id: number) => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(service)}>
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
                                This action cannot be undone. This will permanently delete the service.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(service.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ServiceFormDialog({ isOpen, onOpenChange, onSave, service }: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSave: (data: Omit<Service, 'id'>) => void;
    service: Service | null;
}) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'AppWindow',
    });

    useEffect(() => {
        if (service) {
            setFormData({
                title: service.title,
                description: service.description,
                icon: service.icon,
            });
        } else {
            // Reset for new service
            setFormData({ title: '', description: '', icon: 'AppWindow' });
        }
    }, [service, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleIconChange = (value: string) => {
        setFormData(prev => ({ ...prev, icon: value }))
    }

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                    <DialogDescription>
                        Fill in the details below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="icon" className="text-right">Icon</Label>
                         <Select value={formData.icon} onValueChange={handleIconChange}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select an icon" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(icons).map(iconName => (
                                    <SelectItem key={iconName} value={iconName}>
                                        <div className="flex items-center gap-2">
                                            {React.createElement(icons[iconName], { className: "h-4 w-4"})}
                                            <span>{iconName}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

    