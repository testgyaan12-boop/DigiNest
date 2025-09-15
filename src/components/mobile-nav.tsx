"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, Users, FileText, LayoutGrid, MoreHorizontal, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const mainNavLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/portfolio", label: "Portfolio", icon: LayoutGrid },
  { href: "/blog", label: "Blog", icon: FileText },
];

const moreNavLinks = [
    { href: "/about", label: "About", icon: User },
    { href: "/team", label: "Team", icon: Users },
]

const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs font-medium",
              pathname === href
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="truncate">{label}</span>
        </Link>
    )
}

const MoreNavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg p-4 text-base font-medium",
              pathname === href
                ? "text-primary bg-muted/50"
                : "text-muted-foreground hover:bg-muted/50"
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="truncate text-xs">{label}</span>
        </Link>
    )
}

export default function MobileNav() {
  const pathname = usePathname();
  const isLoggedIn = false; // This would be dynamic in a real app

  const accountLinks = isLoggedIn ?
    [{ href: "/profile", label: "Profile", icon: User }]
    : [
        { href: "/login", label: "Login", icon: LogIn },
        { href: "/signup", label: "Sign Up", icon: UserPlus }
    ];

  const allMoreLinks = [...moreNavLinks, ...accountLinks];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-16 grid-cols-5 items-center justify-around">
        {mainNavLinks.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
        <Sheet>
            <SheetTrigger asChild>
                 <button
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 text-xs font-medium",
                        allMoreLinks.some(l => l.href === pathname)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                 >
                    <MoreHorizontal className="h-6 w-6" />
                    <span className="truncate">More</span>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
                <SheetHeader>
                    <SheetTitle>More</SheetTitle>
                </SheetHeader>
                <div className="mt-4 grid grid-cols-4 gap-2">
                    {allMoreLinks.map(link => <MoreNavLink key={link.href} {...link} />)}
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
