import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import FeaturedCoursesTable from '../../components/admin/FeaturedCoursesTable.jsx';
import FeaturedCoursesForm from '../../components/admin/FeaturedCoursesForm';
import { fetchCourses } from '../../util/courseApi';
import { fetchFeaturedCourses, createFeaturedCourses, updateFeaturedCourses, deleteFeaturedCourses, fetchFeaturedCourse } from '@/util/featuredCoursesApi'; // <-- import fetchFeaturedCourse
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminFeaturedCourses() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); // for initial fetch
  const [actionLoading, setActionLoading] = useState(false); // for add/edit/delete actions
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    fetchCourses()
      .then((data) => {
        const arr = Array.isArray(data) ? data : data.data || [];
        setCourses(arr);
        console.log(arr);
      })
      .catch(() => setCourses([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchFeaturedCourses()
      .then((data) => {
        const featuredCoursesArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setFeaturedCourses(featuredCoursesArray);
        console.log(featuredCoursesArray);
        setFetchError('');
      })
      .catch(() => {
        setFetchError('Failed to fetch featured Courses. Please try again later.');
        setFeaturedCourses([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  // Updated handleEdit to fetch single course
 const handleEdit = async (featuredCourses) => {
  setActionLoading(true);
  try {
    let single = await fetchFeaturedCourse(featuredCourses.featured_course_id);
    setEditing(single);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch {
    toast.error('Failed to fetch featured course details.');
  } finally {
    setActionLoading(false);
  }
};
 const handleDelete = async (featured_course_id) => {
  if (confirm('Delete this course from featured courses?')) {
    setActionLoading(true);
    try {
      await deleteFeaturedCourses(featured_course_id);
      const refreshed = await fetchFeaturedCourses();
      setFeaturedCourses(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
    } catch (error) {
      toast.error('Failed to delete course.');
      console.log(error)
      const refreshed = await fetchFeaturedCourses();
      setFeaturedCourses(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
    } finally {
      setActionLoading(false);
    }
    // Remove this line:
    setFeaturedCourses(prev => prev.filter((c) => c.featured_course_id !== featured_course_id));
  }
};

  const handleSubmit = async (data) => {
    setActionLoading(true);
    try {
      if (editing) {
        const updated = await updateFeaturedCourses(editing.featured_course_id, data);
        const refreshed = await fetchFeaturedCourses();
        setFeaturedCourses(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
        toast.success('Course updated successfully!');
      } else {
        await createFeaturedCourses(data);
        // Fetch the latest featuredFeaturedCourses from backend after creation
        const refreshed = await fetchFeaturedCourses();
        setFeaturedCourses(Array.isArray(refreshed) ? refreshed : refreshed.data || []);
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
            <h1>Featured Courses</h1>
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
            <FeaturedCoursesForm
              initial={editing}
              courses={courses}
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
          <FeaturedCoursesTable
            featuredCourses={featuredCourses}
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