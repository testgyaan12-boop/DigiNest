
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Users, Briefcase, Info, LogOut, Newspaper, ListChecks, PanelLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        <Sidebar>
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
          <SidebarFooter>
              <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton onClick={handleLogout} tooltip={{ children: 'Logout' }}>
                          <LogOut />
                          <span>Logout</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 flex flex-col pb-16 md:pb-0">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 md:hidden">
              <h1 className="font-semibold text-lg">Admin</h1>
          </header>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
        {/* Mobile-only fixed footer for sidebar trigger */}
        <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
          <div className="flex h-16 items-center justify-around">
            <SidebarTrigger asChild>
                <Button variant="ghost" className="flex flex-col h-auto items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                    <PanelLeft className="h-6 w-6"/>
                    <span>Menu</span>
                </Button>
            </SidebarTrigger>
            <Button variant="ghost" onClick={handleLogout} className="flex flex-col h-auto items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                <LogOut className="h-6 w-6"/>
                <span>Logout</span>
            </Button>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
}
