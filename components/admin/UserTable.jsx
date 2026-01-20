import { truncateWords } from '@/util/wordUtils';
export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>No users found.</td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
              <td onClick={() => onEdit(user)} style={{ cursor: 'pointer' }}>{truncateWords(user.fName)}</td>
              <td onClick={() => onEdit(user)} style={{ cursor: 'pointer' }}>{truncateWords(user.lName)}</td>
              <td onClick={() => onEdit(user)} style={{ cursor: 'pointer' }}>{truncateWords(user.email)}</td>
              <td>
                <i className="edit-btn fas fa-edit" onClick={() => onEdit(user)} />
                <i className="delete-btn fas fa-trash" onClick={() => onDelete(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .table-responsive { overflow-x: auto; }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          margin-top: 1rem;
        }
        th, td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #eee;
        }
        th { background: #f7f8fa; }
        .edit-btn, .delete-btn {
          margin-right: 0.5rem;
          padding: 0.4rem 1rem;
          border: none;
          border-radius: 4px;
          font-size: 0.95rem;
          cursor: pointer;
        }
       .edit-btn { color: #4f8cff; }
        .delete-btn { color: #ff4f4f; }
        @media (max-width: 600px) {
          th, td { padding: 0.5rem 0.3rem; font-size: 0.9rem; }
          .edit-btn, .delete-btn { padding: 0.3rem 0.7rem; font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
}