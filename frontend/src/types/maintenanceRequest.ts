export type MaintenanceStatus = "new" | "in progress" | "resolved";

export type MaintenanceCategory =
  | "electricity"
  | "water"
  | "heating"
  | "doors_locks"
  | "other";

export type MaintenanceRequest = {
  id: string;
  title: string;
  category: MaintenanceCategory;
  createdAt: string;
  status: MaintenanceStatus;
};