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
              {/* <td>
                {faq.featured_image_path ? (
                  <img src={process.env.NEXT_PUBLIC_API_BASE_URL + "/" + faq.featured_image_path} alt="" style={{ width: 60, borderRadius: 6 }} />
                ) : (
                  <span style={{ color: '#aaa' }}>No image</span>
                )}
              </td> */}
              <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} >{faq.question}</td>
              <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} >{faq.answer}</td>
                <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} >{faq.is_active == 1 ? "True" : "False"}</td>
              <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{faq.ordering}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(faq)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(faq.id)}>Delete</button>
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
        .edit-btn { background: #4f8cff; color: #fff; }
        .delete-btn { background: #ff4f4f; color: #fff; }
        @media (max-width: 600px) {
          th, td { padding: 0.5rem 0.3rem; font-size: 0.9rem; }
          .edit-btn, .delete-btn { padding: 0.3rem 0.7rem; font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
}