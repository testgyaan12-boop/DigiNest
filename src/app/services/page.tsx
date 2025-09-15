import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, AppWindow, Database, Server, Brush } from "lucide-react";

const services = [
  {
    icon: <AppWindow />,
    title: "Web Application Development",
    description: "Building responsive and dynamic web applications tailored to your business needs using the latest technologies.",
  },
  {
    icon: <Code />,
    title: "API Development",
    description: "Designing and implementing robust and scalable RESTful and GraphQL APIs for your applications.",
  },
  {
    icon: <Database />,
    title: "Database Design & Management",
    description: "Expertise in designing and managing both SQL and NoSQL databases for optimal performance and reliability.",
  },
  {
    icon: <Server />,
    title: "DevOps & Cloud Deployment",
    description: "Automating workflows and deploying applications to cloud platforms like AWS, Google Cloud, and Vercel.",
  },
    {
    icon: <Brush />,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces that provide an excellent user experience.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">My Services</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        Here's what I can do for you. I offer a range of services to help you achieve your goals.
      </p>
      <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
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
    </div>
  );
}
