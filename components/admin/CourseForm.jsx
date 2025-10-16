import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then(mod => mod.Editor),
  { ssr: false }
);

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

  // Handle dynamic course info fields
  const [courseInfo, setCourseInfo] = useState(
    safeInitial.course_info_name && safeInitial.course_info_value
      ? safeInitial.course_info_name.map((name, idx) => ({
          name,
          value: safeInitial.course_info_value[idx] || "",
        }))
      : [{ name: "", value: "" }]
  );

  // // TinyMCE loading state
  // const [editorsLoaded, setEditorsLoaded] = useState(false);
  // const [editorCount, setEditorCount] = useState(0);

  // // Calculate total editors (5 main + 2 per courseInfo)
  // const totalEditors = 5 + (courseInfo?.length ? courseInfo.length * 2 : 0);

  // // Reset editor count and loading state when courseInfo changes length or initial changes
  // useEffect(() => {
  //   setEditorCount(0);
  //   setEditorsLoaded(false);
  // }, [courseInfo.length, initial]);

  useEffect(() => {
    if (initial && Array.isArray(initial.course_data)) {
      setCourseInfo(
        initial.course_data.map(d => ({
          name: d.course_info_key || "",
          value: d.course_info_value || ""
        }))
      );
    } else if (initial && initial.course_info_name && initial.course_info_value) {
      setCourseInfo(
        initial.course_info_name.map((name, idx) => ({
          name,
          value: initial.course_info_value[idx] || "",
        }))
      );
    } else {
      setCourseInfo([{ name: "", value: "" }]);
    }
  }, [initial]);

  // Mark editors loaded as soon as the number of initialized editors matches the number rendered
  // useEffect(() => {
  //   if (editorCount >= totalEditors && totalEditors > 0) setEditorsLoaded(true);
  // }, [editorCount, totalEditors]);

  // const handleEditorInit = () => {
  //   setEditorCount(count => count + 1);
  // };

  const validate = () => {
    const errs = {};
    if (!form.course_category_id) errs.course_category_id = 'Programme is required';
    if (!form.title) errs.title = 'Title is required';
    if (!form.excerpt) errs.excerpt = 'Excerpt is required';
    if (!form.description) errs.description = 'Description is required';
    if (!form.price) errs.price = 'Price is required';
    if (!form.featured_image && !preview) errs.featured_image = 'Image is required';
    return Object.keys(errs).length === 0;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
        setErrors((errs) => ({ ...errs, featured_image: 'Image must be less than 2MB' }));
        setForm((f) => ({ ...f, featured_image: null }));
        setPreview('');
        return;
      }
      setForm((f) => ({ ...f, featured_image: file }));
      setPreview(URL.createObjectURL(file));
      setErrors((errs) => ({ ...errs, featured_image: undefined }));
    } else {
      setErrors((errs) => ({ ...errs, featured_image: 'Only image files allowed' }));
      setForm((f) => ({ ...f, featured_image: null }));
      setPreview('');
    }
  };

  const handleChange = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
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

  const tinymceApiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key';

//  // Only show loading spinner if editors are not loaded
  // if (!editorsLoaded) {
  //   return (
  //     <div style={{ textAlign: 'center', padding: '3rem' }}>
  //       <div className="spinner" />
  //       <div style={{ marginTop: 16 }}>Loading form...</div>
  //       <style jsx>{`
  //         .spinner {
  //           border: 4px solid #f3f3f3;
  //           border-top: 4px solid #4f8cff;
  //           border-radius: 50%;
  //           width: 40px;
  //           height: 40px;
  //           animation: spin 1s linear infinite;
  //           margin: 0 auto;
  //         }
  //         @keyframes spin {
  //           0% { transform: rotate(0deg);}
  //           100% { transform: rotate(360deg);}
  //         }
  //       `}</style>
  //     </div>
  //   );
  // }

  return (
    <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label>Programme</label>
        <select
          name="course_category_id"
          value={form.course_category_id}
          onChange={e => handleChange("course_category_id", e.target.value)}
          required
        >
          <option value="">Select Programme </option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Title</label>
        <Editor
          apiKey={tinymceApiKey}
          value={form.title}
          init={{
            menubar: false,
            toolbar:  'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
            plugins: [],
            placeholder: "Title",
            height: 150,
          }}
          onEditorChange={content => handleChange("title", content)}
          // onInit={handleEditorInit}
        />
      </div>
      <div className="form-group">
        <label>Excerpt</label>
        <Editor
          apiKey={tinymceApiKey}
          value={form.excerpt}
          init={{
            menubar: false,
            toolbar: 'undo redo | bold italic underline | removeformat',
            plugins: [],
            placeholder: "Excerpt",
            height: 150,
          }}
          onEditorChange={content => handleChange("excerpt", content)}
          // onInit={handleEditorInit}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <Editor
          apiKey={tinymceApiKey}
          value={form.description}
          init={{
            menubar: false,
             toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
            plugins: 'lists link',
            placeholder: "Description",
            height: 250,
          }}
          onEditorChange={content => handleChange("description", content)}
          // onInit={handleEditorInit}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <Editor
          apiKey={tinymceApiKey}
          value={form.price.toString()}
          init={{
            menubar: false,
            toolbar: 'undo redo | bold italic underline | removeformat',
            plugins: [],
            placeholder: "Price",
            height: 150,
          }}
          onEditorChange={content => handleChange("price", content.replace(/[^0-9.]/g, ""))}
          // onInit={handleEditorInit}
        />
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
          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, background: "#b9b9b9", padding: 8, borderRadius: 4 }}>
            <Editor
              apiKey={tinymceApiKey}
              value={ci.name}
              init={{
                menubar: false,
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | outdent indent | ' +
                  'removeformat | help',
                plugins: ['lists link'],
                placeholder: "Info Name",
                height: 150,
              }}
              onEditorChange={content => handleCourseInfoChange(idx, "name", content)}
              // onInit={handleEditorInit}
            />
            <Editor
              apiKey={tinymceApiKey}
              value={ci.value}
              init={{
                menubar: false,
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                plugins: ['lists link'],
                placeholder: "Info Value",
                height: 250,
              }}
              onEditorChange={content => handleCourseInfoChange(idx, "value", content)}
              // onInit={handleEditorInit}
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