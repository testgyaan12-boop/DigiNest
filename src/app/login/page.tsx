
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks";
import { Toaster } from "@/components/ui/toaster";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', {
        userId,
        password,
      });

      if (response.status === 'SUCCESS' && response.jwttoken) {
        localStorage.setItem('jwttoken', response.jwttoken);
        localStorage.setItem('user', JSON.stringify({ name: response.userId, userId: response.userId }));
        
        // Check for special admin user
        if (userId === 'admin@example.com' || userId === 'admin') {
            localStorage.setItem('isAdmin', 'true');
            window.location.href = '/admin';
        } else {
            window.location.href = '/'; // Redirect to homepage
        }
      } else {
        throw new Error(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Toaster />
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your User ID and password below to login.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="userId">User ID</Label>
            <Input id="userId" type="text" placeholder="Your User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
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
          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
    </>
  );
}
