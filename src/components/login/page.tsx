
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('m@example.com');
  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    // In a real app, you'd perform authentication here
    // For demo purposes, we allow a specific admin user
    const user = { name: email === 'admin@example.com' ? 'Admin User' : 'Test User', email };
    localStorage.setItem('user', JSON.stringify(user));
    
    if (user.email === 'admin@example.com') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/'; // Redirect to homepage to reflect login state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account. <br />
            (Use <b>admin@example.com</b> for admin access)
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-6"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOff /> : <Eye />}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleLogin}>Sign in</Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
