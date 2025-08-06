import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import CourseTable from '../../components/admin/CourseTable';
import CourseForm from '../../components/admin/CourseForm';

const initialCourses = [
  {
    id: 1,
    course_category_id: '101',
    title: 'React for Beginners',
    excerpt: 'Learn React from scratch.',
    description: 'A full React course for absolute beginners.',
    price: 49,
    featured_image: '',
  },
  // ...more mock data
];

export default function AdminCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setEditing(course);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this course?')) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (data) => {
    if (editing) {
      setCourses(courses.map((c) => (c.id === editing.id ? { ...c, ...data } : c)));
    } else {
      setCourses([{ ...data, id: Date.now() }, ...courses]);
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main>
        <div className="admin-header">
          <h1>Courses</h1>
          <button className="add-btn" onClick={handleAdd}>+ Add Course</button>
        </div>
        {showForm && (
          <CourseForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        )}
        <CourseTable courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f5f7fb;
        }
        main {
          flex: 1;
          padding: 2rem;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .add-btn {
          background: #4f8cff;
          color: #fff;
          border: none;
          padding: 0.7rem 2rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
        }
        @media (max-width: 900px) {
          main { padding: 1rem; }
        }
      `}</style>
    </div>
  );
}