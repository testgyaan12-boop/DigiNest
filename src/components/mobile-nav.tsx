
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FileText, LayoutGrid, MoreHorizontal, Package, Phone, Users, Info, Newspaper, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

const mainNavLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/portfolio", label: "Portfolio", icon: LayoutGrid },
  { href: "/blog", label: "Blog", icon: FileText },
];

const moreNavLinks = [
    { href: "/saas-platforms", label: "SaaS", icon: Package },
    { href: "/about", label: "About", icon: Users },
    { href: "/team", label: "Team", icon: Users },
    { href: "/contact", label: "Contact", icon: Phone },
];

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

const MoreNavLink = ({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: React.ElementType, onClick: () => void }) => {
    const pathname = usePathname();

    const content = (
        <>
            <Icon className="h-6 w-6" />
            <span className="truncate text-xs">{label}</span>
        </>
    );

    const className = cn(
        "flex flex-col items-center justify-center gap-1 rounded-lg p-4 text-base font-medium",
        pathname.startsWith(href) && href !== "/" || pathname === href
        ? "text-primary bg-muted/50"
        : "text-muted-foreground hover:bg-muted/50"
    );

    return (
        <Link href={href} className={className} onClick={onClick}>
            {content}
        </Link>
    )
}

export default function MobileNav() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);


  useEffect(() => {
    setIsAdminView(pathname.startsWith('/admin'));
  }, [pathname]);
  
  if (isAdminView) {
    return null; 
  }
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-16 grid-cols-5 items-center justify-around">
        {mainNavLinks.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                 <button
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 text-xs font-medium",
                        moreNavLinks.some(l => pathname.startsWith(l.href) && l.href !== '/')
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
                    {moreNavLinks.map(link => {
                       return <MoreNavLink key={link.label} href={link.href} label={link.label} icon={link.icon} onClick={() => setIsSheetOpen(false)} />
                    })}
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
