export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    registerDate: Date;
    roles: string[];
}