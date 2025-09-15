'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import { Code2, UserCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Since localStorage is a browser API, we need to check for it in useEffect.
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/'; // Redirect to home
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              DevPlatform
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/saas-platforms">SaaS Platforms</Link>
            <Link href="/team">Team</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-6 w-6" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/signup">Sign Up</Link></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
