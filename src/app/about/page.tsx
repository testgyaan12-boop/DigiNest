import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">About Me</h1>
          <p className="text-muted-foreground md:text-xl/relaxed">
            I'm a passionate software developer with a knack for building beautiful, functional, and scalable applications. With years of experience in the field, I have a deep understanding of modern web technologies and a commitment to writing clean, efficient code.
          </p>
          <p className="text-muted-foreground md:text-xl/relaxed">
            My journey into code began with a fascination for how things work, which quickly blossomed into a career dedicated to creating elegant digital experiences. I thrive on challenges, am always eager to learn new things, and believe in the power of collaboration to build amazing products.
          </p>
           <p className="text-muted-foreground md:text-xl/relaxed">
            When I'm not coding, you can find me exploring new hiking trails, experimenting with new recipes in the kitchen, or diving into a good sci-fi novel.
          </p>
        </div>
        <div className="flex justify-center">
            <Avatar className="h-48 w-48 sm:h-64 sm:w-64">
                <AvatarImage src="https://picsum.photos/seed/dev/256/256" data-ai-hint="professional portrait" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
        </div>
      </div>
    </div>
  );
}
