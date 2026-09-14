import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { EventCollaborationPage } from "./pages/EventCollaborationPage";
import { EventRegistrationPage } from "./pages/EventRegistrationPage";
import { EyeCheckupDashboardPage } from "./pages/EyeCheckupDashboardPage";
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

test("App renders Eye Checkup Dashboard nav link", () => {
  render(<App />);
  expect(
    screen.getByRole("link", { name: "Eye Checkup Dashboard" }),
  ).toBeTruthy();
});

test("EyeCheckupDashboardPage renders the main heading", () => {
  render(
    <MemoryRouter>
      <EyeCheckupDashboardPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Eye Checkup Dashboard" }),
  ).toBeTruthy();
});

test("EyeCheckupDashboardPage displays quarterly eye checkup details", () => {
  render(
    <MemoryRouter>
      <EyeCheckupDashboardPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "Q1 2025 Checkup - 2025-01-15" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: "Q2 2025 Checkup - 2025-04-10" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: "Q3 2025 Checkup - 2025-07-22" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: "Q4 2025 Checkup - 2025-10-18" }),
  ).toBeTruthy();
});

test("EyeCheckupDashboardPage displays doctor recommendations", () => {
  render(
    <MemoryRouter>
      <EyeCheckupDashboardPage />
    </MemoryRouter>,
  );
  const recHeadings = screen.getAllByRole("heading", {
    name: "Doctor Recommendations",
  });
  expect(recHeadings.length).toBe(4);
  expect(
    screen.getByText("Follow the 20-20-20 rule during screen work."),
  ).toBeTruthy();
  expect(
    screen.getByText("Wear UV-blocking sunglasses during outdoor activities."),
  ).toBeTruthy();
  expect(
    screen.getByText("Annual retinal scan scheduled for Q4."),
  ).toBeTruthy();
  expect(
    screen.getByText("Annual retinal imaging completed — clear and healthy."),
  ).toBeTruthy();
});

test("EyeCheckupDashboardPage displays power metrics per eye in tables", () => {
  render(
    <MemoryRouter>
      <EyeCheckupDashboardPage />
    </MemoryRouter>,
  );
  const metricsHeadings = screen.getAllByRole("heading", {
    name: "Power Metrics Per Eye",
  });
  expect(metricsHeadings.length).toBe(4);

  const leftEyeRows = screen.getAllByRole("rowheader", {
    name: "Left Eye (OS)",
  });
  const rightEyeRows = screen.getAllByRole("rowheader", {
    name: "Right Eye (OD)",
  });
  expect(leftEyeRows.length).toBe(4);
  expect(rightEyeRows.length).toBe(4);

  // Check specific power metrics values rendered
  expect(screen.getAllByText("-1.75 D").length).toBeGreaterThanOrEqual(2);
  expect(screen.getAllByText("-2.00 D").length).toBeGreaterThanOrEqual(2);
});

test("EyeCheckupDashboardPage filters checkups by exact date", () => {
  render(
    <MemoryRouter>
      <EyeCheckupDashboardPage />
    </MemoryRouter>,
  );
  const specificDateInput = screen.getByLabelText("Exact Date");
  fireEvent.change(specificDateInput, { target: { value: "2025-04-10" } });

  expect(
    screen.getByRole("heading", { name: "Q2 2025 Checkup - 2025-04-10" }),
  ).toBeTruthy();
  expect(
    screen.queryByRole("heading", { name: "Q1 2025 Checkup - 2025-01-15" }),
  ).toBeNull();
  expect(
    screen.queryByRole("heading", { name: "Q3 2025 Checkup - 2025-07-22" }),
  ).toBeNull();
  expect(
    screen.queryByRole("heading", { name: "Q4 2025 Checkup - 2025-10-18" }),
  ).toBeNull();
});

test("EyeCheckupDashboardPage filters checkups by date range", () => {
  render(
    <MemoryRouter>
      <EyeCheckupDashboardPage />
    </MemoryRouter>,
  );
  const startDateInput = screen.getByLabelText("From Date");
  const endDateInput = screen.getByLabelText("To Date");

  fireEvent.change(startDateInput, { target: { value: "2025-04-01" } });
  fireEvent.change(endDateInput, { target: { value: "2025-08-01" } });

  expect(
    screen.queryByRole("heading", { name: "Q1 2025 Checkup - 2025-01-15" }),
  ).toBeNull();
  expect(
    screen.getByRole("heading", { name: "Q2 2025 Checkup - 2025-04-10" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: "Q3 2025 Checkup - 2025-07-22" }),
  ).toBeTruthy();
  expect(
    screen.queryByRole("heading", { name: "Q4 2025 Checkup - 2025-10-18" }),
  ).toBeNull();
});

test("EyeCheckupDashboardPage shows empty message when no checkups match filter", () => {
  render(
    <MemoryRouter>
      <EyeCheckupDashboardPage />
    </MemoryRouter>,
  );
  const specificDateInput = screen.getByLabelText("Exact Date");
  fireEvent.change(specificDateInput, { target: { value: "2026-01-01" } });

  expect(
    screen.getByText("No eye checkups found for the selected date filter."),
  ).toBeTruthy();
});

test("EyeCheckupDashboardPage resets filters when Reset Filters button is clicked", () => {
  render(
    <MemoryRouter>
      <EyeCheckupDashboardPage />
    </MemoryRouter>,
  );
  const specificDateInput = screen.getByLabelText("Exact Date");
  fireEvent.change(specificDateInput, { target: { value: "2025-01-15" } });

  expect(
    screen.queryByRole("heading", { name: "Q2 2025 Checkup - 2025-04-10" }),
  ).toBeNull();

  const resetButton = screen.getByRole("button", { name: "Reset Filters" });
  fireEvent.click(resetButton);

  expect(
    screen.getByRole("heading", { name: "Q1 2025 Checkup - 2025-01-15" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: "Q2 2025 Checkup - 2025-04-10" }),
  ).toBeTruthy();
});
