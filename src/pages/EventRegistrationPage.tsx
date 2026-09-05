import { useState, type ChangeEvent, type FormEvent } from "react";

interface EventFormState {
  title: string;
  date: string;
  location: string;
  description: string;
}

const initialForm: EventFormState = {
  title: "",
  date: "",
  location: "",
  description: "",
};

export function EventRegistrationPage() {
  const [form, setForm] = useState<EventFormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <main>
      <h1>Register a City Event</h1>
      {submitted && (
        <p role="status">
          Your event has been submitted for review. Thank you!
        </p>
      )}
      <form onSubmit={handleSubmit} aria-label="City event registration form">
        <div>
          <label htmlFor="title">Event title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <button type="submit">Submit Event</button>
      </form>
    </main>
  );
}
