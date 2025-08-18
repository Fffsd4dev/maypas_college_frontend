import { useState, useRef, useEffect } from 'react';

export default function CourseForm({ initial, categories, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(
    initial || {
      course_category_id: '',
      title: '',
      excerpt: '',
      description: '',
      price: '',
      featured_image_path: null,
    }
  );
      useEffect(() => {
      if (initial) setForm(initial);
    }, [initial]);
  
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(initial?.featured_image_path || '');
  const fileRef = useRef();

    const validate = () => {
    const errs = {};
    if (!form.course_category_id) errs.course_category_id = 'Category is required';
    if (!form.title) errs.title = 'Title is required';
    if (!form.excerpt) errs.excerpt = 'Excerpt is required';
    if (!form.description) errs.description = 'Description is required';
    if (!form.price) errs.price = 'Price is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImage = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    setForm((f) => ({ ...f, featured_image: file })); // <-- use featured_image
    setPreview(URL.createObjectURL(file));
  } else {
    setErrors((errs) => ({ ...errs, featured_image: 'Only image files allowed' }));
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div>
          <label>Category</label>
          <select
            name="course_category_id"
            value={form.course_category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
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
        {errors.featured_image_path && <span className="err">{errors.featured_image_path}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn" disabled={loading}>
          {loading
            ? initial
              ? 'Updating Course...'
              : 'Creating Course...'
            : 'Proceed'}
        </button>
         {onCancel && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
            style={loading ? { background: '#f0f0f0', color: '#aaa', cursor: 'not-allowed' } : {}}
          >
            Cancel
          </button>
        )}
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
        input, textarea, select {
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
          .save-btn[disabled] { background: #b3d1ff !important; color: #fff !important; cursor: not-allowed !important; }
        .cancel-btn {
          background: #eee;
          color: #222;
          border: none;
          padding: 0.7rem 2rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
        }
          .cancel-btn[disabled] { background: #f0f0f0 !important; color: #aaa !important; cursor: not-allowed !important; }
        .err { color: #ff4f4f; font-size: 0.95em; }
        // @media (max-width: 700px) {
        //   .form-row { flex-direction: column; gap: 0; }
        // }
      `}</style>
    </form>
  );
}