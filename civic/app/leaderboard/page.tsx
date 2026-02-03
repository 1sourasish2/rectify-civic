"use client";

import React, { useEffect, useMemo, useState, ReactNode } from "react";
import {
  faArrowLeft,
  faUser,
  faUsers,
  faCertificate,
  faCheckCircle,
  faSearch,
  faSort,
  faChartBar,
  faHistory,
  faRocket,
  faChevronRight,
  faGlobe,
  faStar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* ---------------------- Types ---------------------- */
export interface Reporter {
  id: string;
  name: string;
  role: string;
  avatar: string;
  points: number;
  about: string;
  actions: string[];
  badges: string[]; // badge ids
  recentActivity: string;
  created: string; // year
  location: string;
  stats: {
    issuesReported: number;
    issuesResolved: number;
    initiativesLed: number;
    engagementScore: number;
    yearsActive: number;
    upvotes: number;
    eventsParticipated: number;
    collaborations: number;
  };
  history: string[];
}

export interface Neighborhood {
  id: string;
  name: string;
  description: string;
  image: string;
  points: number;
  created: string;
  activeProjects: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string; // tailwind bg color class
}

/* ---------------------- Utilities ---------------------- */
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* ---------------------- Seed data ---------------------- */
const badgeTemplates: Omit<Badge, "id">[] = [
  {
    title: "Civic Hero",
    description: "50+ reports resolved",
    image: "https://cdn-icons-png.flaticon.com/512/164/164556.png",
    color: "bg-blue-600",
  },
  {
    title: "Problem Solver",
    description: "Fast resolver",
    image: "https://cdn-icons-png.flaticon.com/512/1447/1447935.png",
    color: "bg-green-500",
  },
  {
    title: "Community Champ",
    description: "Led local initiatives",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    color: "bg-yellow-500",
  },
  {
    title: "Safety Sentinel",
    description: "Improved safety",
    image: "https://cdn-icons-png.flaticon.com/512/4206/4206299.png",
    color: "bg-orange-500",
  },
  {
    title: "Green Guardian",
    description: "Environmental wins",
    image: "https://cdn-icons-png.flaticon.com/512/1183/1183626.png",
    color: "bg-teal-600",
  },
  {
    title: "Rocket Volunteer",
    description: "Rapid response",
    image: "https://cdn-icons-png.flaticon.com/512/2921/2921828.png",
    color: "bg-red-500",
  },
  {
    title: "Thumbs Up",
    description: "Highly upvoted",
    image: "https://cdn-icons-png.flaticon.com/512/456/456115.png",
    color: "bg-pink-500",
  },
];

function generateBadge(id: string, template: Omit<Badge, "id">): Badge {
  return { id, ...template };
}

export const badges: Badge[] = badgeTemplates
  .map((t, i) => generateBadge(`b${i + 1}`, t))
  .concat(
    Array.from({ length: 4 }, (_, i) => ({
      id: `b${i + 10}`,
      title: `Special ${i + 1}`,
      description: `Special recognition ${i + 1}`,
      image: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
      color: "bg-violet-600",
    }))
  );

/* small pools */
const roles = [
  "City Activist",
  "Environmentalist",
  "Neighborhood Lead",
  "Planner",
  "Organizer",
  "Safety Officer",
  "Volunteer",
  "Youth Rep",
];

const locations = [
  "Green Valley",
  "Downtown",
  "Sunset Hills",
  "East Side",
  "South Park",
  "Civic Center",
  "Riverdale",
  "Maple Heights",
];

const actions = [
  "Led a workshop",
  "Organized patrols",
  "Resolved safety issues",
  "Started recycling drives",
  "Improved lighting",
  "Hosted forums",
  "Mentored volunteers",
  "Restored park",
  "Reported infrastructure faults",
];

const histories = [
  "Formed local committee",
  "Raised funds for park",
  "City cleanup volunteer",
  "Partnered with police",
  "Led renovations",
  "Awareness campaign",
  "Coordinated drives",
  "Traffic improvements",
  "Public seminar",
  "Youth events",
];

/* ---------------------- Generators ---------------------- */
function generateReporter(id: number): Reporter {
  const badgeIDs = badges.map((b) => b.id);
  const selected = badgeIDs.sort(() => 0.5 - Math.random()).slice(0, randomInt(2, 5));
  return {
    id: `r${id}`,
    name: `Alex ${id}`,
    role: roles[randomInt(0, roles.length - 1)],
    avatar: `https://randomuser.me/api/portraits/${
      id % 2 === 0 ? "men" : "women"
    }/${(id % 99) + 1}.jpg`,
    points: Math.max(0, 1500 - id * randomInt(3, 12) + randomInt(-20, 80)),
    about: `Local civic contributor focused on tangible community outcomes. Joined ${2012 + (id % 8)}.`,
    actions: Array.from({ length: randomInt(2, 6) }, () => actions[randomInt(0, actions.length - 1)]),
    badges: selected,
    recentActivity: actions[randomInt(0, actions.length - 1)],
    created: `${2010 + (id % 12)}`,
    location: locations[randomInt(0, locations.length - 1)],
    stats: {
      issuesReported: randomInt(10, 100),
      issuesResolved: randomInt(5, 90),
      initiativesLed: randomInt(0, 16),
      engagementScore: randomInt(30, 100),
      yearsActive: randomInt(1, 15),
      upvotes: randomInt(2, 200),
      eventsParticipated: randomInt(1, 60),
      collaborations: randomInt(0, 30),
    },
    history: Array.from({ length: randomInt(3, 8) }, () => histories[randomInt(0, histories.length - 1)]),
  };
}

function generateNeighborhood(id: number): Neighborhood {
  const n = locations[id % locations.length];
  return {
    id: `n${id}`,
    name: n,
    description: actions[id % actions.length],
    image: `https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=400&q=60`,
    points: Math.max(0, 3000 - id * randomInt(10, 80) + randomInt(-80, 150)),
    created: `${2010 + (id % 12)}`,
    activeProjects: randomInt(0, 10),
  };
}

export const reporters: Reporter[] = Array.from({ length: 48 }, (_, i) => generateReporter(i + 1));
export const neighborhoods: Neighborhood[] = Array.from({ length: 18 }, (_, i) => generateNeighborhood(i + 1));

/* ---------------------- Sort Options ---------------------- */
export type SortKey = "points" | keyof Reporter["stats"];
export const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Points", value: "points" },
  { label: "Reported", value: "issuesReported" },
  { label: "Resolved", value: "issuesResolved" },
  { label: "Initiatives", value: "initiativesLed" },
  { label: "Engagement", value: "engagementScore" },
  { label: "Years", value: "yearsActive" },
  { label: "Upvotes", value: "upvotes" },
  { label: "Events", value: "eventsParticipated" },
  { label: "Collabs", value: "collaborations" },
];

/* ---------------------- Mobile detector hook ---------------------- */
export function useMobile(breakpoint = 900) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    function onResize() {
      setMobile(window.innerWidth < breakpoint);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return mobile;
}

/* ---------------------- Tabs (typed) ---------------------- */
interface TabProps {
  label: ReactNode;
  children: ReactNode;
}

export function Tab({ children }: TabProps) {
  return <div className="animate-fadeIn">{children}</div>;
}

export function Tabs({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];

  return (
    <div>
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm font-semibold focus:outline-none transition-all ${
              i === activeIndex
                ? "bg-white shadow-md text-blue-600 ring-1 ring-blue-100"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveIndex(i)}
            role="tab"
            aria-selected={i === activeIndex}
            tabIndex={i === activeIndex ? 0 : -1}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="min-h-[120px]">
        {tabs[activeIndex]}
      </div>
    </div>
  );
}

// Part 2 - CivicLeaderboard (default export)

export default function CivicLeaderboard() {
  // states
  const mobile = useMobile();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("points");

  // selected item can be reporter, neighborhood or badge
  type Selected =
    | { kind: "reporter"; id: string }
    | { kind: "neighborhood"; id: string }
    | { kind: "badge"; id: string }
    | null;

  const [selected, setSelected] = useState<Selected>(null);

  const [tabView, setTabView] = useState<"reporters" | "neighborhoods" | "badges">("reporters");

  // derived selected objects
  const selectedReporter = useMemo(
    () => (selected?.kind === "reporter" ? reporters.find((r) => r.id === selected.id) ?? null : null),
    [selected]
  );
  const selectedNeighborhood = useMemo(
    () => (selected?.kind === "neighborhood" ? neighborhoods.find((n) => n.id === selected.id) ?? null : null),
    [selected]
  );
  const selectedBadge = useMemo(
    () => (selected?.kind === "badge" ? badges.find((b) => b.id === selected.id) ?? null : null),
    [selected]
  );

  /* Filter + sort reporters (non-mutating) */
  const filteredReporters = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = reporters.filter(
      (r) =>
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
    );
    const sorted = [...base].sort((a, b) => {
      if (sortKey === "points") return b.points - a.points;
      return b.stats[sortKey] - a.stats[sortKey];
    });
    return sorted;
  }, [query, sortKey]);

  /* Filter neighborhoods */
  const filteredNeighborhoods = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...neighborhoods]
      .filter((n) => !q || n.name.toLowerCase().includes(q) || n.description.toLowerCase().includes(q))
      .sort((a, b) => b.points - a.points);
  }, [query]);

  /* Filter badges */
  const filteredBadges = useMemo(() => {
    const q = query.trim().toLowerCase();
    return badges.filter((b) => !q || b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q));
  }, [query]);

  /* lock scroll when mobile profile open */
  useEffect(() => {
    if (mobile && selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    return;
  }, [mobile, selected]);

  /* Stats mapping (typed) */
  const statsList: { key: keyof Reporter["stats"]; label: string; icon?: React.ReactNode }[] = [
    { key: "issuesReported", label: "Reported", icon: <FontAwesomeIcon icon={faCertificate} /> },
    { key: "issuesResolved", label: "Resolved", icon: <FontAwesomeIcon icon={faCheckCircle} /> },
    { key: "initiativesLed", label: "Initiatives", icon: <FontAwesomeIcon icon={faChartBar} /> },
    { key: "engagementScore", label: "Engagement", icon: <FontAwesomeIcon icon={faRocket} /> },
    { key: "yearsActive", label: "Years", icon: <FontAwesomeIcon icon={faClock} /> },
    { key: "upvotes", label: "Upvotes", icon: <FontAwesomeIcon icon={faStar} /> },
    { key: "eventsParticipated", label: "Events", icon: <FontAwesomeIcon icon={faUsers} /> },
    { key: "collaborations", label: "Collabs", icon: <FontAwesomeIcon icon={faGlobe} /> },
  ];

  /* helpers for opening items */
  const openReporter = (id: string) => setSelected({ kind: "reporter", id });
  const openNeighborhood = (id: string) => setSelected({ kind: "neighborhood", id });
  const openBadge = (id: string) => setSelected({ kind: "badge", id });

  return (
    <div className="min-h-screen text-gray-900 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-green-600 text-white">
                <FontAwesomeIcon icon={faGlobe} />
              </span>
              Civic Leaderboard
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => {
                setTabView("reporters");
                setSelected(null);
              }}
              className={`px-3 py-2 rounded-lg text-sm font-semibold ${tabView === "reporters" ? "bg-white shadow text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Reporters
            </button>
            <button
              onClick={() => {
                setTabView("neighborhoods");
                setSelected(null);
              }}
              className={`px-3 py-2 rounded-lg text-sm font-semibold ${tabView === "neighborhoods" ? "bg-white shadow text-green-700" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Neighborhoods
            </button>
            <button
              onClick={() => {
                setTabView("badges");
                setSelected(null);
              }}
              className={`px-3 py-2 rounded-lg text-sm font-semibold ${tabView === "badges" ? "bg-white shadow text-yellow-600" : "text-gray-600 hover:bg-gray-50"}`}
            >
              Badges
            </button>
          </div>
        </header>

        <div className={`flex gap-6 ${mobile ? "flex-col" : "flex-row"}`}>
          {/* LEFT: Listing / Leaderboard */}
          <main
            className={`flex-1 bg-white rounded-2xl shadow p-5 transition-all duration-300 ${
              mobile ? "min-h-[70vh] z-10" : selected ? "md:w-1/2 lg:w-2/3" : "w-full"
            }`}
            aria-label="Listing"
          >
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <div className="relative flex-1">
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
                <input
                  aria-label="Search reporters, neighborhoods, badges"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  placeholder={
                    tabView === "reporters"
                      ? "Search reporter, role, location..."
                      : tabView === "neighborhoods"
                      ? "Search neighborhood..."
                      : "Search badges..."
                  }
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSort} className="text-gray-400" />
                <select
                  className="rounded-lg px-3 py-2 border border-gray-100 focus:ring-2 focus:ring-blue-200"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  aria-label="Sort listing"
                >
                  {sortOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tabs inside left for three types */}
            <Tabs>
              <Tab
                label={
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="hidden sm:inline">Reporters</span>
                  </div>
                }
              >
                <div className="space-y-3">
                  {filteredReporters.length === 0 && <div className="text-center py-6 text-gray-400">No matches</div>}

                  <ul role="list" className="space-y-2 max-h-[60vh] overflow-y-auto no-scrollbar pr-2">
                    {filteredReporters.map((r, i) => (
                      <li
                        key={r.id}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") openReporter(r.id);
                        }}
                        onClick={() => openReporter(r.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl hover:shadow-md transition-all cursor-pointer ${
                          selected?.kind === "reporter" && selected.id === r.id ? "ring-2 ring-blue-100 bg-blue-50" : "bg-white"
                        }`}
                        aria-pressed={selected?.kind === "reporter" && selected.id === r.id}
                        aria-label={`Open profile for ${r.name}`}
                      >
                        <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold truncate">{r.name}</p>
                            <p className="text-xs text-gray-400 truncate">{r.location}</p>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {r.role} • {r.recentActivity}
                          </p>
                        </div>

                        <div className="ml-auto text-right">
                          <div className="text-sm font-bold text-blue-600">{r.points} pts</div>
                          <div className="text-xs text-gray-400">{r.stats.issuesResolved} solved</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tab>

              <Tab
                label={
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUsers} />
                    <span className="hidden sm:inline">Neighborhoods</span>
                  </div>
                }
              >
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredNeighborhoods.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => openNeighborhood(n.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openNeighborhood(n.id);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl bg-white hover:shadow transition cursor-pointer ${
                        selected?.kind === "neighborhood" && selected.id === n.id ? "ring-2 ring-green-100" : ""
                      }`}
                    >
                      <img src={n.image} alt={n.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{n.name}</p>
                        <p className="text-xs text-gray-500 truncate">{n.description}</p>
                        <p className="text-xs text-gray-400 mt-1">Since {n.created}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-sm font-bold text-green-700">{n.points}</div>
                        <div className="text-xs text-gray-400">{n.activeProjects} projects</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab>

              <Tab
                label={
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCertificate} />
                    <span className="hidden sm:inline">Badges</span>
                  </div>
                }
              >
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {filteredBadges.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => openBadge(b.id)}
                      className="rounded-xl p-3 bg-white hover:shadow flex flex-col items-center gap-2 text-center cursor-pointer"
                      aria-pressed={selected?.kind === "badge" && selected.id === b.id}
                    >
                      <img src={b.image} alt={b.title} className="w-12 h-12" />
                      <div className="text-sm font-semibold">{b.title}</div>
                      <div className="text-xs text-gray-500 truncate">{b.description}</div>
                    </button>
                  ))}
                </div>
              </Tab>
            </Tabs>

            {/* Summary */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl p-3 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <FontAwesomeIcon icon={faChartBar} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Top</div>
                  <div className="text-xs text-gray-500">Points</div>
                </div>
              </div>

              <div className="rounded-xl p-3 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-700 text-white flex items-center justify-center">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Neighborhoods</div>
                  <div className="text-xs text-gray-500">Active</div>
                </div>
              </div>

              <div className="rounded-xl p-3 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500 text-white flex items-center justify-center">
                  <FontAwesomeIcon icon={faCertificate} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Badges</div>
                  <div className="text-xs text-gray-500">Recognition</div>
                </div>
              </div>

              <div className="rounded-xl p-3 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Recent</div>
                  <div className="text-xs text-gray-500">Activity</div>
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT: Profile panel (desktop) or slide (mobile) */}
          {selected ? (
            mobile ? (
              /* Mobile slide-in */
              <>
                <div
                  aria-hidden="true"
                  className="fixed inset-0 z-40 bg-black/30"
                  onClick={() => setSelected(null)}
                />
                <aside
                  role="dialog"
                  aria-label="Details"
                  className="fixed bottom-0 right-0 z-50 w-full h-[86vh] bg-white rounded-t-2xl shadow-2xl"
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => setSelected(null)}
                        aria-label="Back"
                        className="p-2 rounded-full bg-gray-100 text-gray-700"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>

                      <div className="flex-1 min-w-0">
                        {selected.kind === "reporter" && selectedReporter && (
                          <>
                            <h2 className="text-lg font-bold truncate">{selectedReporter.name}</h2>
                            <p className="text-xs text-gray-500 truncate">{selectedReporter.role} • {selectedReporter.location}</p>
                          </>
                        )}
                        {selected.kind === "neighborhood" && selectedNeighborhood && (
                          <>
                            <h2 className="text-lg font-bold truncate">{selectedNeighborhood.name}</h2>
                            <p className="text-xs text-gray-500 truncate">{selectedNeighborhood.activeProjects} projects</p>
                          </>
                        )}
                        {selected.kind === "badge" && selectedBadge && (
                          <>
                            <h2 className="text-lg font-bold truncate">{selectedBadge.title}</h2>
                            <p className="text-xs text-gray-500 truncate">{selectedBadge.description}</p>
                          </>
                        )}
                      </div>

                      <div className="text-sm font-bold text-blue-600">
                        {selected.kind === "reporter" && selectedReporter ? `${selectedReporter.points} pts` : null}
                        {selected.kind === "neighborhood" && selectedNeighborhood ? `${selectedNeighborhood.points} pts` : null}
                      </div>
                    </div>

                    <div className="overflow-y-auto">
                      {/* Reporter view */}
                      {selected.kind === "reporter" && selectedReporter && (
                        <>
                          <section className="flex gap-4 items-start mb-4">
                            <img src={selectedReporter.avatar} alt={selectedReporter.name} className="w-24 h-24 rounded-xl object-cover" />
                            <div>
                              <p className="text-sm text-gray-600 mb-2">{selectedReporter.about}</p>
                              <div className="flex gap-2 flex-wrap">
                                {selectedReporter.badges.map((id) => {
                                  const b = badges.find((bb) => bb.id === id);
                                  if (!b) return null;
                                  return (
                                    <div key={id} className={`px-3 py-1 rounded-full text-white text-xs ${b.color} flex items-center gap-2`}>
                                      <img src={b.image} alt={b.title} className="w-4 h-4 rounded-sm" />
                                      <span>{b.title}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </section>

                          <section className="mb-4">
                            <h3 className="font-semibold mb-2">Stats</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {statsList.map((s) => (
                                <div key={s.key} className="rounded-lg p-3 bg-gray-50">
                                  <div className="text-xl font-bold">{selectedReporter.stats[s.key]}</div>
                                  <div className="text-xs text-gray-600">{s.label}</div>
                                </div>
                              ))}
                            </div>
                          </section>

                          <section className="mb-4">
                            <h3 className="font-semibold mb-2">Recent</h3>
                            <div className="rounded-lg p-3 bg-white shadow-sm text-gray-700">{selectedReporter.recentActivity}</div>
                          </section>

                          <section className="mb-8">
                            <h3 className="font-semibold mb-2">History</h3>
                            <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                              {selectedReporter.history.map((h, idx) => (
                                <li key={idx}>{h}</li>
                              ))}
                            </ol>
                          </section>
                        </>
                      )}

                      {/* Neighborhood view */}
                      {selected.kind === "neighborhood" && selectedNeighborhood && (
                        <>
                          <section className="mb-4">
                            <img src={selectedNeighborhood.image} alt={selectedNeighborhood.name} className="w-full h-36 object-cover rounded-md mb-3" />
                            <p className="text-sm text-gray-700">{selectedNeighborhood.description}</p>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                              <div className="rounded-lg p-3 bg-gray-50">
                                <div className="text-lg font-bold">{selectedNeighborhood.activeProjects}</div>
                                <div className="text-xs text-gray-600">Projects</div>
                              </div>
                              <div className="rounded-lg p-3 bg-gray-50">
                                <div className="text-lg font-bold">{selectedNeighborhood.points}</div>
                                <div className="text-xs text-gray-600">Points</div>
                              </div>
                            </div>
                          </section>

                          <section className="mb-4">
                            <h3 className="font-semibold mb-2">Top locals</h3>
                            <ul className="space-y-2">
                              {reporters
                                .filter((r) => r.location === selectedNeighborhood.name)
                                .slice(0, 6)
                                .map((r) => (
                                  <li key={r.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => openReporter(r.id)}>
                                    <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold truncate">{r.name}</div>
                                      <div className="text-xs text-gray-500 truncate">{r.role}</div>
                                    </div>
                                    <div className="text-xs text-gray-400">{r.points} pts</div>
                                  </li>
                                ))}
                            </ul>
                          </section>
                        </>
                      )}

                      {/* Badge view */}
                      {selected.kind === "badge" && selectedBadge && (
                        <>
                          <section className="mb-4 flex items-center gap-4">
                            <img src={selectedBadge.image} alt={selectedBadge.title} className="w-20 h-20" />
                            <div>
                              <h3 className="text-xl font-semibold">{selectedBadge.title}</h3>
                              <p className="text-sm text-gray-500">{selectedBadge.description}</p>
                            </div>
                          </section>

                          <section>
                            <h3 className="font-semibold mb-2">Holders</h3>
                            <ul className="space-y-2">
                              {reporters
                                .filter((r) => r.badges.includes(selectedBadge.id))
                                .slice(0, 10)
                                .map((r) => (
                                  <li key={r.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => openReporter(r.id)}>
                                    <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold truncate">{r.name}</div>
                                      <div className="text-xs text-gray-500 truncate">{r.role}</div>
                                    </div>
                                    <div className="text-xs text-gray-400">{r.points} pts</div>
                                  </li>
                                ))}
                            </ul>
                          </section>
                        </>
                      )}
                    </div>
                  </div>
                </aside>
              </>
            ) : (
              /* Desktop persistent panel */
              <aside className="md:w-1/2 lg:w-1/3 bg-white rounded-2xl shadow p-6 transition-all duration-300" aria-label="Details panel">
                {/* Reporter card */}
                {selected.kind === "reporter" && selectedReporter && (
                  <>
                    <div className="flex items-start gap-4">
                      <img src={selectedReporter.avatar} alt={selectedReporter.name} className="w-20 h-20 rounded-2xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h2 className="text-2xl font-extrabold truncate">{selectedReporter.name}</h2>
                            <p className="text-sm text-gray-500">{selectedReporter.role}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600">{selectedReporter.points} pts</div>
                            <div className="text-xs text-gray-400">Joined {selectedReporter.created}</div>
                          </div>
                        </div>

                        <p className="mt-3 text-sm text-gray-700">{selectedReporter.about}</p>

                        <div className="mt-4 flex gap-2 flex-wrap">
                          {selectedReporter.badges.map((id) => {
                            const b = badges.find((bb) => bb.id === id);
                            if (!b) return null;
                            return (
                              <div key={id} className={`px-3 py-1 rounded-full text-white text-xs ${b.color} flex items-center gap-2`}>
                                <img src={b.image} alt={b.title} className="w-4 h-4 rounded-sm" />
                                <span>{b.title}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {statsList.map((s) => (
                        <div key={s.key} className="rounded-xl bg-gray-50 p-3">
                          <div className="text-lg font-bold">{selectedReporter.stats[s.key]}</div>
                          <div className="text-xs text-gray-600">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Recent</h4>
                      <div className="rounded-lg p-3 bg-white shadow-sm">{selectedReporter.recentActivity}</div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">History</h4>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700 max-h-40 overflow-y-auto no-scrollbar">
                        {selectedReporter.history.map((h, idx) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <button onClick={() => setSelected(null)} className="flex-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                        Back
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Message</button>
                    </div>
                  </>
                )}

                {/* Neighborhood card */}
                {selected.kind === "neighborhood" && selectedNeighborhood && (
                  <>
                    <img src={selectedNeighborhood.image} alt={selectedNeighborhood.name} className="w-full h-36 object-cover rounded-md mb-3" />
                    <h2 className="text-2xl font-extrabold">{selectedNeighborhood.name}</h2>
                    <p className="text-sm text-gray-700 mt-2">{selectedNeighborhood.description}</p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-gray-50 p-3">
                        <div className="text-lg font-bold">{selectedNeighborhood.activeProjects}</div>
                        <div className="text-xs text-gray-600">Projects</div>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3">
                        <div className="text-lg font-bold">{selectedNeighborhood.points}</div>
                        <div className="text-xs text-gray-600">Points</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Top locals</h4>
                      <ul className="space-y-2">
                        {reporters
                          .filter((r) => r.location === selectedNeighborhood.name)
                          .slice(0, 8)
                          .map((r) => (
                            <li key={r.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => openReporter(r.id)}>
                              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full" />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold truncate">{r.name}</div>
                                <div className="text-xs text-gray-500 truncate">{r.role}</div>
                              </div>
                              <div className="text-xs text-gray-400">{r.points} pts</div>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <button onClick={() => setSelected(null)} className="flex-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                        Back
                      </button>
                    </div>
                  </>
                )}

                {/* Badge card */}
                {selected.kind === "badge" && selectedBadge && (
                  <>
                    <div className="flex items-center gap-4">
                      <img src={selectedBadge.image} alt={selectedBadge.title} className="w-20 h-20" />
                      <div>
                        <h2 className="text-2xl font-extrabold">{selectedBadge.title}</h2>
                        <p className="text-sm text-gray-500">{selectedBadge.description}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Holders</h4>
                      <ul className="space-y-2">
                        {reporters
                          .filter((r) => r.badges.includes(selectedBadge.id))
                          .slice(0, 10)
                          .map((r) => (
                            <li key={r.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => openReporter(r.id)}>
                              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full" />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold truncate">{r.name}</div>
                                <div className="text-xs text-gray-500 truncate">{r.role}</div>
                              </div>
                              <div className="text-xs text-gray-400">{r.points} pts</div>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <button onClick={() => setSelected(null)} className="flex-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                        Back
                      </button>
                    </div>
                  </>
                )}
              </aside>
            )
          ) : (
            /* Placeholder right column when no item selected (desktop) */
            !mobile && (
              <aside className="md:w-1/2 lg:w-1/3">
                <div className="sticky top-6 bg-white rounded-2xl p-6 shadow text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gray-100 text-blue-600 mx-auto mb-4">
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <h3 className="font-semibold mb-1">Select an item</h3>
                  <p className="text-sm text-gray-500 mb-4">Click a reporter, neighborhood or badge to view details</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg p-3 bg-gray-50">
                      <div className="text-sm font-bold">Top</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>
                    <div className="rounded-lg p-3 bg-gray-50">
                      <div className="text-sm font-bold">Active</div>
                      <div className="text-xs text-gray-500">Neighborhoods</div>
                    </div>
                  </div>
                </div>
              </aside>
            )
          )}
        </div>
      </div>

      {/* small global styles */}
     
    </div>
  );
}
