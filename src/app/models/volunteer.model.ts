import { User } from "./auth/user.model";

export interface Volunteer {
    id: string;
    userId: string;
    user: User | null;
    nickname: string | null;
    shortInfo: string | null;
    modified: Date;
    isBlocked: boolean;
    isHidden: boolean;
    bankLink: string | null;
    helpInfo: string | null;
}