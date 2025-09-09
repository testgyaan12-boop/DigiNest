import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

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
    cta: 'Downgrade to Starter',
    variant: 'outline',
    current: false,
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
    cta: 'Your Current Plan',
    variant: 'default',
    popular: true,
    current: true,
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
    current: false,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Manage Your Subscription</h1>
        <p className="text-muted-foreground">Choose the plan that's right for you. Upgrade, downgrade, or cancel anytime.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              <Button className="w-full" variant={tier.variant as any} disabled={tier.current}>
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card className="bg-secondary/50">
          <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <h3 className="font-semibold">Can I cancel my subscription at any time?</h3>
                  <p className="text-sm text-muted-foreground">Yes, you can cancel your subscription at any time. Your plan will remain active until the end of the current billing period.</p>
              </div>
               <div>
                  <h3 className="font-semibold">What happens when I exceed my monthly limits?</h3>
                  <p className="text-sm text-muted-foreground">You will be notified and given the option to upgrade your plan to continue using the service without interruption.</p>
              </div>
               <div>
                  <h3 className="font-semibold">Do you offer discounts for annual billing?</h3>
                  <p className="text-sm text-muted-foreground">Yes, we offer a 20% discount on all plans when billed annually. You can select this option during checkout.</p>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
