import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const recentContent = [
  { title: 'The Future of AI in Marketing', date: '2024-05-20', status: 'Published' },
  { title: '10 Tips for Better SEO', date: '2024-05-18', status: 'Draft' },
  { title: 'How to Monetize Your Blog', date: '2024-05-15', status: 'Published' },
  { title: 'A Guide to Passive Income', date: '2024-05-12', status: 'Archived' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome Back!</h1>
          <p className="text-muted-foreground">Here's a snapshot of your account activity.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/content">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Content
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Articles Generated</CardTitle>
            <CardDescription>Your monthly usage for the Pro plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">28</span>
              <span className="text-muted-foreground">/ 50</span>
            </div>
            <Progress value={56} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SEO Analyses</CardTitle>
            <CardDescription>Your monthly usage for the Pro plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">67</span>
              <span className="text-muted-foreground">/ 100</span>
            </div>
            <Progress value={67} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>Your are currently on the Pro plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-headline text-primary">Pro</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/subscription">
                  Manage Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Next renewal: June 15, 2024</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Recent Content</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentContent.map((item) => (
                <TableRow key={item.title}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}
                        className={item.status === 'Published' ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}>
                        {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
