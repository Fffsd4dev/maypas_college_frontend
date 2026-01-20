import { truncateWords } from '@/util/wordUtils';

export default function FaqTable({ faqs, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Status</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>No faqs found.</td>
            </tr>
          )}
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td onClick={() => onEdit(faq)} style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}>{truncateWords(faq.question)}</td>
              <td onClick={() => onEdit(faq)} style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}>{truncateWords(faq.answer)}</td>
              <td onClick={() => onEdit(faq)} style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}>{faq.is_active == 1 ? "True" : "False"}</td>
              <td onClick={() => onEdit(faq)} style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}>{truncateWords(faq.ordering)}</td>
              <td>
                <i className="edit-btn fas fa-edit" onClick={() => onEdit(faq)} />
                <i className="delete-btn fas fa-trash" onClick={() => onDelete(faq.id)} />
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