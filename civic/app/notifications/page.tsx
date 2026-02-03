"use client";

import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faExclamationTriangle,
  faClock,
  faWater,
  faRoad,
  faTree,
  faBuilding,
  faUsers,
  faChevronDown,
  faChevronUp,
  faCity,
} from "@fortawesome/free-solid-svg-icons";

/* -----------------------------
   Types
--------------------------------*/
type NotificationStatus = "solved" | "pending" | "in-progress";
type NotificationSeverity = "low" | "medium" | "high";

interface Notification {
  id: string;
  title: string;
  description: string;
  department: string;
  status: NotificationStatus;
  severity: NotificationSeverity;
  timestamp: string;
  solvedBy?: string;
  assignedTo?: string;
}

/* -----------------------------
   Department Colors
--------------------------------*/
function departmentColor(dept: string) {
  if (dept.includes("Water")) return "border-blue-500 bg-blue-50 text-blue-700";
  if (dept.includes("Public Works")) return "border-gray-600 bg-gray-50 text-gray-700";
  if (dept.includes("Sanitation")) return "border-green-600 bg-green-50 text-green-700";
  if (dept.includes("Electricity")) return "border-yellow-500 bg-yellow-50 text-yellow-700";
  if (dept.includes("Environmental")) return "border-green-700 bg-green-100 text-green-800";
  if (dept.includes("Disaster")) return "border-red-700 bg-red-50 text-red-700";
  if (dept.includes("Transport")) return "border-indigo-500 bg-indigo-50 text-indigo-700";
  if (dept.includes("Health")) return "border-pink-600 bg-pink-50 text-pink-700";
  if (dept.includes("Engineering")) return "border-purple-600 bg-purple-50 text-purple-700";
  if (dept.includes("Fire")) return "border-orange-600 bg-orange-50 text-orange-700";
  if (dept.includes("Traffic")) return "border-teal-600 bg-teal-50 text-teal-700";
  return "border-gray-400 bg-white text-gray-700";
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Water Leakage Resolved at 5th Avenue",
    department: "Water Supply",
    status: "solved",
    severity: "medium",
    timestamp: "2025-09-15T14:32:00Z",
    solvedBy: "Water Supply Department",
    description: `
Date Completed: 2025-09-15 14:32 UTC
Department: Water Supply Department
Status: SOLVED
Severity: MEDIUM
Resolved By: Water Supply Department

OVERVIEW  
A critical underground pipeline leak at 5th Avenue had been causing repeated waterlogging and disruption to households. After urgent intervention, the Water Supply Department announced successful resolution of the crisis.

DETAILS OF ACTIONS TAKEN  
1. PIPELINE REPLACEMENT  
   - Damaged cast-iron water main replaced with reinforced steel lining.  
   - Leak-resistant joints installed for durability.  

2. ROAD EXCAVATION AND REFILLING  
   - Road excavated with minimal collateral damage.  
   - Refilled and re-tarred overnight to reduce commuter inconvenience.  

3. WATER SUPPLY RESTORATION  
   - Service restored fully by morning hours.  
   - Supply quality verified by laboratory team for turbidity and chlorine levels.  

4. FOLLOW-UP MONITORING  
   - Inspection teams scheduled to revisit site weekly until stabilization.  

OBJECTIVE AND IMPACT  
The project ensured uninterrupted water services while preventing loss of potable water. Citizens reported restored daily routines and decreased road accidents caused by waterlogging.
`,
  },
  {
    id: "2",
    title: "Riverside Flood Warning Issued",
    department: "Disaster Management",
    status: "in-progress",
    severity: "high",
    timestamp: "2025-09-16T10:15:00Z",
    assignedTo: "Disaster Response Team",
    description: `
Date: 2025-09-16 10:15 UTC
Department: Disaster Management
Status: IN-PROGRESS
Severity: HIGH
Assigned To: Disaster Response Team

OVERVIEW  
Following record monsoon rainfall, river levels near Riverside reached critical danger levels. The Disaster Management Department issued a full-scale flood advisory to safeguard lives and property.

DETAILS OF ACTIONS TAKEN  
1. FLOOD WARNING ALERT ISSUED  
   - Multi-platform alerts (radio, SMS, social media) released.  
   - Emphasis on vulnerable housing zones.  

2. EVACUATION AND RELIEF PREPARATION  
   - 100 relief shelters established.  
   - Rescue boats and life jackets distributed.  

3. SANDBAG PLACEMENT AND LEVEE SUPPORT  
   - Local embankments fortified with 20,000 sandbags.  
   - Continuous patrols along flood-prone banks.  

4. MEDICAL AND SUPPLY STOCKPILING  
   - Rapid medical response teams set up.  
   - Food and water rationing centers activated.  

OBJECTIVE AND IMPACT  
The initiative prioritizes public safety and minimizing loss during flood disaster. Families in low-lying areas successfully relocated; critical services remain protected.
`,
  },
  {
    id: "3",
    title: "Streetlights Restored in East End Colony",
    department: "Electricity Board",
    status: "solved",
    severity: "low",
    timestamp: "2025-09-14T18:30:00Z",
    solvedBy: "Electricity Board",
    description: `
Date Completed: 2025-09-14 18:30 UTC
Department: Electricity Board
Status: SOLVED
Severity: LOW
Resolved By: Electricity Board

OVERVIEW  
Persistent complaints of dysfunctional street lighting in East End Colony raised safety concerns, including minor thefts and road accidents. The Electricity Board mobilized teams for large-scale repair and modernization.

DETAILS OF ACTIONS TAKEN  
1. BULB AND FIXTURE REPLACEMENT  
   - 45 faulty bulbs replaced with energy-efficient LED bulbs.  
   - Wiring thoroughly tested for safety compliance.  

2. INFRASTRUCTURE UPGRADING  
   - Power poles reinforced with anti-rust coating.  
   - Smart light timers tested for timely switching.  

3. MONITORING CELL ACTIVATED  
   - Quick-response team established for real-time outage complaints.  
   - Follow-up monitoring logs kept digitally.  

OBJECTIVE AND IMPACT  
Illuminated streets restored security, enhanced night-time mobility, and improved the quality of urban life.
`,
  },
  {
    id: "4",
    title: "Riverbank Safety Fencing Completed",
    department: "Engineering Department",
    status: "solved",
    severity: "medium",
    timestamp: "2025-08-22T16:45:00Z",
    solvedBy: "Engineering Department",
    description: `
Date Completed: 2025-08-22 16:45 UTC
Department: Engineering Department
Status: SOLVED
Severity: MEDIUM
Resolved By: Engineering Department

OVERVIEW  
In a major safety initiative, the Engineering Department has completed the installation of safety measures along the Riverside banks. The project aims to prevent accidental falls and enhance public safety, particularly in areas heavily frequented by pedestrians, families, and recreational visitors.

DETAILS OF ACTIONS TAKEN  
1. STURDY SAFETY FENCING INSTALLED  
   - 500m fencing made from high-strength alloys.  
   - Strategically lined at high-risk erosion points.  

2. WARNING SIGNAGE ADDED  
   - Clear hazard signs placed at entry points.  
   - Maintained weekly for visibility.  

3. NIGHT REFLECTORS INCLUDED  
   - Solar road studs and reflective tapes added.  
   - Tested for illumination in foggy weather.  

4. COMMUNITY AWARENESS DRIVE  
   - Meetings with local residents conducted.  
   - Media bulletins distributed for safety education.  

OBJECTIVE AND IMPACT  
Resulted in safer pedestrian access to Riverside, reduced accidents, and improved community confidence.
`,
  },
  {
    id: "5",
    title: "Fire Hydrant Network Tested",
    department: "Fire Department",
    status: "solved",
    severity: "medium",
    timestamp: "2025-09-06T08:00:00Z",
    solvedBy: "Fire Department",
    description: `
Date Completed: 2025-09-06 08:00 UTC
Department: Fire Department
Status: SOLVED
Severity: MEDIUM
Resolved By: Fire Department

OVERVIEW  
Regular fire hydrant testing ensures urban readiness for emergencies. Fire Department successfully tested hydrant lines in Downtown Sector 5 this week.

DETAILS OF ACTIONS TAKEN  
1. PRESSURE AND FLOW MONITORING  
   - Hydrant valves greased and re-tested.  
   - Optimal flow rates achieved in all hydrants.  

2. HYDRANT REFURBISHMENT  
   - Rusty fixtures painted; replaced three faulty caps.  
   - Numbering system applied for identification.  

3. COMMUNITY SAFETY DRILLS  
   - Emergency mock drills prepared with schools and local businesses.  

OBJECTIVE AND IMPACT  
Hydrant system now reinforced, ensuring rapid fire response potential with community awareness integrated.
`,
  },
  // Continue this pattern up to ID 30...
];


/* -----------------------------
   Helper Functions
--------------------------------*/
function statusColor(status: NotificationStatus) {
  switch (status) {
    case "solved": return "bg-green-100 text-green-700";
    case "pending": return "bg-yellow-100 text-yellow-700";
    case "in-progress": return "bg-blue-100 text-blue-700";
  }
}

function severityIcon(severity: NotificationSeverity) {
  switch (severity) {
    case "low": return <FontAwesomeIcon icon={faClock} className="text-gray-500" />;
    case "medium": return <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />;
    case "high": return <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600" />;
  }
}

function departmentIcon(dept: string) {
  if (dept.includes("Water")) return <FontAwesomeIcon icon={faWater} className="text-blue-500" />;
  if (dept.includes("Public Works")) return <FontAwesomeIcon icon={faRoad} className="text-gray-700" />;
  if (dept.includes("Sanitation")) return <FontAwesomeIcon icon={faUsers} className="text-green-700" />;
  if (dept.includes("Electricity")) return <FontAwesomeIcon icon={faBuilding} className="text-yellow-500" />;
  if (dept.includes("Environmental")) return <FontAwesomeIcon icon={faTree} className="text-green-600" />;
  if (dept.includes("Disaster")) return <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-700" />;
  if (dept.includes("Engineering")) return <FontAwesomeIcon icon={faBuilding} className="text-purple-600" />;
  if (dept.includes("Fire")) return <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-600" />;
  return <FontAwesomeIcon icon={faCity} className="text-gray-500" />;
}

/* -----------------------------
   Notification Card (Mobile)
--------------------------------*/
function NotificationCard({ notification }: { notification: Notification }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`border-l-4 ${departmentColor(notification.department)} bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition transform hover:scale-[1.02]`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex gap-3 items-start">
          {departmentIcon(notification.department)}
          <div>
            <h2 className="font-semibold text-gray-800">{notification.title}</h2>
            <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} />
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-[1000px] mt-3" : "max-h-0 mt-0"}`}>
        <p className="text-sm text-gray-700 mb-3">{notification.description}</p>
        <div className="flex flex-wrap gap-2 items-center text-xs mb-2">
          <span className={`px-2 py-1 rounded-full ${statusColor(notification.status)}`}>{notification.status.toUpperCase()}</span>
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">{severityIcon(notification.severity)} {notification.severity.toUpperCase()}</span>
          <span className={`px-2 py-1 rounded-full flex items-center gap-1 ${departmentColor(notification.department)}`}>{departmentIcon(notification.department)} {notification.department}</span>
        </div>
        {notification.solvedBy && <p className="text-xs text-green-700 mt-1">✅ Solved by <span className="font-semibold">{notification.solvedBy}</span></p>}
        {notification.assignedTo && <p className="text-xs text-blue-700 mt-1">🔄 Assigned to <span className="font-semibold">{notification.assignedTo}</span></p>}
      </div>
    </div>
  );
}

/* -----------------------------
   Notification Row (Desktop)
--------------------------------*/
function NotificationRow({ notification, onHover, onClick }: { notification: Notification; onHover: () => void; onClick: () => void }) {
  return (
    <div
      onMouseEnter={onHover}
      onClick={onClick}
      className={`flex justify-between items-center p-4 cursor-pointer border-l-4 ${departmentColor(notification.department)} hover:bg-gray-50 transition`}
    >
      <div className="flex items-center gap-3">
        {departmentIcon(notification.department)}
        <div>
          <h3 className="font-medium text-gray-800">{notification.title}</h3>
          <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
        </div>
      </div>
      <div>{severityIcon(notification.severity)}</div>
    </div>
  );
}

/* -----------------------------
   Notification Details (Desktop)
--------------------------------*/
function NotificationDetails({ notification }: { notification: Notification | null }) {
  if (!notification) return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <FontAwesomeIcon icon={faBell} className="text-4xl mb-3" />
      <p>Select a notification to view details</p>
    </div>
  );

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        {departmentIcon(notification.department)}
        <h2 className="text-lg font-semibold text-gray-800">{notification.title}</h2>
      </div>
      <p className="text-sm text-gray-700 mb-4">{notification.description}</p>
      <div className="flex flex-wrap gap-2 text-xs mb-3">
        <span className={`px-2 py-1 rounded-full ${statusColor(notification.status)}`}>{notification.status.toUpperCase()}</span>
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">{severityIcon(notification.severity)} {notification.severity.toUpperCase()}</span>
        <span className={`px-2 py-1 rounded-full flex items-center gap-1 ${departmentColor(notification.department)}`}>{departmentIcon(notification.department)} {notification.department}</span>
      </div>
      {notification.solvedBy && <p className="text-xs text-green-700">✅ Solved by <span className="font-semibold">{notification.solvedBy}</span></p>}
      {notification.assignedTo && <p className="text-xs text-blue-700">🔄 Assigned to <span className="font-semibold">{notification.assignedTo}</span></p>}
    </div>
  );
}

/* -----------------------------
   Global Animations
--------------------------------*/
function NotificationsGlobalStyles() {
  return (
    <style jsx global>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn { animation: fadeIn 0.4s ease-in-out; }
    `}</style>
  );
}

/* -----------------------------
   Mobile & Desktop Views
--------------------------------*/
function MobileView({ filtered }: { filtered: Notification[] }) {
  return <div className="space-y-4">{filtered.map(n => <NotificationCard key={n.id} notification={n} />)}</div>;
}

function DesktopView({ filtered, hovered, setHovered }: { filtered: Notification[]; hovered: Notification | null; setHovered: (n: Notification | null) => void }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
        {filtered.map(n => <NotificationRow key={n.id} notification={n} onHover={() => setHovered(n)} onClick={() => setHovered(n)} />)}
      </div>
      <div className="bg-white rounded-xl shadow-sm min-h-[400px]">
        <NotificationDetails notification={hovered} />
      </div>
    </div>
  );
}

/* -----------------------------
   Main Notifications Page
--------------------------------*/
export default function NotificationsPage() {
  const [filter, setFilter] = useState<NotificationStatus | "all">("all");
  const [sortKey, setSortKey] = useState<"newest" | "oldest" | "severity">("newest");
  const [hovered, setHovered] = useState<Notification | null>(null);

  const filtered = useMemo(() => {
    let list = [...notifications];
    if (filter !== "all") list = list.filter(n => n.status === filter);

    if (sortKey === "newest") return list.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    if (sortKey === "oldest") return list.sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    if (sortKey === "severity") { const order: Record<NotificationSeverity,number> = {high:3, medium:2, low:1}; return list.sort((a,b) => order[b.severity] - order[a.severity]); }
    return list;
  }, [filter, sortKey]);

  return (
    <section className="container mx-auto p-6">
      <NotificationsGlobalStyles />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white shadow"><FontAwesomeIcon icon={faBell} /></div>
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>

      <p className="text-gray-600 mb-6">Important civic alerts — track which department received, assigned, or solved an issue. Tap a card on mobile or hover/select on desktop for full details.</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {["all","solved","in-progress","pending"].map(s => (
            <button key={s} onClick={() => {setFilter(s as any); setHovered(null);}} className={`px-4 py-2 rounded-full border text-sm font-medium transition ${filter===s?"bg-green-600 text-white border-green-600 shadow":"bg-white text-gray-600 hover:bg-gray-100"}`}>{s.toUpperCase()}</button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-500">Sort:</label>
          <select id="sort" value={sortKey} onChange={e=>setSortKey(e.target.value as any)} className="px-3 py-2 border rounded-lg text-sm">{["newest","oldest","severity"].map(s=><option key={s} value={s}>{s[0].toUpperCase()+s.slice(1)}</option>)}</select>
        </div>
      </div>

      <div className="block sm:hidden"><MobileView filtered={filtered} /></div>
      <div className="hidden sm:block"><DesktopView filtered={filtered} hovered={hovered} setHovered={setHovered} /></div>
    </section>
  );
}
