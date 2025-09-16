
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Users, Briefcase, Info, LogOut, Newspaper, ListChecks, MoreHorizontal } from "lucide-react";
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const adminNavLinks = [
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/projects", label: "Projects", icon: ListChecks },
];

const moreAdminLinks = [
  { href: "/admin/about", label: "About", icon: Info },
];


const AdminNavLink = ({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: React.ElementType, onClick?: () => void }) => {
    const pathname = usePathname();
    const isActive = pathname.startsWith(href);
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs font-medium",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="truncate">{label}</span>
        </Link>
    )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);


  useEffect(() => {
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
        setIsAdmin(true);
    } else {
        router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user'); 
    setIsAdmin(false);
    router.push('/');
    setTimeout(() => window.location.reload(), 100);
  }

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <p>Verifying access...</p>
        </div>
    );
  }
  
  if (!isAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:block">
          <SidebarHeader>
              <h2 className="font-semibold text-lg group-data-[collapsible=icon]:hidden">Admin Panel</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/team" isActive={pathname.startsWith('/admin/team')} tooltip={{ children: 'Manage Team' }}>
                  <Users />
                  <span>Manage Team</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/services" isActive={pathname.startsWith('/admin/services')} tooltip={{ children: 'Manage Services' }}>
                  <Briefcase />
                  <span>Manage Services</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/about" isActive={pathname.startsWith('/admin/about')} tooltip={{ children: 'Manage About' }}>
                  <Info />
                  <span>Manage About</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/blog" isActive={pathname.startsWith('/admin/blog')} tooltip={{ children: 'Manage Blog' }}>
                  <Newspaper />
                  <span>Manage Blog</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/projects" isActive={pathname.startsWith('/admin/projects')} tooltip={{ children: 'Manage Projects' }}>
                  <ListChecks />
                  <span>Manage Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
           <SidebarMenu>
              <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} tooltip={{ children: 'Logout' }}>
                      <LogOut />
                      <span>Logout</span>
                  </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>

        <main className="flex-1 flex flex-col pb-16 md:pb-0">
           <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-6 md:hidden">
              <h1 className="font-semibold text-lg">Admin Panel</h1>
          </header>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>

        {/* Mobile-only fixed footer navigation */}
        <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
          <div className="grid h-16 grid-cols-5 items-center justify-around">
            {adminNavLinks.map((link) => (
                <AdminNavLink key={link.href} {...link} />
            ))}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <button className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-6 w-6" />
                        <span className="truncate">More</span>
                    </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto">
                    <SheetHeader>
                        <SheetTitle>More Options</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {moreAdminLinks.map(link => (
                            <AdminNavLink key={link.href} {...link} onClick={() => setIsSheetOpen(false)} />
                        ))}
                         <button
                            onClick={() => {
                                setIsSheetOpen(false);
                                handleLogout();
                            }}
                            className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                            <LogOut className="h-6 w-6"/>
                            <span>Logout</span>
                        </button>
                    </div>
                </SheetContent>
            </Sheet>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
}
