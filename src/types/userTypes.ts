export type UserType = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: "USER" | "ADMIN";
}
