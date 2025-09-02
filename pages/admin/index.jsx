import Sidebar from '../../components/admin/Sidebar';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';

export default function AdminDashboard() {
  return (
    <AdminProtectedRoute>
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ padding: 20}}>
        <h1>Admin Dashboard</h1>
        <p>Welcome! Use the sidebar to manage blogs, courses, prices, and admin users.</p>
      </main>
    </div>
    </AdminProtectedRoute>
  );
}