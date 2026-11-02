import { Search as SearchIcon, Funnel } from "lucide-react";
import "../styles/Toolbar.css";

export type RequestStatusFilter = "all" | "new" | "in progress" | "resolved";
export type RequestSort = "newest" | "oldest";

type ToolbarProps = {
  query: string;
  status: RequestStatusFilter;
  sort: RequestSort;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: RequestStatusFilter) => void;
  onSortChange: (value: RequestSort) => void;
};

function Search({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="request-toolbar-search">
      <SearchIcon aria-hidden="true" size={25} />
      <span className="visually-hidden">Etsi huoltopyyntöjä</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Etsi hakusanalla..."
      />
    </label>
  );
}

function Filter({
  value,
  onChange,
}: {
  value: RequestStatusFilter;
  onChange: (value: RequestStatusFilter) => void;
}) {
  return (
    <label className="request-toolbar-select">
      <Funnel aria-hidden="true" size={23} />
      <span className="visually-hidden">Suodata tilan mukaan</span>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value as RequestStatusFilter)
        }
      >
        <option value="all">Kaikki tilat</option>
        <option value="new">Uusi</option>
        <option value="in progress">Käsittelyssä</option>
        <option value="resolved">Valmis</option>
      </select>
    </label>
  );
}

function Sort({
  value,
  onChange,
}: {
  value: RequestSort;
  onChange: (value: RequestSort) => void;
}) {
  return (
    <label className="request-toolbar-select request-toolbar-sort">
      <span className="visually-hidden">Järjestä huoltopyynnöt</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as RequestSort)}
      >
        <option value="newest">Uusimmat ensin</option>
        <option value="oldest">Vanhimmat ensin</option>
      </select>
    </label>
  );
}

export default function Toolbar(props: ToolbarProps) {
  return (
    <section
      className="maintenance-requests-toolbar"
      aria-label="Hae, suodata ja järjestä huoltopyyntöjä"
    >
      <Search value={props.query} onChange={props.onQueryChange} />
      <Filter value={props.status} onChange={props.onStatusChange} />
      <Sort value={props.sort} onChange={props.onSortChange} />
    </section>
  );
}
