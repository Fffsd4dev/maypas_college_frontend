import { useEffect, useState } from 'react';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import Sidebar from '../../components/admin/Sidebar';
import UserTable from '../../components/admin/UserTable';
import UserForm from '../../components/admin/UserForm';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../util/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); // for initial fetch
  const [actionLoading, setActionLoading] = useState(false); // for add/edit/delete actions
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        const usersArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setUsers(usersArray);
        setFetchError('');
      })
      .catch(() => {
        setFetchError('Failed to fetch users. Please try again later.');
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);


  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditing(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this user?')) {
     setActionLoading(true);
           try {
             await deleteUser(id);
             setUsers(users.filter((u) => u.id !== id));
             toast.success('User deleted successfully!');
           } catch {
             toast.error('Failed to delete user.');
           } finally {
             setActionLoading(false);
           }
           setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleSubmit = async (data) => {
    setActionLoading(true);
    try {
      if (editing) {
        const updated = await updateUser(editing.id, data);
        setUsers(users.map((u) => (u.id === editing.id ? updated : u)));
        toast.success('User updated successfully!');
      } else {
        const created = await createUser(data);
        setUsers([created, ...users]);
        toast.success('User created successfully!');
      }
      setShowForm(false);
      setEditing(null);
    } catch (error) {
        let errorMsg = "Failed to create or update user.";
      if (error.response?.data?.errors) {
        // Extract all error messages and join them into a single string
        errorMsg = Object.values(error.response.data.errors)
          .flat() // Flatten array in case multiple errors per field
          .join("\n"); // Join errors with line breaks
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      toast.error(errorMsg);
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
          <h1>Users</h1>
{!showForm && (
            <button
              className="add-btn"
              onClick={handleAdd}
              disabled={actionLoading}
              style={actionLoading ? { opacity: 0.6, pointerEvents: 'none' } : {}}
            >
              {actionLoading && !showForm ? 'Loading...' : '+ Add User'}
            </button>
          )}
        </div>
        {showForm && (
          <UserForm
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
        <UserTable
          users={users}
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
        main { flex: 1; padding: 2rem; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .add-btn { background: #4f8cff; color: #fff; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 1rem; }
        @media (max-width: 700px) { main { padding: 1rem; width: 70%; } }
      `}</style>
    </div>
   </AdminProtectedRoute>
  );
}