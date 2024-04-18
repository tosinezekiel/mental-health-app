export type UserType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: "USER" | "ADMIN";
}
