export const MAINTENANCE_CATEGORIES = [
  "electricity",
  "water",
  "heating",
  "doors_locks",
  "other",
] as const;

export const MAINTENANCE_STATUSES = [
  "new",
  "in progress",
  "resolved",
] as const;

export type MaintenanceCategory =
  typeof MAINTENANCE_CATEGORIES[number];

export type MaintenanceStatus =
  typeof MAINTENANCE_STATUSES[number];