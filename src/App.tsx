import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      {isStarted ? (
        <Dashboard onBack={() => setIsStarted(false)} />
      ) : (
        <LandingPage onStart={() => setIsStarted(true)} />
      )}
    </>
  );
}
