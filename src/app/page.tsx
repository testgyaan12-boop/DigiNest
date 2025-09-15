
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppWindow, Code, BrainCircuit, Brush } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
                  <Link href="/about">Learn More</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/blog">My Blog</Link>
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
                My Expertise
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-center text-muted-foreground md:text-xl">
                From backend logic to frontend magic, I've got you covered.
            </p>
            <Tabs defaultValue="web-dev" className="mt-12">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 md:w-auto mx-auto h-auto">
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
                            <CardTitle>Web Application Development</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                           <p>I build responsive, dynamic, and scalable web applications tailored to your business needs. Using the latest technologies like React and Next.js, I create fast, modern, and user-friendly experiences that work perfectly on any device.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="api-dev">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Development</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <p>I design and implement robust and scalable RESTful and GraphQL APIs. A well-structured API is the backbone of any great application, and I ensure yours is secure, efficient, and easy to integrate with any frontend or service.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="ui-ux">
                    <Card>
                        <CardHeader>
                            <CardTitle>UI/UX Design</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <p>I create intuitive and visually appealing user interfaces that provide an excellent user experience. My focus is on clean, modern design that is both beautiful and functional, ensuring your users love interacting with your product.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="ai-integration">
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Integration</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                           <p>I can integrate cutting-edge AI solutions into your products to enhance functionality and user engagement. From chatbots to data analysis, I can help you leverage the power of AI to create smarter, more personalized applications.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </section>
    </div>
  );
}
