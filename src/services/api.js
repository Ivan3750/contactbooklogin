export async function registerUser(data) {
  const res = await fetch(`https://connections-api.goit.global/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Реєстрація не вдалася");
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`https://connections-api.goit.global/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Вхід не вдався");
  return res.json();
}

export async function getCurrentUser(token) {
  const res = await fetch(`https://connections-api.goit.global/users/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Неавторизовано");
  return res.json();
}

export async function logoutUser(token) {
  const res = await fetch(`https://connections-api.goit.global/users/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Вихід не вдався");
  return res.json();
}
