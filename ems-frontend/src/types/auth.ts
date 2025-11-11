export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    username?: string;
    role?: "ADMIN" | "USER";
    id?: number | string;
};
export type UserRole = "ADMIN" | "USER";

export type RegisterAdminRequest = {
    username: string;
    password: string;
    userRole: UserRole; // doar ADMIN sau USER
};

export type AuthUserDto = {
    id: number;         // id generat în auth
    username: string;
    userRole: UserRole;
};
