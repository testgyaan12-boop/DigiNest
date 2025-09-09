'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Copy, Gift } from 'lucide-react';

const referralLink = 'https://monetize.ai/signup?ref=user12345';

const referredUsers = [
  { email: 'friend1@example.com', date: '2024-05-10', status: 'Subscribed' },
  { email: 'colleague2@work.com', date: '2024-05-08', status: 'Pending' },
  { email: 'newcontact@domain.com', date: '2024-05-05', status: 'Subscribed' },
  { email: 'test.user@email.com', date: '2024-04-28', status: 'Expired' },
];

export default function ReferralsPage() {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: 'Copied to Clipboard!',
      description: 'Your referral link is ready to be shared.',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Referral Program</h1>
        <p className="text-muted-foreground">Share MonetizeAI and earn rewards for every new subscriber.</p>
      </div>

      <Card className="bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="mr-2 h-6 w-6" />
            Share & Earn
          </CardTitle>
        </CardHeader>
        <CardContent>
            <p>Give your friends one month free of MonetizeAI Pro. For every friend who subscribes, you'll get a $10 credit towards your own subscription.</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>Share this unique link with your friends and network.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <Input type="text" value={referralLink} readOnly />
              <Button type="button" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Referrals</CardTitle>
            <CardDescription>Number of users who signed up.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">2 successful subscriptions this month.</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Referred Users</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referredUsers.map((user) => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.date}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Subscribed' ? 'default' : 'secondary'}
                        className={user.status === 'Subscribed' ? 'bg-green-500/20 text-green-700 border-green-500/30' : (user.status === 'Expired' ? 'bg-red-500/10 text-red-700 border-red-500/20' : '')}>
                      {user.status}
                    </Badge>
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
