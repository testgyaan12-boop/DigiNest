import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, AppWindow, Database, Server, Brush, BrainCircuit } from "lucide-react";

const services = [
  {
    icon: <AppWindow />,
    title: "Web Application Development",
    description: "Building responsive and dynamic web applications tailored to your business needs using the latest technologies.",
    category: "development",
  },
  {
    icon: <Code />,
    title: "API Development",
    description: "Designing and implementing robust and scalable RESTful and GraphQL APIs for your applications.",
    category: "development",
  },
  {
    icon: <Database />,
    title: "Database Design & Management",
    description: "Expertise in designing and managing both SQL and NoSQL databases for optimal performance and reliability.",
    category: "development",
  },
    {
    icon: <Brush />,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces that provide an excellent user experience.",
    category: "design",
  },
    {
    icon: <Server />,
    title: "DevOps & Cloud Deployment",
    description: "Automating workflows and deploying applications to cloud platforms like AWS, Google Cloud, and Vercel.",
    category: "operations",
  },
  {
    icon: <BrainCircuit />,
    title: "AI Integration",
    description: "Integrating cutting-edge AI solutions into your products to enhance functionality and user engagement.",
    category: "development",
  },
];

const developmentServices = services.filter(s => s.category === 'development');
const designServices = services.filter(s => s.category === 'design');
const operationsServices = services.filter(s => s.category === 'operations');


export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">My Services</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        Here's what I can do for you. I offer a range of services to help you achieve your goals.
      </p>

      <Tabs defaultValue="development" className="mt-12">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 md:w-auto mx-auto">
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>
        <TabsContent value="development">
            <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {developmentServices.map((service) => (
                <Card key={service.title}>
                    <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        {service.icon}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="design">
            <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {designServices.map((service) => (
                <Card key={service.title}>
                    <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        {service.icon}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="operations">
            <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {operationsServices.map((service) => (
                <Card key={service.title}>
                    <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md">
                        {service.icon}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}