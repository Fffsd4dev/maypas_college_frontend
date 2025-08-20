import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import CourseTable from '../../components/admin/CourseTable';
import CourseForm from '../../components/admin/CourseForm';
import { getCategories } from '../../util/courseCategoryApi';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '@/util/courseApi';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); // for initial fetch
    const [actionLoading, setActionLoading] = useState(false); // for add/edit/delete actions
    const [fetchError, setFetchError] = useState('');
  

  useEffect(() => {
    getCategories()
      .then((data) => {
        const arr = Array.isArray(data) ? data : data.data || [];
        setCategories(arr);
      })
      .catch(() => setCategories([]));
  }, []);

   useEffect(() => {
      setLoading(true);
      fetchCourses()
        .then((data) => {
          const coursesArray = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : [];
          setCourses(coursesArray);
          setFetchError('');
        })
        .catch(() => {
          setFetchError('Failed to fetch courses. Please try again later.');
          setCourses([]);
        })
        .finally(() => setLoading(false));
    }, []);


  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setEditing(course);
    setShowForm(true);
  };

   const handleDelete = async (id) => {
     if (confirm('Delete this course?')) {
       setActionLoading(true);
       try {
         await deleteCourse(id);
          const refreshed = await fetchCourses();
      setCourses(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
       } catch {
         toast.error('Failed to delete course.');
         const refreshed = await fetchCourses();
      setCourses(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
       } finally {
         setActionLoading(false);
       }
       setCourses(courses.filter((c) => c.id !== id));
     }
   };


  const handleSubmit = async (data) => {
  setActionLoading(true);
  try {
    if (editing) {
      const updated = await updateCourse(editing.id, data);
     const refreshed = await fetchCourses();
      setCourses(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
      toast.success('Course updated successfully!');
    } else {
      await createCourse(data);
      // Fetch the latest courses from backend after creation
      const refreshed = await fetchCourses();
      setCourses(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
      toast.success('Course created successfully!');
    }
    setShowForm(false);
    setEditing(null);
  } catch {
    toast.error('Failed to save course.');
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
          <h1>Courses</h1>
        {!showForm && (
              <button
                className="add-btn"
                onClick={handleAdd}
                disabled={actionLoading}
                style={actionLoading ? { opacity: 0.6, pointerEvents: 'none' } : {}}
              >
                {actionLoading && !showForm ? 'Loading...' : '+ Add Course'}
              </button>
            )}
          </div>
          {showForm && (
            <CourseForm
              initial={editing} 
              categories={categories}
              onCancel={() => { setShowForm(false); setEditing(null); }}
              loading={actionLoading}
              onSubmit={handleSubmit}
            />
          )}
          {fetchError && (
            <div style={{ color: '#ff4f4f', marginBottom: '1rem', textAlign: 'center' }}>
              {fetchError}
            </div>
          )}
          <CourseTable
            courses={courses}
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
                  .add-btn[disabled] { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 900px) {
          main { padding: 1rem; width: 70%; }
        }
      `}</style>
    </div>
   </AdminProtectedRoute>
  );
}