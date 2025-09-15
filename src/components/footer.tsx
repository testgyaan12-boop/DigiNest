import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t pb-24 md:pb-0">
            <div className="container flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
                <div className="flex items-center gap-2">
                    <Code2 />
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} DevPortfolio
                    </p>
                </div>
            </div>
        </footer>
    )
}
