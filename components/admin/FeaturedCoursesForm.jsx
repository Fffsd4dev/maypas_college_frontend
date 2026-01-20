import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then(mod => mod.Editor),
  { ssr: false }
);

export default function FeaturedCoursesForm({ initial = {}, courses = [], onCancel, loading, onSubmit }) {
  const safeInitial = initial || {};

  const [form, setForm] = useState({
    course_id: safeInitial.course_id || "",
    priority_number: safeInitial.priority_number || "",
    
  });

  const [errors, setErrors] = useState({});
    



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



  // Mark editors loaded as soon as the number of initialized editors matches the number rendered
  // useEffect(() => {
  //   if (editorCount >= totalEditors && totalEditors > 0) setEditorsLoaded(true);
  // }, [editorCount, totalEditors]);

  // const handleEditorInit = () => {
  //   setEditorCount(count => count + 1);
  // };

  const validate = () => {
    const errs = {};
    if (!form.course_id) errs.course_id = 'Course is required';
    if (!form.priority_number) errs.priority_number = 'Priority Number is required';
   
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

 
  const handleChange = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

 


  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data for API
    const data = {
      ...form,
    };
    if (validate()) {
      onSubmit(data);
    }
  };


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
        <label>Course</label>
        <select
          name="course_id"
          value={form.course_id}
          onChange={e => handleChange("course_id", e.target.value)}
          required
        >
          <option value="">Select Course </option>
          {courses.map((cat) => (
            <option value={cat.id} key={cat.id} dangerouslySetInnerHTML={{ __html: cat.title }} />
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Priority Number</label>
        <input name="priority_number" value={form.priority_number} onChange={e => handleChange("priority_number", e.target.value)} required />
        {errors.priority_number && <span className="err">{errors.priority_number}</span>}
     
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