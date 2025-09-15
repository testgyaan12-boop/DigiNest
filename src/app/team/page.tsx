import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  {
    name: "John Doe",
    role: "Co-Founder & CEO",
    avatar: "https://picsum.photos/seed/john/128/128",
    bio: "The visionary and lead architect of our platform. John has over 10 years of experience turning complex problems into elegant software solutions.",
    aiHint: "professional man",
  },
  {
    name: "Jane Smith",
    role: "Co-Founder & Head of Design",
    avatar: "https://picsum.photos/seed/jane/128/128",
    bio: "Jane is the creative mind behind our user interfaces. She turns complex problems into beautiful and intuitive designs that users love.",
    aiHint: "professional woman",
  },
  {
    name: "Mike Johnson",
    role: "Lead Backend Engineer",
    avatar: "https://picsum.photos/seed/mike/128/128",
    bio: "Mike ensures our platform is fast, scalable, and secure. He's a wizard with databases, server-side logic, and cloud infrastructure.",
    aiHint: "developer portrait",
  },
    {
    name: "Emily White",
    role: "Lead Frontend Developer",
    avatar: "https://picsum.photos/seed/emily/128/128",
    bio: "Emily brings designs to life with her expertise in modern frontend frameworks. She has a passion for pixel-perfect UIs and a keen eye for detail.",
    aiHint: "smiling woman",
  },
];

export default function TeamPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">Meet the Leadership</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        We are a team of passionate developers and designers dedicated to building the best development platform.
      </p>
      <div className="grid gap-8 mt-12 md:grid-cols-2">
        {teamMembers.map((member) => (
          <Card key={member.name} className="flex flex-col sm:flex-row items-center text-center sm:text-left">
            <CardHeader className="p-4 sm:p-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={member.avatar} data-ai-hint={member.aiHint} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <div className="p-4 sm:p-6 sm:pl-0">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="mb-2">{member.role}</CardDescription>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
