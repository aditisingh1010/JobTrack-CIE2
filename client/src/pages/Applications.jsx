import { useEffect, useState } from "react";
import {
  getApplications,
  getJobs,
  updateApplication,
  deleteApplication,
} from "../services/api";
export default function Applications() {
  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    Promise.all([getApplications(), getJobs()]).then(([a, j]) => {
      setApps(a);
      setJobs(j);
    });
  }, []);
  const jobName = (id) => jobs.find((j) => j.id === id)?.title || "Job";
  const status = async (id, value) => {
    const u = await updateApplication(id, { status: value });
    setApps((a) => a.map((x) => (x.id === id ? u : x)));
  };
  const remove = async (id) => {
    if (confirm("Delete this application?")) {
      await deleteApplication(id);
      setApps((a) => a.filter((x) => x.id !== id));
    }
  };
  return (
    <section className="page">
      <span className="eyebrow">YOUR ACTIVITY</span>
      <h2>My Applications</h2>
      <p>Track every application in one place.</p>
      <div className="application-list">
        {apps.map((a) => (
          <article className="application">
            <div>
              <h3>{jobName(a.jobId)}</h3>
              <p>
                {a.name} • {a.email}
              </p>
              <small>Applied {a.appliedAt}</small>
            </div>
            <div>
              <select
                value={a.status}
                onChange={(e) => status(a.id, e.target.value)}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Selected</option>
                <option>Rejected</option>
              </select>
              <button className="delete" onClick={() => remove(a.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
        {!apps.length && (
          <p>No applications yet. Apply for a job to see it here.</p>
        )}
      </div>
    </section>
  );
}
