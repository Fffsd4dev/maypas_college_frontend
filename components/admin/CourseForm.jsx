import { useState, useRef, useEffect } from 'react';

export default function CourseForm({ initial = {}, categories = [], onCancel, loading, onSubmit }) {
  const safeInitial = initial || {};

  const [form, setForm] = useState({
    course_category_id: safeInitial.course_category_id || "",
    title: safeInitial.title || "",
    excerpt: safeInitial.excerpt || "",
    description: safeInitial.description || "",
    price: safeInitial.price || "",
    featured_image: safeInitial.featured_image || null,
  });

  const [errors, setErrors] = useState({});
const [preview, setPreview] = useState(
  safeInitial?.featured_image_path
    ? safeInitial?.featured_image_path.startsWith('http')
      ? safeInitial.featured_image_path
      : process.env.NEXT_PUBLIC_API_BASE_URL + '/storage/' + safeInitial.featured_image_path
    : ''
);
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
  const handleImage = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    setForm((f) => ({ ...f, featured_image: file })); // <-- use featured_image
    setPreview(URL.createObjectURL(file));
  } else {
    setErrors((errs) => ({ ...errs, featured_image: 'Only image files allowed' }));
  }
};


  // Handle dynamic course info fields
  const [courseInfo, setCourseInfo] = useState(
    safeInitial.course_info_name && safeInitial.course_info_value
      ? safeInitial.course_info_name.map((name, idx) => ({
          name,
          value: safeInitial.course_info_value[idx] || "",
        }))
      : [{ name: "", value: "" }]
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "featured_image") {
      setForm((f) => ({ ...f, featured_image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleCourseInfoChange = (idx, field, value) => {
    setCourseInfo((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const addCourseInfo = () => {
    setCourseInfo((prev) => [...prev, { name: "", value: "" }]);
  };

  const removeCourseInfo = (idx) => {
    setCourseInfo((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data for API
    const data = {
      ...form,
      "course_info_name[]": courseInfo.map((ci) => ci.name),
      "course_info_value[]": courseInfo.map((ci) => ci.value),
    };
        if (validate()) {
      

    onSubmit(data);
        }
  };



  return (
    <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label>Category</label>
        <select
          name="course_category_id"
          value={form.course_category_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Excerpt</label>
        <input name="excerpt" value={form.excerpt} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input name="price" type="number" value={form.price} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Featured Image</label>
        <input type="file" accept="image/*" ref={fileRef} onChange={handleImage} />
        {preview && <img src={preview} alt="preview" style={{ width: 100, marginTop: 8, borderRadius: 6 }} />}
        {errors.featured_image_path && <span className="err">{errors.featured_image_path}</span>}
      </div>

      <div className="form-group">
        <label>Course Info</label>
        {courseInfo.map((ci, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              type="text"
              placeholder="Info Name"
              value={ci.name}
              onChange={(e) => handleCourseInfoChange(idx, "name", e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Info Value"
              value={ci.value}
              onChange={(e) => handleCourseInfoChange(idx, "value", e.target.value)}
              required
              style={{ flex: 2 }}
            />
            <button
              type="button"
              onClick={() => removeCourseInfo(idx)}
              disabled={courseInfo.length === 1}
              style={{
                background: "#ff4f4f",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "0 10px",
                cursor: "pointer",
              }}
              title="Remove"
            >
              &times;
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addCourseInfo}
          style={{
            background: "#4f8cff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "0.3rem 1rem",
            marginTop: 4,
            cursor: "pointer",
          }}
        >
          + Add Another
        </button>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" className="btn btn-border" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      </div>
      <style jsx>{`
        .admin-form {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          max-width: 600px;
          margin: 0 auto 2rem auto;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
        }
        .form-group {
          margin-bottom: 1.2rem;
        }
        .form-group label {
          font-weight: 600;
          margin-bottom: 0.3rem;
          display: block;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .btn {
          background: #4f8cff;
          color: #fff;
          border: none;
          padding: 0.7rem 2rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
        }
        .btn.btn-border {
          background: #fff;
          color: #4f8cff;
          border: 1px solid #4f8cff;
        }
        .btn[disabled] {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
}