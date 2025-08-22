const API_BASE = 'http://localhost:4000';

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUser(name) {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!res.ok) {
    let errMsg = 'Failed to create user';
    try {
      const body = await res.json();
      if (body?.error) errMsg = body.error;
    } catch (_) {}
    throw new Error(errMsg);
  }
  return res.json();
}
