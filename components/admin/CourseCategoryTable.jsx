import { truncateWords } from '@/util/wordUtils';

export default function CourseCategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Excerpt</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>No programmes found.</td>
            </tr>
          )}
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td onClick={() => onEdit(cat)} style={{ cursor: 'pointer' }}>
                {cat.featured_image_path ? (
                  <img src={process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + cat.featured_image_path} alt="" style={{ width: 60, borderRadius: 6 }} />
                ) : (
                  <span style={{ color: '#aaa' }}>No image</span>
                )}
              </td>
              <td onClick={() => onEdit(cat)} style={{ cursor: 'pointer' }}>{truncateWords(cat.name)}</td>
              <td onClick={() => onEdit(cat)} style={{ cursor: 'pointer' }}>{truncateWords(cat.excerpt)}</td>
              <td onClick={() => onEdit(cat)} style={{ cursor: 'pointer' }}>{truncateWords(cat.description)}</td>
              <td>
                <i className="edit-btn fas fa-edit" onClick={() => onEdit(cat)} />
                <i className="delete-btn fas fa-trash" onClick={() => onDelete(cat.id)} />
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