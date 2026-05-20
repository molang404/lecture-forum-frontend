export const CategoryStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
}

export type CategoryStatusType = typeof CategoryStatus[keyof typeof CategoryStatus];

export interface Category {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    status: CategoryStatusType;
}