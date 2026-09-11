const configuredApiUrl = import.meta.env.VITE_API_BASE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

if (!configuredApiUrl || !API_KEY) {
  throw new Error(
    "Missing VITE_API_BASE_URL or VITE_API_KEY. Configure them in the deployment environment."
  );
}

const API_URL = configuredApiUrl.replace(/\/+$/, "");
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
      "Authorization": `Bearer ${API_KEY}`,
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
      "Authorization": `Bearer ${API_KEY}`,
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
      "Authorization": `Bearer ${API_KEY}`,
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
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
    },
  });

  if (!data.ok) {
    throw new Error(`DELETE ${url} failed with status ${data.status}`);
  }

  const response = await data.json();

  return response as T;
};