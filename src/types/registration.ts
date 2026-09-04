export interface registrationInfo {
    email: string;
    password: string;
//    phoneNumber: string;
//     userName: string;
//     address: string;
//     lastLogin: string;
}

export interface registrationType {
    success: boolean;
    message: string;
    data?: registrationInfo & { id?: string };
}