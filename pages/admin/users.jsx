import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import UserTable from '../../components/admin/UserTable';
import UserForm from '../../components/admin/UserForm';

const initialUsers = [
  {
    id: 1,
    fName: 'John',
    lName: 'Doe',
    email: 'john@example.com',
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditing(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleSubmit = (data) => {
    if (editing) {
      setUsers(users.map((u) => (u.id === editing.id ? { ...u, ...data } : u)));
    } else {
      setUsers([{ ...data, id: Date.now() }, ...users]);
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main>
        <div className="admin-header">
          <h1>Users</h1>
          <button className="add-btn" onClick={handleAdd}>+ Add User</button>
        </div>
        {showForm && (
          <UserForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        )}
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
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