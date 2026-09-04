const API_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export const getReq = async <T>(
  endpoint: string
): Promise<T> => {
  const data = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
  });

  if (!data.ok) {
    throw new Error("Failed to get request");
  }

  const response = await data.json();

  return response as T;
};

export const postReq = async <T>(
  endpoint: string,
  payload: unknown
): Promise<T> => {
  const data = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!data.ok) {
    throw new Error("Failed to post request");
  }

  const response = await data.json();

  return response as T;
};

export const updateReq = async <T>(
  endpoint: string,
  payload: unknown
): Promise<T> => {
  const data = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!data.ok) {
    throw new Error("Failed to update request");
  }

  const response = await data.json();

  return response as T;
};

export const deleteReq = async <T>(
  endpoint: string
): Promise<T> => {
  const data = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
    },
  });

  if (!data.ok) {
    throw new Error("Failed to delete request");
  }

  const response = await data.json();

  return response as T;
};