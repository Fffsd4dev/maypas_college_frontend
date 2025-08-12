function getToken() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('admin_token');
  }
  return '';
}



export async function createCourse(data) {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/create`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to create course');
  return res.json();
}

// export async function createCourse(data) {
//   const token = getToken();
//   const formData = new FormData();
//   Object.entries(data).forEach(([key, value]) => {
//     formData.append(key, value);
//   });
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/create`, {
//     method: 'POST',
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData,
//   });
//   if (!res.ok) throw new Error('Failed to create course');
//   return res.json();
// }


export async function updateCourse(id, data) {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/update/?${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update course');
  return res.json();
}

export async function deleteCourse(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course/delete/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete course');
  return res.json();
}