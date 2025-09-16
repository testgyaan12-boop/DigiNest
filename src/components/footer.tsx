
'use client';

import Link from "next/link";
import { Code2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
    const pathname = usePathname();
    const [isAdminView, setIsAdminView] = useState(false);

    useEffect(() => {
        setIsAdminView(pathname.startsWith('/admin'));
    }, [pathname]);

    if (isAdminView) {
        return null;
    }

    return (
        <footer className="border-t pb-24 md:pb-0">
            <div className="container flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
                <div className="flex items-center gap-2">
                    <Code2 />
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Novasuites Inc.
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <Link href="/about">About Us</Link>
                    <Link href="/services">Services</Link>
                    <Link href="/portfolio">Portfolio</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="#">Terms of Service</Link>
                    <Link href="#">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    )
}
