
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Users, Briefcase, Info, LogOut, Newspaper, ListChecks } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for admin status in localStorage
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
        setIsAdmin(true);
    } else {
        // If not an admin, redirect to home page.
        // The authentication is now handled in the Header component.
        router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user'); // Also log out from general session
    setIsAdmin(false);
    router.push('/');
    // We need to reload to ensure all states are cleared.
    setTimeout(() => window.location.reload(), 100);
  }

  if (!isAdmin) {
    // Render a loading state or null while we check for admin status
    // to prevent flashing the admin content.
    return (
        <div className="flex items-center justify-center h-screen">
            <p>Verifying access...</p>
        </div>
    );
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
      <div className="flex-1">
        {children}
      </div>
    </SidebarProvider>
  );
}
