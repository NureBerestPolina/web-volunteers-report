import { ReportDetail } from "./report-detail.model";
import { Volunteer } from "./volunteer.model";

export interface Report {
    id: string;
    description: string;
    direction: string;
    volunteerId: string;
    volunteer: Volunteer | null;
    created: Date;
    modified: Date;
    isDeleted: boolean;
    photoUrl: string | null;
    reportDetails: ReportDetail[];
}