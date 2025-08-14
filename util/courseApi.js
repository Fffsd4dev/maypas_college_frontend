function getToken() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('admin_token');
  }
  return '';
}

export async function fetchCourses() {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/courses/get`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch courses list');
  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
}

export async function createCourse(data) {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

    
  // Log FormData entries
  for (let pair of formData.entries()) {
    console.log('FormData:', pair[0], ':', pair[1]);
    
  }

  console.log('Creating course with FormData:');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/course/create`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  console.log(res);
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/course/update/?${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update course');
  return res.json();
}

export async function deleteCourse(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contents/v1/course/delete/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete course');
  return res.json();
}