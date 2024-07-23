import { User } from "../auth/user.model";
import { ReportCategory } from "../report-category.model";

export interface VolunteerProfile {
    id: string;
    userId: string;
    user: User | null;
    nickname: string | null;
    shortInfo: string | null;
    modified: Date;
    bankLink: string | null;
    helpInfo: string | null;
    helpCategories: ReportCategory[];
}
