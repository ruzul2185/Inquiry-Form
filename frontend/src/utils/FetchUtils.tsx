import supabase from '../auth/supabaseClient';

export const getAccessToken = async (): Promise<string> => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) throw new Error("No access token found");
  return token;
};

export const fetchGET = async <T = unknown>(url: string): Promise<T> => {
  const token = await getAccessToken();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized - invalid or expired token");
    }
    throw new Error(`Fetch error: ${res.statusText}`);
  }

  const data = (await res.json()) as T;
  return data;
};

export const fetchPOST = async <T = unknown>(
  url: string,
  body: Record<string, any>
): Promise<T> => {
  const token = await getAccessToken();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`POST failed: ${res.statusText}`);
  return (await res.json()) as T;
};

export const fetchPATCH = async <T = unknown>(
  url: string,
  body: Record<string, any>
): Promise<T> => {
  const token = await getAccessToken();

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`PATCH failed: ${res.statusText}`);
  return (await res.json()) as T;
};

export const fetchDELETE = async <T = unknown>(
  url: string
): Promise<T> => {
  const token = await getAccessToken();

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(`DELETE failed: ${res.statusText}`);
  return (await res.json()) as T;
};
