import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { MaintenanceStatus } from "../types/maintenanceRequest";
import "../styles/RequestDetails.css";

const apiUrl = import.meta.env.VITE_REACT_APP_BETTER_AUTH_URL;

type MaintenanceRequestDetails = {
  _id: string;
  title: string;
  description: string;
  category: "electricity" | "water" | "heating" | "doors_locks" | "other";
  buildingAddress: string;
  apartmentNumber: string;
  status: MaintenanceStatus;
  createdAt: string;
  updatedAt: string;
};

const categoryLabels = {
  electricity: "Sähkö",
  water: "Vesi",
  heating: "Lämmitys",
  doors_locks: "Ovet ja lukot",
  other: "Muu",
} as const;

const statusLabels = {
  new: "Uusi",
  "in progress": "Käsittelyssä",
  resolved: "Valmis",
} as const;

export default function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] =
    useState<MaintenanceRequestDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusError, setStatusError] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/maintenance/${id}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Huoltopyyntöä ei löytynyt");
        }

        const data: MaintenanceRequestDetails = await response.json();

        setRequest(data);
      } catch (error) {
        console.error(error);
        setError("Huoltopyynnön lataaminen epäonnistui.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/auth/get-session`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setIsAdmin(data?.user?.role === "admin");
      } catch (error) {
        console.error(error);
      }
    };

      fetchSession();
    }, []);

    const handleStatusChange = async (
      status: MaintenanceStatus,
    ) => {
      if (!request) {
        return;
      }

      setUpdatingStatus(true);
      setStatusError("");

      try {
        const response = await fetch(
          `${apiUrl}/api/maintenance/${request._id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              status,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Statuksen päivittäminen epäonnistui");
        }

        const updatedRequest: MaintenanceRequestDetails =
          await response.json();

        setRequest(updatedRequest);
      } catch (error) {
        console.error(error);
        setStatusError("Statuksen päivittäminen epäonnistui.");
      } finally {
        setUpdatingStatus(false);
      }
    };

  if (loading) {
    return <p>Ladataan huoltopyyntöä...</p>;
  }

  if (error || !request) {
    return <p>{error || "Huoltopyyntöä ei löytynyt."}</p>;
  }

  return (
    <main className="request-details-page">
      <button
        type="button"
        className="request-details-back"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={20} />
        Takaisin
      </button>

      <div className="request-details-card">
        <div className="request-details-heading">
          <div>
            <h1>{request.title}</h1>

            <p>
              Luotu{" "}
              {new Intl.DateTimeFormat("fi-FI").format(
                new Date(request.createdAt),
              )}
            </p>
          </div>

            {isAdmin ? (
              <div>
                <label htmlFor="request-status">
                  Tila
                </label>

                <select
                  id="request-status"
                  value={request.status}
                  disabled={updatingStatus}
                  onChange={(event) =>
                    handleStatusChange(
                      event.target.value as MaintenanceStatus,
                    )
                  }
                >
                  <option value="new">Uusi</option>
                  <option value="in progress">
                    Käsittelyssä
                  </option>
                  <option value="resolved">
                    Valmis
                  </option>
                </select>

                {statusError && <p>{statusError}</p>}
              </div>
            ) : (
              <span
                className={`request-details-status ${request.status}`}
              >
                {statusLabels[request.status]}
              </span>
            )}
        </div>

        <div className="request-details-grid">
          <div>
            <span className="request-details-label">Kategoria</span>
            <p>{categoryLabels[request.category]}</p>
          </div>

          <div>
            <span className="request-details-label">Osoite</span>
            <p>{request.buildingAddress}</p>
          </div>

          <div>
            <span className="request-details-label">Asunto</span>
            <p>{request.apartmentNumber}</p>
          </div>
        </div>

        <div className="request-details-description">
          <span className="request-details-label">Kuvaus</span>
          <p>{request.description}</p>
        </div>
      </div>
    </main>
  );
}