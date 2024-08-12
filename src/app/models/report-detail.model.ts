import { ReportCategory } from "./report-category.model";

export interface ReportDetail {
    id: string;
    reportId: string;
    report: Report | null;
    categoryId: string;
    category: ReportCategory | null;
    amount: number;
    measurementUnit: string;
    costUsd: number;
}