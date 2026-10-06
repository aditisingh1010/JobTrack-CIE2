import { Link } from "react-router-dom";
export default function JobCard({ job }) {
  return (
    <article className="card">
      <span className="pill">{job.type}</span>
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p>📍 {job.location}</p>
      <p>💰 {job.salary}</p>
      <p>{job.description}</p>
      <Link className="button" to={`/jobs/${job.id}`}>
        View Job
      </Link>
    </article>
  );
}
