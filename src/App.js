import React from "react";
import PortfolioV2 from "./PortfolioV2";
import projects from "./data/projects.json";

export default function App() {
  return <PortfolioV2 projects={projects} />;
}
