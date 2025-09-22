function getToken() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('admin_token');
  }
  return '';
}

export async function fetchTestimonials() {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/testimonial/get/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
}

export async function createTestimonial(data) {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Log FormData entries
  for (let pair of formData.entries()) {
    console.log('FormData:', pair[0], ':', pair[1]);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/testimonial/create`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, accept: 'application/json' }, 
    body: formData,
  });
  console.log(res);
  if (!res.ok) throw new Error('Failed to update testimonial');
  return res.json();
}

export async function updateTestimonial(id, data) {
  const token = getToken();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/testimonial/update/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, accept: 'application/json' },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update testimonial');
  return res.json();
}

export async function deleteTestimonial(id) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/contents/testimonial/delete/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete testimonial');
  return res.json();
}