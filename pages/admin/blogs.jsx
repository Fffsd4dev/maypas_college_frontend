import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import BlogTable from '../../components/admin/BlogTable';
import BlogForm from '../../components/admin/BlogForm';

const initialBlogs = [
  {
    id: 1,
    title: 'Welcome to the Blog',
    slug: 'welcome-blog',
    content: 'This is the first blog post.',
    featured_image: '',
  },
];

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (blog) => {
    setEditing(blog);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this blog?')) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const handleSubmit = (data) => {
    if (editing) {
      setBlogs(blogs.map((b) => (b.id === editing.id ? { ...b, ...data } : b)));
    } else {
      setBlogs([{ ...data, id: Date.now() }, ...blogs]);
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main>
        <div className="admin-header">
          <h1>Blogs</h1>
          <button className="add-btn" onClick={handleAdd}>+ Add Blog</button>
        </div>
        {showForm && (
          <BlogForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        )}
        <BlogTable blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
      <style jsx>{`
        .admin-layout { display: flex; min-height: 100vh; background: #f5f7fb; }
        main { flex: 1; padding: 2rem; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .add-btn { background: #4f8cff; color: #fff; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 1rem; }
        @media (max-width: 900px) { main { padding: 1rem; } }
      `}</style>
    </div>
  );
}