import { useState } from 'react';

export default function UserForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(
    initial || {
      fName: '',
      lName: '',
      email: '',
    }
  );
  const [errors, setErrors] = useState({});


  const validate = () => {
    const errs = {};
    if (!form.fName) errs.fName = 'First name is required';
    if (!form.lName) errs.lName = 'Last name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errs.email = 'Invalid email';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input name="fName" value={form.fName} onChange={handleChange} required />
        {errors.fName && <span className="err">{errors.fName}</span>}
      </div>
      <div>
        <label>Last Name</label>
        <input name="lName" value={form.lName} onChange={handleChange} required />
        {errors.lName && <span className="err">{errors.lName}</span>}
      </div>
      <div>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} required />
        {errors.email && <span className="err">{errors.email}</span>}
      </div>
     
      <div className="form-actions">
          <button type="submit" className="save-btn" disabled={loading}>
          {loading
            ? initial
              ? 'Updating user...'
              : 'Creating user...'
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
        input { width: 100%; padding: 0.6rem; border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 1rem; font-size: 1rem; }
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