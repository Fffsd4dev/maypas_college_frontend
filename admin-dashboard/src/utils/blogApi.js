export async function fetchBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/pages`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export async function createBlog(data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/content/page/create`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to create blog');
  return res.json();
}

export async function updateBlog(id, data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/page/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update blog');
  return res.json();
}

export async function deleteBlog(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/pages/delete/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete blog');
  return res.json();
}