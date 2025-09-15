import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Mission</h1>
          <p className="text-muted-foreground md:text-xl/relaxed">
            We are a passionate team of software developers and designers with a knack for building beautiful, functional, and scalable applications. With years of experience in the industry, we have a deep understanding of modern web technologies and a commitment to writing clean, efficient code.
          </p>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Our journey began with a fascination for how things work, which quickly blossomed into a company dedicated to creating elegant digital experiences. We empower businesses and developers by providing a platform that accelerates development and elevates product quality.
          </p>
           <p className="text-muted-foreground md:text-xl/relaxed">
            We thrive on challenges, are always eager to innovate, and believe in the power of collaboration to build amazing products that shape the future.
          </p>
        </div>
        <div className="flex justify-center">
            <Avatar className="h-48 w-48 sm:h-64 sm:w-64">
                <AvatarImage src="https://picsum.photos/seed/company/256/256" data-ai-hint="company logo" />
                <AvatarFallback>DP</AvatarFallback>
            </Avatar>
        </div>
      </div>
    </div>
  );
}
