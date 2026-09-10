import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { EventCollaborationPage } from "./pages/EventCollaborationPage";
import { EventRegistrationPage } from "./pages/EventRegistrationPage";
import { FanDashboardPage } from "./pages/FanDashboardPage";

test("renders the home heading", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: "Smarter City" })).toBeTruthy();
});

test("renders nav links for collaboration and registration", () => {
  render(<App />);
  expect(
    screen.getByRole("link", { name: "Event Collaboration" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Register an Event" }),
  ).toBeTruthy();
});

test("EventRegistrationPage renders the registration form heading", () => {
  render(
    <MemoryRouter>
      <EventRegistrationPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Register a City Event" }),
  ).toBeTruthy();
});

test("EventRegistrationPage renders the submit button", () => {
  render(
    <MemoryRouter>
      <EventRegistrationPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("button", { name: "Submit Event" }),
  ).toBeTruthy();
});

test("EventCollaborationPage renders the collaboration heading", () => {
  render(
    <MemoryRouter>
      <EventCollaborationPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "City Event Collaboration" }),
  ).toBeTruthy();
});

test("EventCollaborationPage renders upcoming events section heading", () => {
  render(
    <MemoryRouter>
      <EventCollaborationPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Upcoming Events" }),
  ).toBeTruthy();
});

test("App renders Fan Dashboard nav link", () => {
  render(<App />);
  expect(screen.getByRole("link", { name: "Fan Dashboard" })).toBeTruthy();
});

test("FanDashboardPage renders the main heading", () => {
  render(
    <MemoryRouter>
      <FanDashboardPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Fan Dashboard" }),
  ).toBeTruthy();
});

test("FanDashboardPage renders the Celebrity Engagements section heading", () => {
  render(
    <MemoryRouter>
      <FanDashboardPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Celebrity Engagements" }),
  ).toBeTruthy();
});

test("FanDashboardPage renders the Competition Leaderboard section heading", () => {
  render(
    <MemoryRouter>
      <FanDashboardPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Competition Leaderboard" }),
  ).toBeTruthy();
});

test("FanDashboardPage renders placeholder engagement titles", () => {
  render(
    <MemoryRouter>
      <FanDashboardPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Morning HIIT Challenge" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: "5K Personal Best Run" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: "Nutrition Deep Dive" }),
  ).toBeTruthy();
});

test("FanDashboardPage increments like count when Like button is clicked", () => {
  render(
    <MemoryRouter>
      <FanDashboardPage />
    </MemoryRouter>,
  );
  const likeButton = screen.getByRole("button", {
    name: "Like Morning HIIT Challenge",
  });
  expect(likeButton.textContent).toBe("👍 Like (124)");
  fireEvent.click(likeButton);
  expect(likeButton.textContent).toBe("👍 Like (125)");
});

test("FanDashboardPage adds a comment when the comment form is submitted", () => {
  render(
    <MemoryRouter>
      <FanDashboardPage />
    </MemoryRouter>,
  );
  const input = screen.getByLabelText("Your comment", {
    selector: "#comment-input-eng-3",
  });
  fireEvent.change(input, { target: { value: "Great tips!" } });
  const submitButton = screen.getAllByRole("button", { name: "Post comment" })[2];
  fireEvent.click(submitButton);
  expect(screen.getByText("Great tips!")).toBeTruthy();
});

test("FanDashboardPage renders leaderboard with Jordan Peak in first place", () => {
  render(
    <MemoryRouter>
      <FanDashboardPage />
    </MemoryRouter>,
  );
  const rows = screen.getAllByRole("row");
  // rows[0] is the header row, rows[1] is rank 1
  expect(rows[1].textContent).toContain("Jordan Peak");
  expect(rows[1].textContent).toContain("980");
  expect(rows[1].textContent).toContain("Gold");
});

test("EventCollaborationPage lists placeholder event titles", () => {
  render(
    <MemoryRouter>
      <EventCollaborationPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Community Garden Day" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: "City Tech Meetup" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: "Neighbourhood Clean-Up" }),
  ).toBeTruthy();
});
