import { useState, useRef, useEffect } from 'react';

export default function CourseCategoryForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(
    initial || {
      name: '',
      excerpt: '',
      description: '',
      featured_image: null,
    }
  );
      useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(initial?.featured_image || '');
  const fileRef = useRef();

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.excerpt) errs.excerpt = 'Excerpt is required';
    if (!form.description) errs.description = 'Description is required';
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
      setForm((f) => ({ ...f, featured_image: URL.createObjectURL(file) }));
      setPreview(URL.createObjectURL(file));
    } else {
      setErrors((errs) => ({ ...errs, featured_image: 'Only image files allowed' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        {errors.name && <span className="err">{errors.name}</span>}
      </div>
      <div>
        <label>Excerpt</label>
        <input name="excerpt" value={form.excerpt} onChange={handleChange} required />
        {errors.excerpt && <span className="err">{errors.excerpt}</span>}
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} required />
        {errors.description && <span className="err">{errors.description}</span>}
      </div>
      <div>
        <label>Featured Image</label>
        <input type="file" accept="image/*" ref={fileRef} onChange={handleImage} />
        {preview && <img src={preview} alt="preview" style={{ width: 100, marginTop: 8, borderRadius: 6 }} />}
        {errors.featured_image && <span className="err">{errors.featured_image}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn" disabled={loading}>
          {loading
            ? initial
              ? 'Updating Course Category...'
              : 'Creating Course Category...'
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
        .admin-form { background: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-bottom: 2rem; }
        label { display: block; font-weight: 500; margin-bottom: 0.4rem; }
        input, textarea { width: 100%; padding: 0.6rem; border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 1rem; font-size: 1rem; }
        .form-actions { display: flex; gap: 1rem; }
        .save-btn { background: #4f8cff; color: #fff; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; }
        .save-btn[disabled] { background: #b3d1ff !important; color: #fff !important; cursor: not-allowed !important; }
        .cancel-btn { background: #eee; color: #222; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; }
        .cancel-btn[disabled] { background: #f0f0f0 !important; color: #aaa !important; cursor: not-allowed !important; }
        .err { color: #ff4f4f; font-size: 0.95em; }
      `}</style>
    </form>
  );
}