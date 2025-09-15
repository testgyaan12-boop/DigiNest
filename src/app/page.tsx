
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppWindow, Code, BrainCircuit, Brush } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: "Sarah L.",
    role: "CEO of Tech-Nex",
    avatar: "https://picsum.photos/seed/sarah/128/128",
    aiHint: "business woman",
    review: "Novasuites revolutionized our development process. The platform is intuitive, powerful, and has everything we need to build and scale our products. We've cut our development time in half!"
  },
  {
    name: "Michael B.",
    role: "Lead Developer at Innovate Co.",
    avatar: "https://picsum.photos/seed/michael/128/128",
    aiHint: "male developer",
    review: "As a developer, I appreciate the clean code, modern stack, and the seamless integration with Genkit. It makes building AI-powered features a breeze. Highly recommended!"
  },
  {
    name: "David Chen",
    role: "Founder of Creative Solutions",
    avatar: "https://picsum.photos/seed/david/128/128",
    aiHint: "startup founder",
    review: "The UI/UX toolkit is fantastic. With the pre-built components and intuitive design system, we were able to create a beautiful and functional interface in record time. A game-changer for our startup."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  The Ultimate Platform for Modern Application Development
                </h1>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Our unified platform provides top-tier tools and services to bring your digital products to life, faster and more efficiently than ever before.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/services">Get Started</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/portfolio">View Showcase</Link>
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

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
                Core Features
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
                From backend logic to frontend magic, our platform has you covered.
            </p>
            <Tabs defaultValue="web-dev" className="mt-12">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-0">
                    <TabsTrigger value="web-dev" className="flex-col sm:flex-row">
                        <AppWindow className="mr-0 mb-2 sm:mr-2 sm:mb-0" />
                        Web Apps
                    </TabsTrigger>
                    <TabsTrigger value="api-dev" className="flex-col sm:flex-row">
                        <Code className="mr-0 mb-2 sm:mr-2 sm:mb-0" />
                        APIs
                    </TabsTrigger>
                    <TabsTrigger value="ui-ux" className="flex-col sm:flex-row">
                        <Brush className="mr-0 mb-2 sm:mr-2 sm:mb-0" />
                        UI/UX
                    </TabsTrigger>
                    <TabsTrigger value="ai-integration" className="flex-col sm:flex-row">
                        <BrainCircuit className="mr-0 mb-2 sm:mr-2 sm:mb-0" />
                        AI
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="web-dev">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seamless Frontend Development</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                           <p>Build responsive, dynamic, and scalable web applications. Our platform leverages the latest technologies like React and Next.js to help you create fast, modern, and user-friendly experiences that work perfectly on any device.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="api-dev">
                    <Card>
                        <CardHeader>
                            <CardTitle>Robust API Engine</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <p>Design and implement robust and scalable RESTful and GraphQL APIs. A well-structured API is the backbone of any great application, and our tools ensure yours is secure, efficient, and easy to integrate.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="ui-ux">
                    <Card>
                        <CardHeader>
                            <CardTitle>Intuitive UI/UX Toolkit</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <p>Create intuitive and visually appealing user interfaces. Our focus is on clean, modern design that is both beautiful and functional, ensuring your users love interacting with your product. Access a rich library of pre-built components.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="ai-integration">
                    <Card>
                        <CardHeader>
                            <CardTitle>Powerful AI Integrations</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                           <p>Integrate cutting-edge AI solutions into your products to enhance functionality. From chatbots to data analysis, our platform helps you leverage the power of AI to create smarter, more personalized applications.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
            Hear from the people who trust our platform to power their applications.
          </p>
          <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col">
                <CardContent className="pt-6 flex-grow">
                  <p className="text-muted-foreground">"{testimonial.review}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.aiHint} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
