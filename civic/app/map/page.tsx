"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

// --- Data Type ---
interface Issue {
  id: number;
  title: string;
  status: "Pending" | "In Progress" | "Resolved";
  description: string;
  location: string;
  upvotes: number;
  image: string;
  position: [number, number];
}

// --- Sample Data (10 issues) ---
const issues: Issue[] = [
  {
    id: 1,
    title: "Broken Streetlight",
    status: "Pending",
    description: "Streetlight at the corner of Oak and Main has been out for a week.",
    location: "Oak St. & Main Ave.",
    upvotes: 25,
    image: "https://media.istockphoto.com/id/496026170/photo/broken-street-lamp.jpg?s=612x612&w=0&k=20&c=1bX4binyYkD8P_ZzHbfRTspKowTIGoTkSjxvbcjAkY4=",
    position: [40.7128, -74.006],
  },
  {
    id: 2,
    title: "Overflowing Trash",
    status: "In Progress",
    description: "Public waste bins near the market are overflowing.",
    location: "Central Plaza",
    upvotes: 42,
    image: "https://media.istockphoto.com/id/921257006/photo/full-trash-cans-with-rubbish-bags.jpg?s=612x612&w=0&k=20&c=WOjexfjb0pahqRuTg0PTWjMIVjU1vajuoD2jnNImtT4=",
    position: [40.7138, -74.003],
  },
  {
    id: 3,
    title: "Potholes on Main",
    status: "Pending",
    description: "Large potholes on Main Street pose a danger to vehicles.",
    location: "Main Street",
    upvotes: 61,
    image: "https://media.istockphoto.com/id/1222287770/photo/bad-asphalt-road-with-pit-and-puddle.jpg?s=612x612&w=0&k=20&c=riwsU0uUKahtC6kkejSVmGnUFMU20zWAWe5o_UyplcU=",
    position: [40.715, -74.01],
  },
  {
    id: 4,
    title: "Park Fountain Broken",
    status: "Pending",
    description: "The park fountain has been non-functional for two weeks.",
    location: "Riverside Park",
    upvotes: 18,
    image: "https://media.istockphoto.com/id/1310268801/photo/artificial-water-cascade-stone-profile-of-the-stream-as-a-summer-playground-in-the-park-dam.jpg?s=612x612&w=0&k=20&c=qhxsMTPZmZh1KBASczOtsaGRL_wW0hP377QtYvo8Eto=",
    position: [40.717, -74.008],
  },
  {
    id: 5,
    title: "Graffiti on Wall",
    status: "Resolved",
    description: "Graffiti reported on the city hall wall has been cleaned.",
    location: "City Hall",
    upvotes: 12,
    image: "https://media.istockphoto.com/id/1358632478/photo/people-in-reflective-vests-in-the-city-square.jpg?s=612x612&w=0&k=20&c=DpGxCZ9UBSv6IMLNfFTxmqF20p2BSEgw9h7amjrz5HE=",
    position: [40.716, -74.005],
  },
  {
    id: 6,
    title: "Damaged Playground Equipment",
    status: "In Progress",
    description: "Slides and swings need repair in community park.",
    location: "Community Park",
    upvotes: 30,
    image: "https://media.istockphoto.com/id/932522522/photo/destroyed-play-area-temporarily-closed.jpg?s=612x612&w=0&k=20&c=0Oq70qAbQKW5J1RX_iEaJZjZ-Z7k7NwygU8TIMIpW1I=",
    position: [40.711, -74.002],
  },
  
];

// --- Fly to Location ---
function FlyToLocation({ position }: { position: [number, number] }) {
  const map = useMap();
  map.flyTo(position, 16, { duration: 1.2 });
  return null;
}

export default function MapPage() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  return (
    <section className="container mx-auto p-6 max-w-6xl">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Civic Map</h1>
      <p className="mb-6">
        View reported issues on the interactive map and explore updates in your city.
      </p>

      {/* Status Legend */}
      <div className="flex space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-sm">Resolved</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="text-sm">In Progress</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-sm">Pending</span>
        </div>
      </div>

      {/* Map */}
      <div className="h-[400px] w-full rounded-lg overflow-hidden mb-8 border shadow transition hover:shadow-lg duration-300">
        <MapContainer
          center={[40.713, -74.006]}
          zoom={14}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {issues.map((issue) => (
            <Marker
              key={issue.id}
              position={issue.position}
              eventHandlers={{
                click: () => setSelectedIssue(issue),
              }}
            >
              <Popup>
                <p className="font-semibold">{issue.title}</p>
                <p className="text-xs text-gray-500">{issue.status}</p>
                <button
                  onClick={() => setSelectedIssue(issue)}
                  className="text-green-600 text-xs mt-2 hover:underline"
                >
                  View Details
                </button>
              </Popup>
            </Marker>
          ))}

          {selectedIssue && <FlyToLocation position={selectedIssue.position} />}
        </MapContainer>
      </div>

      {/* Issue Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white shadow rounded-xl p-4 border border-gray-200 transition transform hover:scale-[1.02] hover:shadow-lg duration-300"
          >
            <img
              src={issue.image}
              alt={issue.title}
              className="h-40 w-full object-cover rounded-lg mb-3 transition duration-300"
            />
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{issue.title}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  issue.status === "Pending"
                    ? "bg-red-100 text-red-600"
                    : issue.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {issue.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
            <p className="text-xs text-gray-500 mb-3">{issue.location}</p>
            <button
              onClick={() => setSelectedIssue(issue)}
              className="w-full bg-green-600 text-white rounded-lg py-2 text-sm hover:bg-green-700 transition duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative transform transition-all duration-300 scale-95 animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
              onClick={() => setSelectedIssue(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-3">{selectedIssue.title}</h2>
            <img
              src={selectedIssue.image}
              alt={selectedIssue.title}
              className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <p className="mb-2 text-gray-700">{selectedIssue.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              📍 {selectedIssue.location}
            </p>
            <p className="text-sm text-gray-500">
              👍 {selectedIssue.upvotes} upvotes
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
