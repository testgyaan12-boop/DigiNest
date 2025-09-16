
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Users, Briefcase, Info, LogOut, Newspaper, ListChecks } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ADMIN_ACCESS_CODE = 'admin123'; // Simple hardcoded access code

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for admin status in localStorage
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
        setIsAdmin(true);
        setShowAuthModal(false);
    } else {
        setShowAuthModal(true);
    }
  }, []);

  const handleCodeSubmit = () => {
    if (inputCode === ADMIN_ACCESS_CODE) {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setShowAuthModal(false);
      setError('');
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user'); // Also log out from general session
    setIsAdmin(false);
    router.push('/');
    // We need to reload to ensure all states are cleared.
    setTimeout(() => window.location.reload(), 100);
  }

  if (!isAdmin) {
    return (
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Admin Access Required</DialogTitle>
                    <DialogDescription>
                        Please enter the access code to view the admin dashboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="access-code" className="text-right">
                            Code
                        </Label>
                        <Input
                            id="access-code"
                            type="password"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            className="col-span-3"
                            onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
                        />
                    </div>
                     {error && <p className="text-destructive text-sm text-center col-span-4">{error}</p>}
                </div>
                <Button onClick={handleCodeSubmit}>Authenticate</Button>
            </DialogContent>
        </Dialog>
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
