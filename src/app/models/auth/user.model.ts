export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    registerDate: Date;
    roles: string[];
}