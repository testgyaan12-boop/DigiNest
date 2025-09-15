import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, AppWindow, Database, Server, Brush, BrainCircuit } from "lucide-react";

const services = [
  {
    icon: <AppWindow className="h-8 w-8" />,
    title: "Web Application Development",
    description: "Building responsive and dynamic web applications tailored to your business needs using the latest technologies like Next.js and React.",
    category: "development",
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "API Development",
    description: "Designing and implementing robust and scalable RESTful and GraphQL APIs that form the backbone of your applications.",
    category: "development",
  },
    {
    icon: <BrainCircuit className="h-8 w-8" />,
    title: "AI Integration",
    description: "Integrating cutting-edge AI solutions like generative models and intelligent agents to enhance functionality and user engagement.",
    category: "development",
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Database Design & Management",
    description: "Expertise in designing and managing both SQL and NoSQL databases for optimal performance, reliability, and scalability.",
    category: "development",
  },
    {
    icon: <Brush className="h-8 w-8" />,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces that provide an excellent user experience and drive engagement.",
    category: "design",
  },
    {
    icon: <Server className="h-8 w-8" />,
    title: "DevOps & Cloud Deployment",
    description: "Automating development pipelines and deploying applications to cloud platforms like Vercel, AWS, and Google Cloud.",
    category: "operations",
  },
];

const developmentServices = services.filter(s => s.category === 'development');
const designServices = services.filter(s => s.category === 'design');
const operationsServices = services.filter(s => s.category === 'operations');

const ServiceCard = ({ service }: { service: typeof services[0] }) => (
    <Card>
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
);

const ServiceCategory = ({ title, services }: { title: string, services: typeof developmentServices }) => (
    <div>
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl mb-8">{title}</h2>
        <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
            ))}
        </div>
    </div>
);


export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">My Services</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        Here's what I can do for you. I offer a range of services to help you achieve your goals.
      </p>

      {/* Mobile View - Stacked Sections */}
      <div className="mt-12 space-y-16 md:hidden">
          <ServiceCategory title="Development" services={developmentServices} />
          <ServiceCategory title="Design" services={designServices} />
          <ServiceCategory title="Operations" services={operationsServices} />
      </div>

      {/* Desktop View - Tabs */}
      <Tabs defaultValue="development" className="mt-12 hidden md:block">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 md:w-auto mx-auto">
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>
        <TabsContent value="development">
            <div className="grid gap-8 mt-8 md:grid-cols-2">
                {developmentServices.map((service) => (
                    <ServiceCard key={service.title} service={service} />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="design">
            <div className="grid gap-8 mt-8 md:grid-cols-2">
                {designServices.map((service) => (
                    <ServiceCard key={service.title} service={service} />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="operations">
            <div className="grid gap-8 mt-8 md:grid-cols-2">
                {operationsServices.map((service) => (
                    <ServiceCard key={service.title} service={service} />
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
