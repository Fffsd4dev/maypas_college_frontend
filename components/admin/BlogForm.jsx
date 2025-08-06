import { useState, useRef } from 'react';

export default function BlogForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      title: '',
      slug: '',
      content: '',
      featured_image: '',
    }
  );
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(initial?.featured_image || '');
  const fileRef = useRef();

  const validate = () => {
    const errs = {};
    if (!form.title) errs.title = 'Title is required';
    if (!form.slug) errs.slug = 'Slug is required';
    if (!form.content) errs.content = 'Content is required';
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
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />
        {errors.title && <span className="err">{errors.title}</span>}
      </div>
      <div>
        <label>Slug</label>
        <input name="slug" value={form.slug} onChange={handleChange} required />
        {errors.slug && <span className="err">{errors.slug}</span>}
      </div>
      <div>
        <label>Content</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={3} required />
        {errors.content && <span className="err">{errors.content}</span>}
      </div>
      <div>
        <label>Featured Image</label>
        <input type="file" accept="image/*" ref={fileRef} onChange={handleImage} />
        {preview && <img src={preview} alt="preview" style={{ width: 100, marginTop: 8, borderRadius: 6 }} />}
        {errors.featured_image && <span className="err">{errors.featured_image}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn">Save</button>
        {onCancel && <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>}
      </div>
      <style jsx>{`
        .admin-form { background: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-bottom: 2rem; }
        label { display: block; font-weight: 500; margin-bottom: 0.4rem; }
        input, textarea { width: 100%; padding: 0.6rem; border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 1rem; font-size: 1rem; }
        .form-actions { display: flex; gap: 1rem; }
        .save-btn { background: #4f8cff; color: #fff; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; }
        .cancel-btn { background: #eee; color: #222; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; }
        .err { color: #ff4f4f; font-size: 0.95em; }
      `}</style>
    </form>
  );
}