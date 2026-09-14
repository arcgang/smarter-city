import { useState, useMemo, type ChangeEvent } from "react";

export interface PowerMetrics {
  spherical: number;
  cylindrical: number;
  axis: number;
  visualAcuity: string;
}

export interface EyePowerMetrics {
  leftEye: PowerMetrics;
  rightEye: PowerMetrics;
}

export interface EyeCheckupRecord {
  id: string;
  patientName: string;
  checkupDate: string; // YYYY-MM-DD
  quarter: string; // e.g. "Q1 2025"
  doctorName: string;
  doctorRecommendations: string[];
  powerMetrics: EyePowerMetrics;
  notes?: string;
}

export const PLACEHOLDER_EYE_CHECKUPS: EyeCheckupRecord[] = [
  {
    id: "ec-1",
    patientName: "Alex Morgan",
    checkupDate: "2025-01-15",
    quarter: "Q1 2025",
    doctorName: "Dr. Evelyn Reed, OD",
    doctorRecommendations: [
      "Follow the 20-20-20 rule during screen work.",
      "Use lubricating eye drops twice daily as needed.",
      "Anti-reflective coating recommended for new lenses.",
    ],
    powerMetrics: {
      leftEye: {
        spherical: -1.75,
        cylindrical: -0.50,
        axis: 85,
        visualAcuity: "20/20",
      },
      rightEye: {
        spherical: -2.00,
        cylindrical: -0.75,
        axis: 90,
        visualAcuity: "20/20",
      },
    },
    notes: "Mild eye fatigue reported from extended computer usage.",
  },
  {
    id: "ec-2",
    patientName: "Alex Morgan",
    checkupDate: "2025-04-10",
    quarter: "Q2 2025",
    doctorName: "Dr. Evelyn Reed, OD",
    doctorRecommendations: [
      "Maintain current prescription; no progression observed.",
      "Wear UV-blocking sunglasses during outdoor activities.",
      "Schedule next quarterly checkup in July.",
    ],
    powerMetrics: {
      leftEye: {
        spherical: -1.75,
        cylindrical: -0.50,
        axis: 85,
        visualAcuity: "20/20",
      },
      rightEye: {
        spherical: -2.25,
        cylindrical: -0.75,
        axis: 90,
        visualAcuity: "20/20",
      },
    },
    notes: "Right eye spherical power adjusted slightly. General ocular health is optimal.",
  },
  {
    id: "ec-3",
    patientName: "Alex Morgan",
    checkupDate: "2025-07-22",
    quarter: "Q3 2025",
    doctorName: "Dr. Marcus Vance, MD",
    doctorRecommendations: [
      "Continue daily screen breaks and eye hydration.",
      "Annual retinal scan scheduled for Q4.",
    ],
    powerMetrics: {
      leftEye: {
        spherical: -2.00,
        cylindrical: -0.50,
        axis: 80,
        visualAcuity: "20/25",
      },
      rightEye: {
        spherical: -2.25,
        cylindrical: -0.75,
        axis: 90,
        visualAcuity: "20/20",
      },
    },
    notes: "Stable condition. Mild dry eye symptoms during hot weather.",
  },
  {
    id: "ec-4",
    patientName: "Alex Morgan",
    checkupDate: "2025-10-18",
    quarter: "Q4 2025",
    doctorName: "Dr. Evelyn Reed, OD",
    doctorRecommendations: [
      "Annual retinal imaging completed — clear and healthy.",
      "Prescription renewed for the upcoming year.",
      "Maintain annual follow-up schedule.",
    ],
    powerMetrics: {
      leftEye: {
        spherical: -2.00,
        cylindrical: -0.75,
        axis: 80,
        visualAcuity: "20/20",
      },
      rightEye: {
        spherical: -2.25,
        cylindrical: -0.75,
        axis: 90,
        visualAcuity: "20/20",
      },
    },
    notes: "Annual review complete. Overall eye health excellent.",
  },
];

interface EyeCheckupDashboardPageProps {
  initialCheckups?: EyeCheckupRecord[];
}

export function EyeCheckupDashboardPage({
  initialCheckups = PLACEHOLDER_EYE_CHECKUPS,
}: EyeCheckupDashboardPageProps) {
  const [checkups] = useState<EyeCheckupRecord[]>(initialCheckups);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const filteredCheckups = useMemo(() => {
    return checkups.filter((checkup) => {
      if (selectedDate && checkup.checkupDate !== selectedDate) {
        return false;
      }
      if (startDate && checkup.checkupDate < startDate) {
        return false;
      }
      if (endDate && checkup.checkupDate > endDate) {
        return false;
      }
      return true;
    });
  }, [checkups, selectedDate, startDate, endDate]);

  function handleResetFilters() {
    setStartDate("");
    setEndDate("");
    setSelectedDate("");
  }

  function formatPower(val: number): string {
    return val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2);
  }

  return (
    <main>
      <h1>Eye Checkup Dashboard</h1>
      <p>
        View and track quarterly and annual eye checkup details, power metrics per eye, and doctor recommendations.
      </p>

      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading">Filter Checkups</h2>
        <form
          aria-label="Filter eye checkups"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="filter-specific-date">Exact Date</label>
            <input
              id="filter-specific-date"
              name="specificDate"
              type="date"
              value={selectedDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSelectedDate(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="filter-start-date">From Date</label>
            <input
              id="filter-start-date"
              name="startDate"
              type="date"
              value={startDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStartDate(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="filter-end-date">To Date</label>
            <input
              id="filter-end-date"
              name="endDate"
              type="date"
              value={endDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEndDate(e.target.value)
              }
            />
          </div>
          <button type="button" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </form>
      </section>

      <section aria-labelledby="checkup-details-heading">
        <h2 id="checkup-details-heading">Eye Checkup Details</h2>
        {filteredCheckups.length === 0 ? (
          <p role="status">No eye checkups found for the selected date filter.</p>
        ) : (
          <ul>
            {filteredCheckups.map((checkup) => (
              <li key={checkup.id}>
                <article aria-labelledby={`checkup-title-${checkup.id}`}>
                  <h3 id={`checkup-title-${checkup.id}`}>
                    {checkup.quarter} Checkup - {checkup.checkupDate}
                  </h3>
                  <p>
                    <strong>Patient:</strong> {checkup.patientName}
                  </p>
                  <p>
                    <strong>Date:</strong> {checkup.checkupDate}
                  </p>
                  <p>
                    <strong>Quarter / Period:</strong> {checkup.quarter}
                  </p>
                  <p>
                    <strong>Attending Doctor:</strong> {checkup.doctorName}
                  </p>
                  {checkup.notes && (
                    <p>
                      <strong>Notes:</strong> {checkup.notes}
                    </p>
                  )}

                  <section aria-labelledby={`power-metrics-heading-${checkup.id}`}>
                    <h4 id={`power-metrics-heading-${checkup.id}`}>
                      Power Metrics Per Eye
                    </h4>
                    <table>
                      <caption>
                        Power metrics for {checkup.quarter} ({checkup.checkupDate})
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Eye</th>
                          <th scope="col">Spherical (SPH)</th>
                          <th scope="col">Cylindrical (CYL)</th>
                          <th scope="col">Axis (deg)</th>
                          <th scope="col">Visual Acuity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Left Eye (OS)</th>
                          <td>{formatPower(checkup.powerMetrics.leftEye.spherical)} D</td>
                          <td>{formatPower(checkup.powerMetrics.leftEye.cylindrical)} D</td>
                          <td>{checkup.powerMetrics.leftEye.axis}°</td>
                          <td>{checkup.powerMetrics.leftEye.visualAcuity}</td>
                        </tr>
                        <tr>
                          <th scope="row">Right Eye (OD)</th>
                          <td>{formatPower(checkup.powerMetrics.rightEye.spherical)} D</td>
                          <td>{formatPower(checkup.powerMetrics.rightEye.cylindrical)} D</td>
                          <td>{checkup.powerMetrics.rightEye.axis}°</td>
                          <td>{checkup.powerMetrics.rightEye.visualAcuity}</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>

                  <section aria-labelledby={`recommendations-heading-${checkup.id}`}>
                    <h4 id={`recommendations-heading-${checkup.id}`}>
                      Doctor Recommendations
                    </h4>
                    <ul>
                      {checkup.doctorRecommendations.map((rec, index) => (
                        <li key={`rec-${checkup.id}-${index}`}>{rec}</li>
                      ))}
                    </ul>
                  </section>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
