import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">About Me</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            I'm a passionate software developer with a knack for building beautiful, functional, and scalable applications. With years of experience in the field, I have a deep understanding of modern web technologies and a commitment to writing clean, efficient code.
          </p>
          <p className="mt-4 text-muted-foreground md:text-xl">
            My goal is to translate your vision into a high-quality product that not only meets your requirements but also exceeds your expectations. I thrive on challenges and am always eager to learn new things.
          </p>
        </div>
        <div className="flex justify-center">
            <Avatar className="h-64 w-64">
                <AvatarImage src="https://picsum.photos/seed/dev/256/256" data-ai-hint="professional portrait" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
        </div>
      </div>
    </div>
  );
}
