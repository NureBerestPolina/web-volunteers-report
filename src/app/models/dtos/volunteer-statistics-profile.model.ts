import { User } from "../auth/user.model";

export interface VolunteerStatisticsProfile {
    id: string;
    userId: string;
    user: User | null;
    nickname: string | null;
    shortInfo: string | null;
    modified: Date;
    bankLink: string | null;
    helpInfo: string | null;
    reportsCount: number;
    totalCostUsd: number;
}