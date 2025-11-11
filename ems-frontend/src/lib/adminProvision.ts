import { api } from "./api";
import type { RegisterAdminRequest, AuthUserDto } from "../types/auth";
import type { UserServiceDto, DeviceServiceUserDto } from "../types/user";

// 1) Auth: doar ADMIN are voie la acest endpoint (tokenul adminului e trimis automat în header "app-auth")
async function authRegisterAdmin(payload: RegisterAdminRequest): Promise<AuthUserDto> {
    const { data } = await api.post<AuthUserDto>("/api/auth/register-admin", payload);
    return data; // { id, username, userRole }
}

// 2) UserService: profilul complet (protejat cu ForwardAuth)
async function userServiceCreate(dto: UserServiceDto) {
    const { data } = await api.post("/api/users", dto);
    return data;
}

// 3) DeviceService: înregistrăm userul (doar id)
async function deviceServiceEnsureUser(id: number) {
    const payload: DeviceServiceUserDto = { id };
    const { data } = await api.post("/api/devices/user", payload);
    return data;
}

export async function createUserAsAdmin(
    authReq: RegisterAdminRequest,                    // { username, password, userRole: "USER" | "ADMIN" }
    profile: Omit<UserServiceDto, "id">               // { firstName, lastName, address, email }
): Promise<{ id: number; role: "ADMIN" | "USER" }> {
    const created = await authRegisterAdmin(authReq);
    await userServiceCreate({ id: created.id, ...profile });
    await deviceServiceEnsureUser(created.id);
    return { id: created.id, role: created.userRole };
}
