const API_URL = "/api";
const getApiUrl = (endpoint: string) =>
  `${API_URL}/${endpoint.replace(/^\/+/, "")}`;

export const getReq = async <T>(
  endpoint: string
): Promise<T> => {
  const url = getApiUrl(endpoint);
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.ok) {
    throw new Error(`GET ${url} failed with status ${data.status}`);
  }

  const response = await data.json();

  return response as T;
};

export const postReq = async <T>(
  endpoint: string,
  payload: unknown
): Promise<T> => {
  const url = getApiUrl(endpoint);
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!data.ok) {
    throw new Error(`POST ${url} failed with status ${data.status}`);
  }

  const response = await data.json();

  return response as T;
};

export const updateReq = async <T>(
  endpoint: string,
  payload: unknown
): Promise<T> => {
  const url = getApiUrl(endpoint);
  const data = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!data.ok) {
    throw new Error(`PUT ${url} failed with status ${data.status}`);
  }

  const response = await data.json();

  return response as T;
};

export const deleteReq = async <T>(
  endpoint: string
): Promise<T> => {
  const url = getApiUrl(endpoint);
  const data = await fetch(url, {
    method: "DELETE",
  });

  if (!data.ok) {
    throw new Error(`DELETE ${url} failed with status ${data.status}`);
  }

  const response = await data.json();

  return response as T;
};