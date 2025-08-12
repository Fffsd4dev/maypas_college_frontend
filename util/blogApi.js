function getToken() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('admin_token');
  }
  return '';
}

export async function fetchBlogs() {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs/get`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch blogs');
  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
}

export async function createBlog(data) {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/blog/create`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to create blog');
  return res.json();
}

export async function updateBlog(id, data) {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/blog/update/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update blog');
  return res.json();
}

export async function deleteBlog(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/blog/delete/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete blog');
  return res.json();
}