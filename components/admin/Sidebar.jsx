import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBook, FaListAlt, FaUser, FaBlog, FaSignOutAlt, FaBars, FaQuestion, FaSpeakerDeck, FaTeamspeak } from 'react-icons/fa';
import { useState } from 'react';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';


export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  // Helper to check if route is active
  const isActive = (href) => router.pathname === href;

  return (
    <AdminProtectedRoute>
    <aside className={`admin-sidebar${open ? '' : ' collapsed'}`}>
      <div className="sidebar-header">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          <FaBars size={24} />
        </button>
        <span className="logo-text">MayPas Admin</span>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/admin/courses" legacyBehavior>
              <a className={isActive('/admin/courses') ? 'active' : ''}>
                <FaBook className="icon" /> <span className="nav-text">Courses</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/courseCategory" legacyBehavior>
              <a className={isActive('/admin/courseCategory') ? 'active' : ''}>
                <FaListAlt className="icon" /> <span className="nav-text">Course Categories</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/users" legacyBehavior>
              <a className={isActive('/admin/users') ? 'active' : ''}>
                <FaUser className="icon" /> <span className="nav-text">Users</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/blogs" legacyBehavior>
              <a className={isActive('/admin/blogs') ? 'active' : ''}>
                <FaBlog className="icon" /> <span className="nav-text">Blogs</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/faqs" legacyBehavior>
              <a className={isActive('/admin/faqs') ? 'active' : ''}>
                 <FaQuestion className="icon" /> <span className="nav-text">FAQs</span>
              </a>
            </Link>
          </li>
           <li>
            <Link href="/admin/testimonials" legacyBehavior>
              <a className={isActive('/admin/testimonials') ? 'active' : ''}>
                 <FaTeamspeak className="icon" /> <span className="nav-text">Testimonials</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="icon" /> <span className="nav-text">Logout</span>
      </button>
      <style jsx>{`
        .admin-sidebar {
          width: 16rem;
          background: #181c2f;
          color: #fff;
          height: 100vh;
          padding: 2rem 1rem 1rem 1rem;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          transition: min-width 0.3s;
        }
        .admin-sidebar.collapsed {
          width: 5rem;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }
        .logo-text {
          font-size: 1.3rem;
          font-weight: bold;
          margin-left: 0.7rem;
          letter-spacing: 1px;
        }
        .admin-sidebar.collapsed .logo-text {
          display: none;
        }
        .hamburger {
          background: #ea2f38;
          border: none;
          color: #fff;
          cursor: pointer;
        }
        nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        nav li {
          margin-bottom: 1.5rem;
        }
        a {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          transition: color 0.2s, background 0.2s;
          border-radius: 6px;
          padding: 0.5rem 0.7rem;
        }
        a.active {
          background: #263159;
          color: #4f8cff;
        }
        a:hover:not(.active) {
          color: #4f8cff;
          background: #222a3f;
        }
        .icon {
          min-width: 24px;
          min-height: 24px;
        }
        .nav-text {
          display: inline-block;
        }
        .admin-sidebar.collapsed .nav-text {
          display: none;
        }
        .logout-btn {
          background: #ea2f38;
          color: #fff;
          border: none;
          padding: 0.7rem 1rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .admin-sidebar.collapsed .nav-text {
          display: none;
        }
        @media (max-width: 900px) {
          .admin-sidebar { padding: 1rem 0.5rem; }
          .logo-text { display: none; }
        }
      `}</style>
    </aside>
</AdminProtectedRoute>
  );
}