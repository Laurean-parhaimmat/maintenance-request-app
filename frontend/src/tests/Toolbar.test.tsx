import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Toolbar from "../components/Toolbar";

describe("Toolbar", () => {
  afterEach(() => {
    cleanup();
  });

  // Confirms initial query, status filter, and sort values are rendered properly.
  it("renders initial search query, status filter, and sort values", () => {
    render(
      <Toolbar
        query="keittiö"
        status="in progress"
        sort="oldest"
        onQueryChange={() => {}}
        onStatusChange={() => {}}
        onSortChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("region", {
        name: "Hae, suodata ja järjestä huoltopyyntöjä",
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Etsi huoltopyyntöjä")).toHaveValue(
      "keittiö",
    );
    expect(screen.getByLabelText("Suodata tilan mukaan")).toHaveValue(
      "in progress",
    );
    expect(screen.getByLabelText("Järjestä huoltopyynnöt")).toHaveValue(
      "oldest",
    );
  });

  // Confirms typing in the search input calls onQueryChange.
  it("calls onQueryChange when search input changes", () => {
    const onQueryChange = vi.fn();

    render(
      <Toolbar
        query=""
        status="all"
        sort="newest"
        onQueryChange={onQueryChange}
        onStatusChange={() => {}}
        onSortChange={() => {}}
      />,
    );

    fireEvent.change(screen.getByLabelText("Etsi huoltopyyntöjä"), {
      target: { value: "hana" },
    });

    expect(onQueryChange).toHaveBeenCalledWith("hana");
  });

  // Confirms changing the status and sort selects triggers their callbacks.
  it("calls onStatusChange and onSortChange when select options change", () => {
    const onStatusChange = vi.fn();
    const onSortChange = vi.fn();

    render(
      <Toolbar
        query=""
        status="all"
        sort="newest"
        onQueryChange={() => {}}
        onStatusChange={onStatusChange}
        onSortChange={onSortChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Suodata tilan mukaan"), {
      target: { value: "resolved" },
    });
    expect(onStatusChange).toHaveBeenCalledWith("resolved");

    fireEvent.change(screen.getByLabelText("Järjestä huoltopyynnöt"), {
      target: { value: "oldest" },
    });
    expect(onSortChange).toHaveBeenCalledWith("oldest");
  });
});