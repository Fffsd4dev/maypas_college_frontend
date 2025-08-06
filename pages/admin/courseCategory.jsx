import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import CourseCategoryTable from '../../components/admin/CourseCategoryTable';
import CourseCategoryForm from '../../components/admin/CourseCategoryForm';

const initialCategories = [
  {
    id: 1,
    name: 'Web Development',
    excerpt: 'Web dev courses',
    description: 'All about web development',
    featured_image: '',
  },
];

export default function AdminCourseCategory() {
  const [categories, setCategories] = useState(initialCategories);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this category?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (data) => {
    if (editing) {
      setCategories(categories.map((c) => (c.id === editing.id ? { ...c, ...data } : c)));
    } else {
      setCategories([{ ...data, id: Date.now() }, ...categories]);
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main>
        <div className="admin-header">
          <h1>Course Categories</h1>
          <button className="add-btn" onClick={handleAdd}>+ Add Category</button>
        </div>
        {showForm && (
          <CourseCategoryForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        )}
        <CourseCategoryTable categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
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