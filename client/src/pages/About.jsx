import React from "react";
export default class About extends React.Component {
  render() {
    return (
      <section className="page narrow">
        <span className="eyebrow">ABOUT THE PROJECT</span>
        <h2>JobTrack</h2>
        <p>
          JobTrack is an academic mini project demonstrating React components,
          props, hooks, forms, routing, event handling and an Express REST API.
        </p>
        <h3>Class Component</h3>
        <p>
          This page is intentionally implemented as a React class component to
          demonstrate the course requirement.
        </p>
        <h3>Tech Stack</h3>
        <ul>
          <li>React + Vite</li>
          <li>React Router DOM</li>
          <li>Express.js</li>
          <li>JavaScript + CSS</li>
        </ul>
      </section>
    );
  }
}
