import { Link } from "react-router-dom";
export default function Home() {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">SIMPLE • SMART • STUDENT FRIENDLY</span>
        <h1>
          Find jobs.
          <br />
          <em>Track applications.</em>
        </h1>
        <p>
          JobTrack is a simple job application tracker built with React and
          Express for the CS3301 full-stack mini project.
        </p>
        <div className="actions">
          <Link className="button" to="/jobs">
            Browse Jobs
          </Link>
          <Link className="button secondary" to="/applications">
            Track Applications
          </Link>
        </div>
      </div>
    </section>
  );
}
