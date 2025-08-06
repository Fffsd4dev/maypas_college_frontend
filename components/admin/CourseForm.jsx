import { useState, useRef } from 'react';

export default function CourseForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      course_category_id: '',
      title: '',
      excerpt: '',
      description: '',
      price: '',
      featured_image: '',
    }
  );
  const [preview, setPreview] = useState(initial?.featured_image || '');
  const fileRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((f) => ({ ...f, featured_image: URL.createObjectURL(file) }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div>
          <label>Category ID</label>
          <input name="course_category_id" value={form.course_category_id} onChange={handleChange} required />
        </div>
        <div>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label>Excerpt</label>
          <input name="excerpt" value={form.excerpt} onChange={handleChange} required />
        </div>
        <div>
          <label>Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required />
        </div>
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} required />
      </div>
      <div>
        <label>Featured Image</label>
        <input type="file" accept="image/*" ref={fileRef} onChange={handleImage} />
        {preview && <img src={preview} alt="preview" style={{ width: 100, marginTop: 8, borderRadius: 6 }} />}
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn">Save</button>
        {onCancel && <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>}
      </div>
      <style jsx>{`
        .admin-form {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          margin-bottom: 2rem;
        }
        .form-row {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
        }
        .form-row > div { flex: 1; }
        label { display: block; font-weight: 500; margin-bottom: 0.4rem; }
        input, textarea {
          width: 100%;
          padding: 0.6rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          margin-bottom: 1rem;
          font-size: 1rem;
        }
        .form-actions {
          display: flex;
          gap: 1rem;
        }
        .save-btn {
          background: #4f8cff;
          color: #fff;
          border: none;
          padding: 0.7rem 2rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
        }
        .cancel-btn {
          background: #eee;
          color: #222;
          border: none;
          padding: 0.7rem 2rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
        }
        @media (max-width: 700px) {
          .form-row { flex-direction: column; gap: 0; }
        }
      `}</style>
    </form>
  );
}