import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaintenanceRequestList from "../components/MaintenanceRequestList";
import Toolbar, {
  type RequestSort,
  type RequestStatusFilter,
} from "../components/Toolbar";
import { sampleMaintenanceRequests } from "../data/sampleMaintenanceRequests";
import "../styles/Home.css";
import { Plus } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<RequestStatusFilter>("all");
  const [sort, setSort] = useState<RequestSort>("newest");
  const visibleRequests = useMemo(
    () =>
      sampleMaintenanceRequests
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
    [query, sort, status],
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
      <MaintenanceRequestList requests={visibleRequests} />
    </main>
  );
}
