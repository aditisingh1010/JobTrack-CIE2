export default function JobStats({ total, internships, remote }) {
  return (
    <div className="stats">
      <div>
        <b>{total}</b>
        <span>Total Jobs</span>
      </div>
      <div>
        <b>{internships}</b>
        <span>Internships</span>
      </div>
      <div>
        <b>{remote}</b>
        <span>Remote Jobs</span>
      </div>
    </div>
  );
}
