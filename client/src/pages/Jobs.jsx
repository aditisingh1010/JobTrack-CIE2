import { useEffect, useMemo, useState } from "react";
import { getJobs } from "../services/api";
import JobList from "../components/JobList";
import JobStats from "../components/JobStats";
export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  const locations = ["All", ...new Set(jobs.map((j) => j.location))];
  const filtered = useMemo(
    () =>
      jobs.filter(
        (j) =>
          (j.title + j.company + j.location)
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          (location === "All" || j.location === location),
      ),
    [jobs, search, location],
  );
  if (loading) return <p className="state">Loading jobs...</p>;
  if (error) return <p className="state error">{error}</p>;
  return (
    <section className="page">
      <div className="pagehead">
        <div>
          <span className="eyebrow">OPPORTUNITIES</span>
          <h2>Browse Jobs</h2>
          <p>Search and filter openings before you apply.</p>
        </div>
      </div>
      <JobStats
        total={jobs.length}
        internships={jobs.filter((j) => j.type === "Internship").length}
        remote={jobs.filter((j) => j.location === "Remote").length}
      />
      <div className="filters">
        <input
          placeholder="Search title, company or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          {locations.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
      <p className="count">Showing {filtered.length} job(s)</p>
      <JobList jobs={filtered} />
    </section>
  );
}
