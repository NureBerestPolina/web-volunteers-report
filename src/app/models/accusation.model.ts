import { User } from "./auth/user.model";
import { Volunteer } from "./volunteer.model";

export interface Accusation {
    id: string;
    userId: string;
    user: User;
    volunteerId: string;
    volunteer: Volunteer;
    reasonDescription: string;
    created: Date;
    modified: Date;
    status: string;
}