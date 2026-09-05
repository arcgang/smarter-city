interface CityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendees: number;
}

const PLACEHOLDER_EVENTS: CityEvent[] = [
  {
    id: "1",
    title: "Community Garden Day",
    date: "2025-08-10",
    location: "Riverside Park",
    description:
      "Join neighbours to plant, weed, and celebrate the community garden.",
    attendees: 42,
  },
  {
    id: "2",
    title: "City Tech Meetup",
    date: "2025-08-17",
    location: "City Library — Main Hall",
    description:
      "Monthly gathering for tech enthusiasts to share projects and ideas.",
    attendees: 28,
  },
  {
    id: "3",
    title: "Neighbourhood Clean-Up",
    date: "2025-08-24",
    location: "Town Square",
    description: "Help keep our city clean. Tools and bags provided.",
    attendees: 15,
  },
];

export function EventCollaborationPage() {
  return (
    <main>
      <h1>City Event Collaboration</h1>
      <p>
        Browse upcoming city events, coordinate with other organizers, and view
        the event calendar below.
      </p>
      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading">Upcoming Events</h2>
        {PLACEHOLDER_EVENTS.length === 0 ? (
          <p>No upcoming events. Be the first to register one!</p>
        ) : (
          <ul>
            {PLACEHOLDER_EVENTS.map((event) => (
              <li key={event.id}>
                <article aria-labelledby={`event-title-${event.id}`}>
                  <h3 id={`event-title-${event.id}`}>{event.title}</h3>
                  <p>
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>{event.description}</p>
                  <p>
                    <strong>Attendees:</strong> {event.attendees}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
