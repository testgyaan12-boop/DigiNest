
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page acts as a gatekeeper. It redirects to the first admin page.
export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <p>Loading Admin Dashboard...</p>
    </div>
  );
}
