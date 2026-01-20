import { useEffect, useState } from 'react';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import Sidebar from '../../components/admin/Sidebar';
import TestimonialTable from '../../components/admin/TestimonialTable';
import TestimonialForm from '../../components/admin/TestimonialForm';
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../util/testimonialApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); // for initial fetch
  const [actionLoading, setActionLoading] = useState(false); // for add/edit/delete actions
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchTestimonials()
      .then((data) => {
        const testimonialsArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setTestimonials(testimonialsArray);
        setFetchError('');
      })
      .catch(() => {
        setFetchError('Failed to fetch testimonials. Please try again later.');
        setTestimonials([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (testimonial) => {
    setEditing(testimonial);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this testimonial?')) {
      setActionLoading(true);
      try {
        await deleteTestimonial(id);
        setTestimonials(testimonials.filter((b) => b.id !== id));
        toast.success('Testimonial deleted successfully!');
      } catch {
        toast.error('Failed to delete testimonial.');
      } finally {
        setActionLoading(false);
      }
      setTestimonials(testimonials.filter((b) => b.id !== id));
    }
  };

  const handleSubmit = async (data) => {
    setActionLoading(true);
    try {
      if (editing) {
        const updated = await updateTestimonial(editing.id, data);
        const refreshed = await fetchTestimonials();
        setTestimonials(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
        toast.success('Testimonial updated successfully!');
      } else {
        const created = await createTestimonial(data);
        console.log(created);
        const refreshed = await fetchTestimonials();
        setTestimonials(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
        toast.success('Testimonial created successfully!');
      }
      setShowForm(false);
      setEditing(null);
    } catch (e) {
      console.error(e);
      toast.error('Failed to save testimonial.');
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
          <h1>Testimonials</h1>
          {!showForm && (
            <button
              className="add-btn"
              onClick={handleAdd}
              disabled={actionLoading}
              style={actionLoading ? { opacity: 0.6, pointerEvents: 'none' } : {}}
            >
              {actionLoading && !showForm ? 'Loading...' : '+ Add Testimonial'}
            </button>
          )}
        </div>
        {showForm && (
          <TestimonialForm
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
        <TestimonialTable
          testimonials={testimonials}
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