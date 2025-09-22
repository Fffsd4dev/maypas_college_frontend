export default function TestimonialTable({ testimonials, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Student Name</th>
            <th>Course</th>
            <th>Rating</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>No testimonials found.</td>
            </tr>
          )}
          {testimonials.map((testimonial) => (
            <tr key={testimonial.id}>
              <td>
                {testimonial.student_photo ? (
                  <img src={process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + testimonial.student_photo} alt="" style={{ width: 60, borderRadius: 6 }} />
                ) : (
                  <span style={{ color: '#aaa' }}>No image</span>
                )}
              </td>
              <td>{testimonial.student_name}</td>
              <td>{testimonial.course}</td>
 <td>
                {[1,2,3,4,5].map(n => (
                  <i
                    key={n}
                    className="fas fa-star"
                    style={{
                      color: n <= Number(testimonial.rating) ? "#FFD700" : "#ccc",
                      marginRight: 2
                    }}
                  />
                ))}
              </td>              <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{testimonial.content}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(testimonial)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(testimonial.id)}>Delete</button>
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