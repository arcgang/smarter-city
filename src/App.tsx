import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { EventCollaborationPage } from "./pages/EventCollaborationPage";
import { EventRegistrationPage } from "./pages/EventRegistrationPage";
import { FanDashboardPage } from "./pages/FanDashboardPage";

function Home() {
  return (
    <main>
      <h1>Smarter City</h1>
      <p>Collaborate and arrange city events for your community.</p>
    </main>
  );
}

function Nav() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events/collaborate">Event Collaboration</Link>
        </li>
        <li>
          <Link to="/events/register">Register an Event</Link>
        </li>
        <li>
          <Link to="/fan-dashboard">Fan Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/collaborate" element={<EventCollaborationPage />} />
        <Route path="/events/register" element={<EventRegistrationPage />} />
        <Route path="/fan-dashboard" element={<FanDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
