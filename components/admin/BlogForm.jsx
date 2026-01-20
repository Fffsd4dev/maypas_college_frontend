import { useState, useRef, useEffect } from 'react';

export default function BlogForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(
    initial || {
      title: '',
      slug: '',
      content: '',
      featured_image_path: null,
    }
  );
    useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

const [errors, setErrors] = useState({});
const [preview, setPreview] = useState(initial?.student_photo ? (
    initial.featured_image_path.startsWith('http')
      ? initial.featured_image_path
      : process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + initial.student_photo
  ) : '');  const fileRef = useRef();

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
      setForm((f) => ({ ...f, featured_image_path: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setErrors((errs) => ({ ...errs, featured_image_path: 'Only image files allowed' }));
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
        {errors.featured_image_path && <span className="err">{errors.featured_image_path}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn" disabled={loading}>
          {loading
            ? initial
              ? 'Updating blog...'
              : 'Creating blog...'
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