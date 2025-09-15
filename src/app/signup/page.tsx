'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = () => {
        // In a real app, you'd perform registration here
        localStorage.setItem('user', JSON.stringify({ name: 'Your Name', email: 'm@example.com' }));
        window.location.href = '/'; // Redirect to homepage to reflect login state
    };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
           <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Your Name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type={showPassword ? "text" : "password"} required />
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
          <Button className="w-full" onClick={handleSignUp}>Create Account</Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
