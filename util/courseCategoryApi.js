function getToken() {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('admin_token');
    console.log(token);
    return token;
  }
  return '';
}

export async function createCategory(data) {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/category/create`, {
    method: 'POST',
     headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: formData,
  });
  console.log(res);
  if (!res.ok) throw new Error('Failed to create category');
  
  return res.json();
}

export async function getCategories() {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/course/categories`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function updateCategory(id, data) {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/category/update/${id}`, {
    method: 'POST',
     headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: formData,
  });
  if (!res.ok ) throw new Error('Failed to update category');
  return res.json();
}

export async function deleteCategory(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/category/delete/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete category');
  return res.json();
}