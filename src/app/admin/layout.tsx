
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Users, Briefcase, Info, LogOut, Newspaper, ListChecks } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      <Sidebar>
        <SidebarHeader>
            <SidebarTrigger />
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
      <main className="flex-1">
        {children}
      </main>
    </SidebarProvider>
  );
}
