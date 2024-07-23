export interface ReportCategory {
    id: string;
    name: string;
    description: string | null;
    created: Date;
    modified: Date;
    isDeleted: boolean;
}
