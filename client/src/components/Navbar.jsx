import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="nav">
      <div className="brand">JobTrack</div>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/applications">My Applications</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}
