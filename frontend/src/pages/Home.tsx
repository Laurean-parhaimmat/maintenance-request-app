import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import MaintenanceRequestList from "../components/MaintenanceRequestList";
import Toolbar, {
  type RequestSort,
  type RequestStatusFilter,
} from "../components/Toolbar";

import type { MaintenanceRequest } from "../types/maintenanceRequest";

import "../styles/Home.css";

const apiUrl = import.meta.env.VITE_REACT_APP_BETTER_AUTH_URL;

type ApiMaintenanceRequest = {
  _id: string;
  title: string;
  description: string;
  category: MaintenanceRequest["category"];
  buildingAddress: string;
  apartmentNumber: string;
  status: MaintenanceRequest["status"];
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<RequestStatusFilter>("all");
  const [sort, setSort] = useState<RequestSort>("newest");

  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/maintenance`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Huoltopyyntöjen hakeminen epäonnistui");
        }

        const data: ApiMaintenanceRequest[] = await response.json();

        const mappedRequests: MaintenanceRequest[] = data.map((request) => ({
          id: request._id,
          title: request.title,
          category: request.category,
          createdAt: request.createdAt,
          status: request.status,
        }));

        setRequests(mappedRequests);
      } catch (error) {
        console.error(error);
        setError("Huoltopyyntöjen lataaminen epäonnistui.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRequests();
  }, []);

  const visibleRequests = useMemo(
    () =>
      [...requests]
        .filter((request) => status === "all" || request.status === status)
        .filter((request) =>
          `${request.title} ${request.category}`
            .toLocaleLowerCase("fi")
            .includes(query.trim().toLocaleLowerCase("fi")),
        )
        .sort((a, b) =>
          sort === "newest"
            ? b.createdAt.localeCompare(a.createdAt)
            : a.createdAt.localeCompare(b.createdAt),
        ),
    [requests, query, sort, status],
  );

  return (
    <main className="maintenance-requests-page">
      <header className="maintenance-requests-heading">
        <div>
          <h1>Omat huoltopyynnöt</h1>
          <p>Seuraa omien huoltopyyntöjesi tilaa</p>
        </div>

        <button
          className="maintenance-requests-new-button"
          type="button"
          onClick={() => navigate("/request/new")}
        >
          <span aria-hidden="true">
            <Plus />
          </span>
          Uusi huoltopyyntö
        </button>
      </header>

      <Toolbar
        query={query}
        status={status}
        sort={sort}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onSortChange={setSort}
      />

      {loading && <p>Ladataan huoltopyyntöjä...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <MaintenanceRequestList
          requests={visibleRequests}
          pageSize={6}
        />
      )}
    </main>
  );
}
