// User type
export type User = {
    id: number;
    username: string;
    password: string;

    // user or elevated role
    role: "user" | "super";
}

export const users: User[] = [];