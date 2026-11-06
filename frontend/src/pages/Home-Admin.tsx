import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaintenanceRequestList from "../components/MaintenanceRequestList";
import Toolbar, {
  type RequestSort,
  type RequestStatusFilter,
} from "../components/Toolbar";
import { sampleMaintenanceRequests } from "../data/sampleMaintenanceRequests";
import "../styles/Home.css";
import { Plus, Inbox, Clock3, CircleCheck } from "lucide-react";

export default function HomeAdmin() {
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
          <h1>Työpöytä</h1>
          <p>Huoltopyyntöjen tilanne</p>
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
      <section className="maintenance-requests-stats">
        <div className="request-stat-card">
          <header className="request-stat-header">
            <label>Uudet huoltopyynnöt</label>
            <span id="new-requests" aria-hidden="true">
              <Inbox />
            </span>
          </header>
          <h1 className="request-stat-value">8</h1>
        </div>
        <div className="request-stat-card">
          <header className="request-stat-header">
            <label>Keskeneräiset</label>
            <span id="in-progress" aria-hidden="true">
              <Clock3 />
            </span>
          </header>
          <h1 className="request-stat-value">4</h1>
        </div>
        <div className="request-stat-card">
          <header className="request-stat-header">
            <label>Valmiit huoltopyynnöt</label>
            <span id="complete-requests" aria-hidden="true">
              <CircleCheck />
            </span>
          </header>
          <h1 className="request-stat-value">10</h1>
        </div>
      </section>

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
