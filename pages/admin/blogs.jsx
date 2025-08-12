import { useEffect, useState } from 'react';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import Sidebar from '../../components/admin/Sidebar';
import BlogTable from '../../components/admin/BlogTable';
import BlogForm from '../../components/admin/BlogForm';
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from '../../util/blogApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); // for initial fetch
  const [actionLoading, setActionLoading] = useState(false); // for add/edit/delete actions
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchBlogs()
      .then((data) => {
        const blogsArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setBlogs(blogsArray);
        setFetchError('');
      })
      .catch(() => {
        setFetchError('Failed to fetch blogs. Please try again later.');
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (blog) => {
    setEditing(blog);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this blog?')) {
      setActionLoading(true);
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        toast.success('Blog deleted successfully!');
      } catch {
        toast.error('Failed to delete blog.');
      } finally {
        setActionLoading(false);
      }
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const handleSubmit = async (data) => {
    setActionLoading(true);
    try {
      if (editing) {
        const updated = await updateBlog(editing.id, data);
        setBlogs(blogs.map((b) => (b.id === editing.id ? updated : b)));
        toast.success('Blog updated successfully!');
      } else {
        const created = await createBlog(data);
        setBlogs([created, ...blogs]);
        toast.success('Blog created successfully!');
      }
      setShowForm(false);
      setEditing(null);
    } catch {
      toast.error('Failed to save blog.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AdminProtectedRoute>
    <div className="admin-layout">
      <Sidebar />
      <main>
        <ToastContainer position="top-right" autoClose={3000} />
          <div className="admin-header">
          <h1>Blogs</h1>
          {!showForm && (
            <button
              className="add-btn"
              onClick={handleAdd}
              disabled={actionLoading}
              style={actionLoading ? { opacity: 0.6, pointerEvents: 'none' } : {}}
            >
              {actionLoading && !showForm ? 'Loading...' : '+ Add Blog'}
            </button>
          )}
        </div>
        {showForm && (
          <BlogForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null); }}
            loading={actionLoading}
          />
        )}
        {fetchError && (
          <div style={{ color: '#ff4f4f', marginBottom: '1rem', textAlign: 'center' }}>
            {fetchError}
          </div>
        )}
        <BlogTable
          blogs={blogs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actionLoading={actionLoading}
        />
        {loading && (
          <div style={{
            position: 'absolute', left: 0, top: 0, width: '100%', height: '100%',
            background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
          }}>
            <div style={{ fontSize: 18 }}>Loading...</div>
          </div>
        )}
      </main>
      <style jsx>{`
        .admin-layout { display: flex; min-height: 100vh; background: #f5f7fb; }
        main { flex: 1; padding: 2rem;}
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .add-btn { background: #4f8cff; color: #fff; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 1rem; }
        .add-btn[disabled] { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 900px) { main { padding: 1rem; width: 70%; } }
      `}</style>
    </div>
    </AdminProtectedRoute>
  );
}