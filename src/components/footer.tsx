import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="container flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
                <div className="flex items-center gap-2">
                    <Code2 />
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} DevPortfolio
                    </p>
                </div>
                <nav className="flex items-center gap-4 text-sm md:hidden">
                    <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link>
                    <Link href="/services" className="text-muted-foreground hover:text-foreground">Services</Link>
                    <Link href="/team" className="text-muted-foreground hover:text-foreground">Team</Link>
                    <Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link>
                </nav>
            </div>
        </footer>
    )
}
