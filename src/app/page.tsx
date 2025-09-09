import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Bot, BarChart, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Content Generation',
    description: 'Generate high-quality articles, blog posts, and marketing copy in seconds with our advanced AI.',
  },
  {
    icon: <Gem className="h-8 w-8 text-primary" />,
    title: 'SEO Optimization',
    description: 'Analyze your content and get AI-powered suggestions for keywords to rank higher on search engines.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Analytics Dashboard',
    description: 'Track your traffic, user engagement, and conversion rates with our intuitive analytics dashboard.',
  },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: '$0',
    period: '/ month',
    description: 'For individuals and hobbyists getting started.',
    features: [
      '5 AI articles per month',
      '10 SEO analyses per month',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started for Free',
    variant: 'outline',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ month',
    description: 'For professionals and small businesses.',
    features: [
      '50 AI articles per month',
      '100 SEO analyses per month',
      'Advanced analytics',
      'Priority email support',
      'Referral program access',
    ],
    cta: 'Upgrade to Pro',
    variant: 'default',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large teams and agencies with custom needs.',
    features: [
      'Unlimited AI articles',
      'Unlimited SEO analyses',
      'Custom analytics & reporting',
      'Dedicated account manager',
      'API access',
    ],
    cta: 'Contact Sales',
    variant: 'outline',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-headline text-xl font-semibold">MonetizeAI</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Log In</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90">
              <Link href="/dashboard">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 -z-10 h-full w-full bg-background"
          >
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(240,194,10,0.5)] opacity-50 blur-[80px]"></div>
          </div>
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Monetize Your Content with <span className="text-primary">AI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Unlock your earning potential. Generate SEO-optimized content, analyze performance, and watch your traffic grow.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard">
                  Start Generating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 sm:py-24">
          <div className="container">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold sm:text-4xl">Why MonetizeAI?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Everything you need to create valuable content and turn it into a revenue stream.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col items-center text-center p-6">
                  {feature.icon}
                  <CardTitle className="mt-4 font-headline text-xl font-semibold">{feature.title}</CardTitle>
                  <CardDescription className="mt-2">{feature.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-secondary/50 py-16 sm:py-24">
           <div className="container grid lg:grid-cols-2 lg:gap-12 items-center">
             <div className="mb-8 lg:mb-0">
                <Image 
                  src="https://picsum.photos/600/500"
                  alt="AI Content Editor"
                  width={600}
                  height={500}
                  data-ai-hint="digital dashboard"
                  className="rounded-lg shadow-2xl"
                />
             </div>
             <div>
                <h2 className="font-headline text-3xl font-bold sm:text-4xl">From Idea to Income, Faster Than Ever</h2>
                <p className="mt-4 text-muted-foreground">Stop waiting for inspiration. Our AI tools help you brainstorm, write, and optimize content that attracts audiences and algorithms alike. Focus on your ideas, we'll handle the rest.</p>
                <Button size="lg" asChild className="mt-6">
                    <Link href="/dashboard/content">Try the Content Generator</Link>
                </Button>
             </div>
           </div>
        </section>

        <section id="pricing" className="py-16 sm:py-24">
          <div className="container">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold sm:text-4xl">Find the Perfect Plan</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Start for free and scale as you grow. All plans include our core AI features.
              </p>
            </div>
            <div className="mt-12 grid max-w-5xl mx-auto gap-8 md:grid-cols-3">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-primary ring-2 ring-primary' : ''}`}>
                  {tier.popular && (
                    <div className="py-1 px-4 bg-primary text-primary-foreground text-sm font-semibold rounded-t-lg text-center">Most Popular</div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline">{tier.name}</CardTitle>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                      {tier.period && <span className="ml-1 text-muted-foreground">{tier.period}</span>}
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" variant={tier.variant as any}>
                      <Link href="/dashboard">{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} MonetizeAI. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
             <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
