import { useEffect, useState } from 'react';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import Sidebar from '../../components/admin/Sidebar';
import CourseCategoryTable from '../../components/admin/CourseCategoryTable';
import CourseCategoryForm from '../../components/admin/CourseCategoryForm';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../util/courseCategoryApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const initialCategories = [
//   {
//     id: 1,
//     name: 'Web Development',
//     excerpt: 'Web dev courses',
//     description: 'All about web development',
//     featured_image: '',
//   },
// ];

export default function AdminCourseCategory() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true); // for initial fetch
    const [actionLoading, setActionLoading] = useState(false); // for add/edit/delete actions
    const [fetchError, setFetchError] = useState('');
  
    useEffect(() => {
      setLoading(true);
      getCategories()
        .then((data) => {
          const categoriesArray = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : [];
          setCategories(categoriesArray);
          setFetchError('');
        })
        .catch(() => {
          setFetchError('Failed to fetch course programmes. Please try again later.');
          setCategories([]);
        })
        .finally(() => setLoading(false));
    }, []);
  
  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this programme?')) {
      setActionLoading(true);
      try {
        await deleteCategory(id);
        const refreshed = await getCategories();
        setCategories(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
        toast.success('Programme deleted successfully');
      } catch (error) {
        toast.error('Failed to delete programme');
      } finally {
        setActionLoading(false);
      }
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = async (data) => {
    setActionLoading(true);
    try {
      if (editing) {
        const updated = await updateCategory(editing.id, data);
        const refreshed = await getCategories();
        setCategories(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
        toast.success('Programme updated successfully');
      } else {
        const created = await createCategory(data);
        const refreshed = await getCategories();
        setCategories(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
        toast.success('Programme created successfully');
      }
      setShowForm(false);
      setEditing(null);
    } catch (error) {
      toast.error('Failed to save Programme: ' + error?.message);
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
            <h1>Programmes</h1>
          {!showForm && (
            <button
              className="add-btn"
              onClick={handleAdd}
              disabled={actionLoading}
              style={actionLoading ? { opacity: 0.6, pointerEvents: 'none' } : {}}
            >
              {actionLoading && !showForm ? 'Loading...' : '+ Add Program'}
            </button>
          )}
        </div>
        {showForm && (
          <CourseCategoryForm
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
        <CourseCategoryTable categories={categories} onEdit={handleEdit} onDelete={handleDelete}
        actionLoading={actionLoading} />
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
        main { flex: 1; padding: 2rem; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .add-btn { background: #4f8cff; color: #fff; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 1rem; }
         .add-btn[disabled] { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 900px) { main { padding: 1rem; width: 70%; } }
      `}</style>
    </div>
    </AdminProtectedRoute>
  );
}