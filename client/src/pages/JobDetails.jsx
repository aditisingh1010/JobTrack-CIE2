import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJob } from "../services/api";
export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  useEffect(() => {
    getJob(id)
      .then(setJob)
      .catch(() => setJob(null));
  }, [id]);
  if (!job) return <p className="state">Loading job...</p>;
  return (
    <section className="page narrow">
      <span className="pill">{job.type}</span>
      <h2>{job.title}</h2>
      <h3>{job.company}</h3>
      <p>
        📍 {job.location} &nbsp; • &nbsp; 💰 {job.salary}
      </p>
      <div className="detailbox">
        <h3>Job Description</h3>
        <p>{job.description}</p>
        <h3>Why apply?</h3>
        <p>
          Gain practical experience, work with a team, and strengthen your
          development skills.
        </p>
      </div>
      <Link className="button" to={`/apply/${job.id}`}>
        Apply Now
      </Link>
    </section>
  );
}
