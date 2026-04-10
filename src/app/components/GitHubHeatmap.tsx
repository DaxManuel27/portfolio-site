import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  contributions: ContributionDay[];
}

const LEVEL_COLORS = [
  "#161b22", // 0 – no contributions
  "#0e4429", // 1
  "#006d32", // 2
  "#26a641", // 3
  "#39d353", // 4
] as const;

const LEVEL_BORDER = [
  "rgba(255,255,255,0.05)",
  "rgba(0,120,50,0.4)",
  "rgba(0,160,60,0.4)",
  "rgba(30,190,80,0.4)",
  "rgba(50,220,100,0.4)",
] as const;

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const;

const CELL = 13;   // px — cell size
const GAP  = 3;    // px — gap between cells

/** Return the last `numMonths` months of days, padded to full weeks */
function buildGrid(contributions: ContributionDay[], numMonths: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cutoff = new Date(today);
  cutoff.setMonth(cutoff.getMonth() - numMonths);
  cutoff.setDate(1);
  cutoff.setHours(0, 0, 0, 0);

  // Rewind cutoff to the Sunday of that week
  const startDay = new Date(cutoff);
  startDay.setDate(startDay.getDate() - startDay.getDay());

  // Advance today to the Saturday of its week
  const endDay = new Date(today);
  endDay.setDate(endDay.getDate() + (6 - endDay.getDay()));

  const byDate = new Map<string, ContributionDay>();
  for (const c of contributions) byDate.set(c.date, c);

  // Build a flat array of all days in range
  const days: (ContributionDay & { isFuture: boolean })[] = [];
  const cursor = new Date(startDay);
  while (cursor <= endDay) {
    const iso = cursor.toISOString().slice(0, 10);
    const found = byDate.get(iso);
    days.push({
      date: iso,
      count: found?.count ?? 0,
      level: found?.level ?? 0,
      isFuture: cursor > today,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  // Group into weeks (columns of 7)
  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return { weeks, startDay };
}

/** Find which column each month label should sit above */
function monthLabels(weeks: ReturnType<typeof buildGrid>["weeks"]) {
  const seen = new Set<string>();
  return weeks.map((week, colIdx) => {
    const firstReal = week.find((d) => !d.isFuture) ?? week[0];
    const [, m] = firstReal.date.split("-");
    if (seen.has(m)) return null;
    seen.add(m);
    return { colIdx, month: MONTHS[parseInt(m, 10) - 1] };
  }).filter(Boolean) as { colIdx: number; month: string }[];
}

export function GitHubHeatmap({ username = "DaxManuel27" }: { username?: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [totalInRange, setTotalInRange] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => r.json())
      .then((data: ApiResponse) => {
        if (!cancelled) {
          setContributions(data.contributions ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [username]);

  const NUM_MONTHS = 4;
  const { weeks } = buildGrid(contributions, NUM_MONTHS);
  const labels = monthLabels(weeks);

  // Tally contributions within the rendered range
  useEffect(() => {
    if (!weeks.length) return;
    const total = weeks.flat().reduce((s, d) => s + (d.isFuture ? 0 : d.count), 0);
    setTotalInRange(total);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contributions]);

  const gridWidth  = weeks.length  * (CELL + GAP) - GAP;
  const gridHeight = 7              * (CELL + GAP) - GAP;
  const LABEL_W = 28; // px reserved on left for day labels
  const MONTH_H = 18; // px reserved on top for month labels

  function formatDate(iso: string) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      className="flex flex-col items-center gap-2"
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full px-1">
        <span
          className="text-gray-500 text-xs uppercase tracking-[0.18em] font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          GitHub Activity
        </span>
        {!loading && !error && (
          <span className="text-gray-600 text-xs font-light">
            {totalInRange} contributions in the last {NUM_MONTHS} months
          </span>
        )}
      </div>

      {/* Heatmap container */}
      <div
        className="relative rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3"
        style={{ backdropFilter: "blur(4px)" }}
      >
        {loading && (
          <div
            style={{ width: gridWidth + LABEL_W, height: gridHeight + MONTH_H }}
            className="flex items-center justify-center"
          >
            <span className="text-gray-600 text-xs animate-pulse">Loading…</span>
          </div>
        )}

        {error && (
          <div
            style={{ width: gridWidth + LABEL_W, height: gridHeight + MONTH_H }}
            className="flex items-center justify-center"
          >
            <span className="text-gray-600 text-xs">Couldn't load contributions</span>
          </div>
        )}

        {!loading && !error && (
          <div style={{ position: "relative", width: gridWidth + LABEL_W, height: gridHeight + MONTH_H }}>

            {/* Month labels */}
            {labels.map(({ colIdx, month }) => (
              <span
                key={month}
                style={{
                  position: "absolute",
                  left: LABEL_W + colIdx * (CELL + GAP),
                  top: 0,
                  fontSize: 10,
                  color: "#6e7681",
                  lineHeight: `${MONTH_H}px`,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.05em",
                  userSelect: "none",
                }}
              >
                {month}
              </span>
            ))}

            {/* Day-of-week labels */}
            {DAY_LABELS.map((label, row) =>
              label ? (
                <span
                  key={row}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: MONTH_H + row * (CELL + GAP) + (CELL - 10) / 2,
                    fontSize: 10,
                    color: "#6e7681",
                    width: LABEL_W - 6,
                    textAlign: "right",
                    fontFamily: "var(--font-display)",
                    userSelect: "none",
                  }}
                >
                  {label}
                </span>
              ) : null
            )}

            {/* Grid cells */}
            {weeks.map((week, col) =>
              week.map((day, row) => {
                const level = day.isFuture ? 0 : day.level;
                return (
                  <div
                    key={day.date}
                    onMouseEnter={(e) => {
                      const rect = (e.currentTarget as HTMLElement)
                        .closest(".relative")!
                        .getBoundingClientRect();
                      const cellRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      setTooltip({
                        text: day.isFuture
                          ? "No data"
                          : `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatDate(day.date)}`,
                        x: cellRect.left - rect.left + CELL / 2,
                        y: cellRect.top  - rect.top,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      position: "absolute",
                      left: LABEL_W + col * (CELL + GAP),
                      top:  MONTH_H + row * (CELL + GAP),
                      width: CELL,
                      height: CELL,
                      borderRadius: 3,
                      backgroundColor: day.isFuture ? "transparent" : LEVEL_COLORS[level],
                      border: day.isFuture ? "none" : `1px solid ${LEVEL_BORDER[level]}`,
                      cursor: "default",
                      transition: "transform 0.1s, filter 0.1s",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.25)";
                      (e.currentTarget as HTMLElement).style.filter = "brightness(1.4)";
                    }}
                    onFocus={() => {}}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "";
                      (e.currentTarget as HTMLElement).style.filter = "";
                    }}
                  />
                );
              })
            )}

            {/* Tooltip */}
            {tooltip && (
              <div
                style={{
                  position: "absolute",
                  left: tooltip.x,
                  top: tooltip.y - 32,
                  transform: "translateX(-50%)",
                  background: "#1c2128",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 6,
                  padding: "4px 8px",
                  fontSize: 11,
                  color: "#e6edf3",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  zIndex: 50,
                  fontFamily: "var(--font-display)",
                }}
              >
                {tooltip.text}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      {!loading && !error && (
        <div className="flex items-center gap-1.5 self-end pr-1">
          <span className="text-gray-600 text-[10px]">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div
              key={i}
              style={{
                width: 11,
                height: 11,
                borderRadius: 2,
                backgroundColor: color,
                border: `1px solid ${LEVEL_BORDER[i]}`,
              }}
            />
          ))}
          <span className="text-gray-600 text-[10px]">More</span>
        </div>
      )}
    </motion.div>
  );
}
