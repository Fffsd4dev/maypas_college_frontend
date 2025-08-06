import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <nav>
        <ul>
          <li><Link href="/admin/courses">Courses</Link></li>
          <li><Link href="/admin/courseCategory">Course Categories</Link></li>
          <li><Link href="/admin/users">Users</Link></li>
          <li><Link href="/admin/blogs">Blogs</Link></li>
        </ul>
      </nav>
      <style jsx>{`
        .admin-sidebar {
          min-width: 220px;
          background: #eee;
          color: #fff;
          height: 100vh;
          padding: 2rem 1rem;
          position: sticky;
          top: 0;
        }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 1.5rem; }
        a {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          transition: color 0.2s;
        }
        a:hover { color: #4f8cff; }
        @media (max-width: 900px) {
          .admin-sidebar { min-width: 100px; padding: 1rem 0.5rem; }
          li { margin-bottom: 1rem; }
        }
      `}</style>
    </aside>
  );
}