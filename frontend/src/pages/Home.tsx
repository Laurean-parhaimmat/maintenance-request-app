import { useNavigate } from "react-router-dom";
import "../styles/MaintenanceRequestPage.css";

export default function Home() {
  const navigate = useNavigate();

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
          <span aria-hidden="true">+</span>
          Uusi huoltopyyntö
        </button>
      </header>

      <section
        className="maintenance-requests-toolbar"
        aria-label="Search and filters"
      >
        <div
          className="maintenance-requests-search"
          aria-label="Search component"
        />

        <div
          className="maintenance-requests-filter"
          aria-label="Status filter component"
        />

        <div
          className="maintenance-requests-sort"
          aria-label="Sort component"
        />
      </section>

      <section
        className="maintenance-requests-card"
        aria-labelledby="request-list-title"
      >
        <h2 id="request-list-title">Kaikki huoltopyyntösi</h2>

        <div
          className="maintenance-requests-list-outline"
          aria-label="Maintenance request list"
        />
      </section>
    </main>
  );
}