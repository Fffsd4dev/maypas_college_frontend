import { useState, useRef, useEffect } from 'react';
import { fetchCourses } from '@/util/courseApi';

export default function TestimonialForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(
    initial || {
      student_name: '',
      course_id: '',
      content: '',
      rating: '',
      student_photo: null,
      is_approved: '0',
    }
  );
  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(initial?.student_photo ? (
    initial.student_photo.startsWith('http')
      ? initial.student_photo
      : process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + initial.student_photo
  ) : '');
  const fileRef = useRef();

  // Fetch courses for dropdown
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses()
      .then((data) => {
        const arr = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setCourses(arr);
      })
      .catch(() => setCourses([]));
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.student_name) errs.student_name = 'Student name is required';
    if (!form.course_id) errs.course_id = 'Course is required';
    if (!form.content) errs.content = 'Content is required';
    if (!form.rating || ![1,2,3,4,5].includes(Number(form.rating))) errs.rating = 'Rating must be 1-5';
    if (form.is_approved !== '1' && form.is_approved !== '0') errs.is_approved = 'Approval is required';

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
      setForm((f) => ({ ...f, student_photo: file }));
      setPreview(URL.createObjectURL(file));
    } else if (file) {
      setErrors((errs) => ({ ...errs, student_photo: 'Only image files allowed' }));
    }
  };

  const handleStarClick = (n) => {
    setForm((f) => ({ ...f, rating: String(n) }));
    setErrors((errs) => ({ ...errs, rating: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div>
        
        <label>Student Photo
           {/* <span style={{ color: "#888", fontWeight: 400 }}>(required)</span> */}
           </label>
           {preview && <img src={preview} alt="preview" style={{ width: 100, marginTop: 8, borderRadius: 6 }} />}
        <input type="file" accept="image/*" ref={fileRef} onChange={handleImage} />
        {errors.student_photo && <span className="err">{errors.student_photo}</span>}
      </div>

      <div>
        <label>Student Name</label>
        <input name="student_name" value={form.student_name} onChange={handleChange} required />
        {errors.student_name && <span className="err">{errors.student_name}</span>}
      </div>
      <div>
        <label>Course</label>
        <select name="course_id" value={form.course_id} onChange={handleChange} required>
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option value={c.id} key={c.id}>{c.title}</option>
          ))}
        </select>
        {errors.course_id && <span className="err">{errors.course_id}</span>}
      </div>
      <div>
        <label>Content</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={3} required />
        {errors.content && <span className="err">{errors.content}</span>}
      </div>
      
      <div>
        <label>Approve</label>
        <select name="is_approved" value={form.is_approved} onChange={handleChange} required>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
        {errors.is_approved && <span className="err">{errors.is_approved}</span>}
      </div>
      <div>
        <label>Rating</label>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
          {[1,2,3,4,5].map((n) => (
            <i
              key={n}
              className={`fas fa-star`}
              style={{
                color: n <= Number(form.rating) ? "#FFD700" : "#ccc",
                fontSize: "1.5em",
                cursor: "pointer",
                transition: "color 0.2s"
              }}
              onClick={() => handleStarClick(n)}
              aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
            />
          ))}
          <span style={{ marginLeft: 8, fontWeight: 500 }}>
            {form.rating ? `${form.rating} / 5` : ""}
          </span>
        </div>

        {errors.rating && <span className="err">{errors.rating}</span>}
      </div>


      <div className="form-actions">
        <button type="submit" className="save-btn" disabled={loading}>
          {loading
            ? initial
              ? 'Updating testimonial...'
              : 'Creating testimonial...'
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
        input, textarea, select { width: 100%; padding: 0.6rem; border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 1rem; font-size: 1rem; }
        .form-actions { display: flex; gap: 1rem; }
        .save-btn { background: #4f8cff; color: #fff; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; }
        .save-btn[disabled] { background: #b3d1ff !important; color: #fff !important; cursor: not-allowed !important; }
        .cancel-btn { background: #eee; color: #222; border: none; padding: 0.7rem 2rem; border-radius: 4px; font-weight: 600; cursor: pointer; }
        .cancel-btn[disabled] { background: #f0f0f0 !important; color: #aaa !important; cursor: not-allowed !important; }
        .err { color: #ff4f4f; font-size: 0.95em; }
      `}</style>
      {/* Font Awesome CDN for star icons (if not globally loaded) */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </form>
  );
}