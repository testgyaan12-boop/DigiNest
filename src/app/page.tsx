import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Build, Test, and Deploy with Confidence
                </h1>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Your journey to creating amazing software starts here. I provide top-tier development services to bring your ideas to life.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <a href="/about">Learn More</a>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <a href="/contact">Contact Me</a>
                </Button>
              </div>
            </div>
            <Image
              src="https://picsum.photos/seed/1/600/400"
              width={600}
              height={400}
              alt="Hero"
              data-ai-hint="abstract code"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
