import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import { Code2 } from 'lucide-react';

export default function Header() {
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
            <Link href="/team">Team</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
