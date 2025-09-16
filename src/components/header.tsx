
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import { Code2, UserCircle, Shield } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Since localStorage is a browser API, we need to check for it in useEffect.
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      const adminStatus = localStorage.getItem('isAdmin');
      setIsLoggedIn(!!user);
      setIsAdmin(!!user && adminStatus === 'true');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin'); // Clear admin status on logout
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = '/'; // Redirect to home
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex md:hidden">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Code2 className="h-6 w-6" />
            </Link>
        </div>
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6" />
            <span className="font-bold">
              Novasuites
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {isAdmin ? (
              <Link href="/admin">Admin</Link>
            ) : (
              <>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/services">Services</Link>
                <Link href="/portfolio">Portfolio</Link>
                <Link href="/saas-platforms">SaaS Platforms</Link>
                <Link href="/team">Team</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/contact">Contact</Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <span className="font-bold md:hidden">
              Novasuites
            </span>
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
                    <DropdownMenuItem asChild><Link href="/my-projects">My Projects</Link></DropdownMenuItem>
                    {isAdmin && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin" className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Admin
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
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
