function getToken() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('admin_token');
  }
  return '';
}

export async function fetchCourses() {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/courses/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  if (!res.ok) throw new Error('Failed to fetch courses list');
  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
}

export async function createCourse(data) {
  const token = getToken();
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // Handle course_info_name[] and course_info_value[] as arrays
    if (key === "course_info_name[]" && Array.isArray(value)) {
      value.forEach(val => formData.append("course_info_name[]", val));
    } else if (key === "course_info_value[]" && Array.isArray(value)) {
      value.forEach(val => formData.append("course_info_value[]", val));
    } else if (key === "featured_image" && value) {
      // Handle file upload
      if (value instanceof File) {
        formData.append("featured_image", value);
      } else if (Array.isArray(value)) {
        value.forEach(file => formData.append("featured_image", file));
      }
    } else {
      formData.append(key, value);
    }
  });

  // Log FormData entries
  for (let pair of formData.entries()) {
    console.log('FormData:', pair[0], ':', pair[1]);
  }
  console.log(data);

  console.log('Creating course with FormData:');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/course/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: formData,
  });
  console.log(res);
  if (!res.ok) throw new Error('Failed to create course');
  return res.json();
}

export async function updateCourse(id, data) {
  const token = getToken();
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "course_info_name[]" && Array.isArray(value)) {
      value.forEach(val => formData.append("course_info_name[]", val));
    } else if (key === "course_info_value[]" && Array.isArray(value)) {
      value.forEach(val => formData.append("course_info_value[]", val));
    } else if (key === "featured_image" && value) {
      if (value instanceof File) {
        formData.append("featured_image", value);
      } else if (Array.isArray(value)) {
        value.forEach(file => formData.append("featured_image", file));
      }
    } else {
      formData.append(key, value);
    }
  });

  // Log FormData entries for debugging
  for (let pair of formData.entries()) {
    console.log('FormData:', pair[0], ':', pair[1]);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/course/update/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update course');
  return res.json();
}

export async function deleteCourse(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/course/delete/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete course');
  return res.json();
}