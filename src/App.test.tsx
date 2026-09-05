import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { EventCollaborationPage } from "./pages/EventCollaborationPage";
import { EventRegistrationPage } from "./pages/EventRegistrationPage";

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
