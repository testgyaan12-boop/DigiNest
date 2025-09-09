'use client';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Sector, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

const trafficData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const trafficChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const engagementData = [
    { page: '/blog/ai-future', views: 275, engagement: 85 },
    { page: '/blog/seo-tips', views: 420, engagement: 92 },
    { page: '/blog/monetization', views: 150, engagement: 70 },
    { page: '/features', views: 310, engagement: 65 },
    { page: '/pricing', views: 520, engagement: 45 },
]

const engagementChartConfig = {
    views: {
        label: 'Page Views',
        color: 'hsl(var(--chart-1))'
    },
    engagement: {
        label: 'Engagement (%)',
        color: 'hsl(var(--chart-2))'
    }
} satisfies ChartConfig

const conversionData = [
  { plan: 'Starter', users: 275, fill: 'hsl(var(--chart-1))' },
  { plan: 'Pro', users: 187, fill: 'hsl(var(--chart-2))' },
  { plan: 'Enterprise', users: 55, fill: 'hsl(var(--chart-3))' },
]

const conversionChartConfig = {
  users: {
    label: "Users",
  },
  starter: {
    label: "Starter",
    color: "hsl(var(--chart-1))",
  },
  pro: {
    label: "Pro",
    color: "hsl(var(--chart-2))",
  },
  enterprise: {
    label: "Enterprise",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your content performance and user engagement.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Traffic</CardTitle>
          <CardDescription>Monthly visitors by device type</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={trafficChartConfig} className="h-[300px] w-full">
            <LineChart data={trafficData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
              <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
               <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Content Engagement</CardTitle>
            <CardDescription>Views and engagement rate per page</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={engagementChartConfig} className="h-[300px] w-full">
              <BarChart data={engagementData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="page" type="category" tickLine={false} axisLine={false} tickMargin={8} width={120} />
                <XAxis type="number" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="views" fill="var(--color-views)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Conversions</CardTitle>
            <CardDescription>Distribution of users across subscription plans</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={conversionChartConfig} className="h-[300px] w-full">
              <PieChart>
                 <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={conversionData} dataKey="users" nameKey="plan" innerRadius={60} />
                <ChartLegend content={<ChartLegendContent nameKey="plan" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"/>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
