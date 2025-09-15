import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  {
    name: "John Doe",
    role: "Lead Developer",
    avatar: "https://picsum.photos/seed/john/128/128",
    bio: "The visionary and lead architect of our projects. John has over 10 years of experience in software development.",
    aiHint: "professional man",
  },
  {
    name: "Jane Smith",
    role: "UI/UX Designer",
    avatar: "https://picsum.photos/seed/jane/128/128",
    bio: "Jane is the creative mind behind our user interfaces. She turns complex problems into beautiful and intuitive designs.",
    aiHint: "professional woman",
  },
  {
    name: "Mike Johnson",
    role: "Backend Engineer",
    avatar: "https://picsum.photos/seed/mike/128/128",
    bio: "Mike ensures our applications are fast, scalable, and secure. He's a wizard with databases and server-side logic.",
    aiHint: "developer portrait",
  },
    {
    name: "Emily White",
    role: "Frontend Developer",
    avatar: "https://picsum.photos/seed/emily/128/128",
    bio: "Emily brings designs to life with her expertise in modern frontend frameworks and her passion for pixel-perfect UIs.",
    aiHint: "smiling woman",
  },
];

export default function TeamPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-center sm:text-5xl">Meet the Team</h1>
      <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
        We are a small but mighty team of passionate developers and designers.
      </p>
      <div className="grid gap-8 mt-12 md:grid-cols-2">
        {teamMembers.map((member) => (
          <Card key={member.name}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={member.avatar} data-ai-hint={member.aiHint} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{member.name}</CardTitle>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
