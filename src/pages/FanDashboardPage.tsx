import { useState, type ChangeEvent, type FormEvent } from "react";

interface Engagement {
  id: string;
  celebrity: string;
  title: string;
  description: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  text: string;
}

interface LeaderboardEntry {
  rank: number;
  expertName: string;
  competition: string;
  score: number;
  medal: string;
}

const PLACEHOLDER_ENGAGEMENTS: Engagement[] = [
  {
    id: "eng-1",
    celebrity: "Jordan Peak",
    title: "Morning HIIT Challenge",
    description:
      "Complete 30 minutes of high-intensity interval training every morning for a week.",
    likes: 124,
    comments: [
      { id: "c-1", author: "Alex", text: "This challenge changed my life!" },
      { id: "c-2", author: "Sam", text: "Day 3 down, feeling amazing!" },
    ],
  },
  {
    id: "eng-2",
    celebrity: "Riley Storm",
    title: "5K Personal Best Run",
    description:
      "Riley just shattered their 5K personal best at 18:42. Watch the recap!",
    likes: 89,
    comments: [
      { id: "c-3", author: "Morgan", text: "Incredible pace, so inspiring!" },
    ],
  },
  {
    id: "eng-3",
    celebrity: "Casey Flex",
    title: "Nutrition Deep Dive",
    description:
      "A full breakdown of the macro plan Casey used to prepare for nationals.",
    likes: 57,
    comments: [],
  },
];

const PLACEHOLDER_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    expertName: "Jordan Peak",
    competition: "City Sprint Classic",
    score: 980,
    medal: "Gold",
  },
  {
    rank: 2,
    expertName: "Riley Storm",
    competition: "Urban Fitness Open",
    score: 945,
    medal: "Silver",
  },
  {
    rank: 3,
    expertName: "Casey Flex",
    competition: "Metro Strength Invitational",
    score: 912,
    medal: "Bronze",
  },
  {
    rank: 4,
    expertName: "Taylor Burn",
    competition: "City Sprint Classic",
    score: 878,
    medal: "—",
  },
  {
    rank: 5,
    expertName: "Jordan Peak",
    competition: "National Endurance Cup",
    score: 861,
    medal: "—",
  },
];

export function FanDashboardPage() {
  const [engagements, setEngagements] = useState<Engagement[]>(
    PLACEHOLDER_ENGAGEMENTS,
  );
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(PLACEHOLDER_ENGAGEMENTS.map((e) => [e.id, ""])),
  );

  function handleLike(engagementId: string) {
    setEngagements((prev) =>
      prev.map((e) =>
        e.id === engagementId ? { ...e, likes: e.likes + 1 } : e,
      ),
    );
  }

  function handleCommentChange(engagementId: string, value: string) {
    setCommentDrafts((prev) => ({ ...prev, [engagementId]: value }));
  }

  function handleCommentSubmit(
    e: FormEvent<HTMLFormElement>,
    engagementId: string,
  ) {
    e.preventDefault();
    const text = commentDrafts[engagementId]?.trim();
    if (!text) return;
    const newComment: Comment = {
      id: `c-${Date.now()}-${engagementId}`,
      author: "Fan",
      text,
    };
    setEngagements((prev) =>
      prev.map((eng) =>
        eng.id === engagementId
          ? { ...eng, comments: [...eng.comments, newComment] }
          : eng,
      ),
    );
    setCommentDrafts((prev) => ({ ...prev, [engagementId]: "" }));
  }

  return (
    <main>
      <h1>Fan Dashboard</h1>
      <p>Engage with your favourite fitness celebrities and track the competition leaderboard.</p>

      <section aria-labelledby="engagements-heading">
        <h2 id="engagements-heading">Celebrity Engagements</h2>
        {engagements.length === 0 ? (
          <p>No engagements available right now. Check back soon!</p>
        ) : (
          <ul>
            {engagements.map((eng) => (
              <li key={eng.id}>
                <article aria-labelledby={`eng-title-${eng.id}`}>
                  <h3 id={`eng-title-${eng.id}`}>{eng.title}</h3>
                  <p>
                    <strong>Celebrity:</strong> {eng.celebrity}
                  </p>
                  <p>{eng.description}</p>

                  <button
                    type="button"
                    aria-label={`Like ${eng.title}`}
                    onClick={() => handleLike(eng.id)}
                  >
                    👍 Like ({eng.likes})
                  </button>

                  <section aria-labelledby={`comments-heading-${eng.id}`}>
                    <h4 id={`comments-heading-${eng.id}`}>Comments</h4>
                    {eng.comments.length === 0 ? (
                      <p>No comments yet. Be the first!</p>
                    ) : (
                      <ul>
                        {eng.comments.map((c) => (
                          <li key={c.id}>
                            <strong>{c.author}:</strong> {c.text}
                          </li>
                        ))}
                      </ul>
                    )}

                    <form
                      aria-label={`Add a comment to ${eng.title}`}
                      onSubmit={(e) => handleCommentSubmit(e, eng.id)}
                    >
                      <label htmlFor={`comment-input-${eng.id}`}>
                        Your comment
                      </label>
                      <input
                        id={`comment-input-${eng.id}`}
                        type="text"
                        value={commentDrafts[eng.id] ?? ""}
                        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                          handleCommentChange(eng.id, ev.target.value)
                        }
                        placeholder="Write a comment…"
                      />
                      <button type="submit">Post comment</button>
                    </form>
                  </section>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="leaderboard-heading">
        <h2 id="leaderboard-heading">Competition Leaderboard</h2>
        <table>
          <caption>Fitness expert competition rankings</caption>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Expert</th>
              <th scope="col">Competition</th>
              <th scope="col">Score</th>
              <th scope="col">Medal</th>
            </tr>
          </thead>
          <tbody>
            {PLACEHOLDER_LEADERBOARD.map((entry) => (
              <tr key={`${entry.rank}-${entry.expertName}-${entry.competition}`}>
                <td>{entry.rank}</td>
                <td>{entry.expertName}</td>
                <td>{entry.competition}</td>
                <td>{entry.score}</td>
                <td>{entry.medal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
