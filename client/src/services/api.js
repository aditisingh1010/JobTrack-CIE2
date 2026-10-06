const API = 'http://localhost:5000/api';

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  const r = await fetch(API + path, {
    ...options,
    headers,
  });

  const j = await r.json();
  if (!r.ok) throw new Error(j.message || 'Request failed');
  return j.data;
}

export const getJobs = () => request('/jobs');
export const getJob = (id) => request('/jobs/' + id);
export const getApplications = () => request('/applications');

export const createApplication = async (data) => {
  const response = await fetch(API + '/applications', {
    method: 'POST',
    body: data,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Application failed');
  }

  return result.data;
};

export const updateApplication = (id, data) =>
  request('/applications/' + id, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteApplication = (id) =>
  request('/applications/' + id, { method: 'DELETE' });
