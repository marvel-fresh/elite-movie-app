import { getReq, postReq } from "@/lib/request";
import type { registrationInfo, registrationType } from "@/types/registration";
import { createId } from "@/util";

const STORAGE_KEY = "registeredUsers";

const loadStoredUsers = (): registrationInfo[] => {
    if (typeof window === "undefined") {
        return [];
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return [];
    }

    try {
        return JSON.parse(stored) as registrationInfo[];
    } catch {
        return [];
    }
};

const saveStoredUsers = (users: registrationInfo[]) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
};

const userEmail = (email: string) => email.trim().toLowerCase();

export const getRegistrations = async () => {
    const data = await getReq("/registrations");
    return data as unknown as registrationInfo[];
};

export const saveRegistration = async (payload: registrationInfo): Promise<registrationType> => {
    const email = userEmail(payload.email);
    const password = payload.password.trim();

    if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters long." };
    }

    const reqPayload = {
        id: createId(),
        email,
        password,
    };

    try {
        await postReq("/registrations", reqPayload);

        return {
            success: true,
            message: "Registration successful.",
        };
    } catch (error) {
        console.error(error);
        const users = loadStoredUsers();
        const existing = users.some((user) => user.email === email);

        if (!existing) {
            users.push({ email, password });
            saveStoredUsers(users);
        }

        return {
            success: true,
            message: "Registration saved locally because the server is unavailable.",
        };
    }
};