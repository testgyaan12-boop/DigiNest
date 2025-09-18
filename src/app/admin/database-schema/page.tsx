
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Check } from 'lucide-react';

const sqlSchema = `
-- For managing user roles (e.g., 'ADMIN', 'USER')
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Seed the roles table with initial data
INSERT INTO roles (name) VALUES ('ADMIN'), ('USER');

-- Stores user information and links to their role
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Store hashed passwords, never plaintext
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- For the "About Us" page content (src/app/admin/about/page.tsx)
CREATE TABLE about_page (
    id INT PRIMARY KEY DEFAULT 1, -- Singleton table, only one row
    title VARCHAR(255) NOT NULL,
    paragraph1 TEXT,
    paragraph2 TEXT,
    paragraph3 TEXT,
    image_url VARCHAR(255)
);

-- For the "Services" page (src/app/admin/services/page.tsx)
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) -- To store the name of the Lucide icon
);

-- For the "Team Members" page (src/app/admin/team/page.tsx)
CREATE TABLE team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    avatar_url VARCHAR(255),
    bio TEXT,
    tech_stack VARCHAR(255) -- Comma-separated list of technologies
);

-- For blog posts (src/app/admin/blog/page.tsx)
CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL, -- For user-friendly URLs
    description TEXT,
    image_url VARCHAR(255),
    ai_hint VARCHAR(100),
    tags VARCHAR(255), -- Comma-separated tags
    author_id INT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- For comments on blog posts (src/app/blog/[slug]/page.tsx)
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    author_id INT, -- Nullable for anonymous comments
    author_name VARCHAR(255) NOT NULL, -- Store name in case user is deleted or anonymous
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- For project requests (src/app/contact/page.tsx)
CREATE TABLE project_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    description TEXT,
    budget DECIMAL(12, 2),
    timeline VARCHAR(255),
    mobile VARCHAR(50),
    project_type ENUM('company', 'self'),
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export default function DatabaseSchemaPage() {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(sqlSchema.trim());
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div className="p-4 md:p-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Database Schema for MySQL</CardTitle>
                    <CardDescription>
                        This is the proposed MySQL schema for your Spring backend based on the application's current features.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[50vh] w-full rounded-md border p-4">
                        <pre className="text-sm"><code>{sqlSchema.trim()}</code></pre>
                    </ScrollArea>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCopy}>
                        {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        {isCopied ? 'Copied!' : 'Copy Schema'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
