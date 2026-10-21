import "../MaintenanceRequestPage.css";
import { Plus } from "lucide-react";

export default function MaintenanceRequestPage() {
  return (
    <main className="maintenance-requests-page">
      {/* Page heading and shortcut to create a maintenance request. */}
      <header className="maintenance-requests-heading">
        <div>
          <h1>Omat huoltopyynnöt</h1>
          <p>Seuraa omien huoltopyyntöjesi tilaa</p>
        </div>
        <button className="maintenance-requests-new-button" type="button">
          <span aria-hidden="true">
            <Plus />
          </span>{" "}
          Uusi huoltopyyntö
        </button>
      </header>

      {/* Placeholder area for the search, status filter, and sorting components. */}
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

      {/* Request list container; the list content will be implemented separately. */}
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
