import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.replace('/admin/login');
      }
    }
  }, [router]);

  return <>{children}</>;
}
