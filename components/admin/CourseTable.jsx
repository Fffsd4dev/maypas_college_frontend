import { useState } from 'react';

export default function CourseTable({ courses, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Course Category</th>
            <th>Title</th>
            <th>Excerpt</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>No courses found.</td>
            </tr>
          )}
          {courses.map((course) => (
            <tr key={course.id}>
              <td>
                {course.featured_image_path ? (
                  <img src={process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + course.featured_image_path} alt="" style={{ width: 60, borderRadius: 6 }} />
                ) : (
                 <span style={{ color: '#000' }}>No image</span>
                )}
              </td>
              <td>{course.category?.name || 'No category'}</td>
              <td dangerouslySetInnerHTML={{ __html: course.title }} />
              <td dangerouslySetInnerHTML={{ __html: course.excerpt }} />
              <td>£ {course.price}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(course)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>
        {`
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
      `}
      </style>
    </div>
  );
}