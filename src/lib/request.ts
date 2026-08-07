
const API_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

type resType = {
    data: Response
    status: string
}

export const getReq = async (endpoint: string) => {
    const data = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        }
    });

    if (!data.ok) {
        throw new Error('Failed to get request');
    }

    const response = await data.json();
    return response as unknown as resType
};

export const postReq = async (endpoint: string, payload: unknown) => {
    const data = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload)
    });

    if (!data.ok) {
        throw new Error("Failed to post request");
    }

    const response = await data.json();
    return response as unknown as resType
};

export const updateReq = async (endpoint: string, payload: unknown) => {
    const data = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload)
    });

    if (!data.ok) {
        throw new Error('Failed to update request');
    }

    const response = await data.json();
    return response as unknown as resType
};

export const deleteReq = async (endpoint: string) => {
    const data = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })
    if (!data.ok) {
        throw new Error('Failed to delete request');
    }
    const response = await data.json();
    return response as unknown as resType
}