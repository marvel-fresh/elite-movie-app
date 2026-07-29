
const API_URL = 'http://localhost:5000';

type resType = {
    data: Response
    status: string
}

export const getReq = async (endpoint: string) => {
    const data = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
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
            'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
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
    })
    if (!data.ok) {
        throw new Error('Failed to delete request');
    }
    const response = await data.json();
    return response as unknown as resType
}