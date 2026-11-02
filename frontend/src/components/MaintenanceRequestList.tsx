import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MaintenanceRequest } from "../data/sampleMaintenanceRequests";

type Props = { requests: MaintenanceRequest[]; pageSize?: number };

const statusLabels = {
  new: "Uusi",
  in_progress: "Käsittelyssä",
  completed: "Valmis",
} as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fi-FI").format(new Date(`${date}T00:00:00`));
}

export default function MaintenanceRequestList({
  requests,
  pageSize = 8,
}: Props) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(requests.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleRequests = requests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      <section
        className="maintenance-requests-card"
        aria-labelledby="request-list-title"
      >
        <h2 id="request-list-title">Kaikki huoltopyyntösi</h2>
        <div className="request-table-scroll">
          <table className="request-table">
            <thead>
              <tr>
                <th scope="col">Otsikko</th>
                <th scope="col">Kategoria</th>
                <th scope="col">Päivämäärä</th>
                <th scope="col">Tila</th>
                <th scope="col">Toiminto</th>
              </tr>
            </thead>
            <tbody>
              {visibleRequests.map((request) => (
                <tr key={request.id}>
                  <td className="request-title">{request.title}</td>
                  <td>{request.category}</td>
                  <td>{formatDate(request.createdAt)}</td>
                  <td>
                    <span
                      className={`request-status request-status-${request.status}`}
                    >
                      {statusLabels[request.status]}
                    </span>
                  </td>
                  <td className="request-action">
                    <button
                      type="button"
                      aria-label={`Avaa pyyntö: ${request.title}`}
                    >
                      <ChevronRight aria-hidden="true" size={24} />
                    </button>
                  </td>
                </tr>
              ))}
              {visibleRequests.length === 0 && (
                <tr>
                  <td className="request-empty" colSpan={5}>
                    Hakuehdoilla ei löytynyt huoltopyyntöjä.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination*/}
      <nav className="request-pagination" aria-label="Huoltopyyntö Sivutus">
        <span>
          Näytetään {requests.length ? (currentPage - 1) * pageSize + 1 : 0}-
          {Math.min(currentPage * pageSize, requests.length)} /{" "}
          {requests.length} pyyntöä
        </span>
        <div>
          <button
            type="button"
            aria-label="Edellinen sivu"
            disabled={currentPage <= 1}
            onClick={() => setPage(currentPage - 1)}
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                aria-current={currentPage === pageNumber ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ),
          )}
          <button
            type="button"
            aria-label="Seuraava sivu"
            disabled={currentPage >= pageCount}
            onClick={() => setPage(currentPage + 1)}
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>
      </nav>
    </>
  );
}
