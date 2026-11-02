export type MaintenanceStatus = "new" | "in_progress" | "completed";

export type MaintenanceRequest = {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  status: MaintenanceStatus;
};

// Temporary sample data for the homepage until it is connected to the backend
export const sampleMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    title: "Keittiön hana vuotaa",
    category: "LVI",
    createdAt: "2026-09-19",
    status: "new",
  },
  {
    id: "2",
    title: "Parvekkeen ovi ei sulkeudu",
    category: "Ovet",
    createdAt: "2026-09-15",
    status: "in_progress",
  },
  {
    id: "3",
    title: "Kylpyhuoneen valo ei toimi",
    category: "Sähkö",
    createdAt: "2026-09-10",
    status: "in_progress",
  },
  {
    id: "4",
    title: "Keittiön hana vuotaa",
    category: "LVI",
    createdAt: "2026-09-01",
    status: "completed",
  },
  {
    id: "5",
    title: "Ilmanvaihto ei toimi",
    category: "LVI",
    createdAt: "2026-08-15",
    status: "in_progress",
  },
  {
    id: "6",
    title: "Eteisen pistorasia irti",
    category: "Sähkö",
    createdAt: "2026-08-08",
    status: "new",
  },
  {
    id: "7",
    title: "Vesihana tiputtaa",
    category: "LVI",
    createdAt: "2026-07-29",
    status: "completed",
  },
  {
    id: "8",
    title: "Ikkunan lukko jumittaa",
    category: "Ikkunat",
    createdAt: "2026-07-18",
    status: "in_progress",
  },
  {
    id: "9",
    title: "Liesituuletin pitää ääntä",
    category: "Sähkö",
    createdAt: "2026-07-06",
    status: "new",
  },
  {
    id: "10",
    title: "Lämmityspatteri kylmänä",
    category: "LVI",
    createdAt: "2026-06-21",
    status: "completed",
  },
];
