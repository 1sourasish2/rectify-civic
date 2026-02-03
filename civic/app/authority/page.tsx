"use client";

import React, { useState, useMemo } from "react";

type Department = {
  id: number;
  name: string;
  description: string;
  photo: string;
  details: string;
  location: string;
  contact: string;
  website: string;
  color: string;
  icon: string;
};

const departmentsData: Department[] = [
  {
    id: 1,
    name: "Water Resources Department",
    description:
      "Manages municipal water supply, drinking water safety, and water conservation projects.",
    photo:
      "https://images.unsplash.com/photo-1581091012183-6c7e9b7b2e8b?auto=format&fit=crop&w=400&q=80",
    details:
      "The Water Resources Department ensures clean drinking water, manages water distribution, oversees dam safety, and promotes water conservation campaigns across the city.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2301 4567",
    website: "https://indiawater.gov.in/",
    color: "#2196F3",
    icon: "💧",
  },
  {
    id: 2,
    name: "Sanitation & Waste Management",
    description:
      "Responsible for garbage collection, street cleaning, and proper disposal of waste.",
    photo:
      "https://images.unsplash.com/photo-1588776814546-b6b432d6c0d3?auto=format&fit=crop&w=400&q=80",
    details:
      "The Sanitation Department runs city cleaning programs, manages waste segregation, recycling, and disposal systems, and conducts awareness campaigns on hygiene and cleanliness.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 6789",
    website: "https://swachhbharatmission.gov.in/",
    color: "#4CAF50",
    icon: "🗑️",
  },
  {
    id: 3,
    name: "Public Works Department",
    description:
      "Maintains city roads, bridges, and government buildings to ensure smooth infrastructure operations.",
    photo:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
    details:
      "The PWD handles construction and maintenance of public infrastructure including roads, flyovers, bridges, public buildings, street lighting, and beautification projects.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2331 2345",
    website: "https://pwd.gov.in/",
    color: "#FF9800",
    icon: "🛠️",
  },
  {
    id: 4,
    name: "Traffic & Transport Department",
    description:
      "Oversees traffic management, public transport, and road safety measures.",
    photo:
      "https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?auto=format&fit=crop&w=400&q=80",
    details:
      "Responsible for ensuring smooth traffic flow, implementing traffic regulations, managing public transportation, and deploying safety measures including traffic signals, signage, and road audits.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 5678",
    website: "https://morth.nic.in/",
    color: "#3F51B5",
    icon: "🚦",
  },
  {
    id: 5,
    name: "Disaster Management Department",
    description:
      "Coordinates emergency response, disaster preparedness, and citizen safety during calamities.",
    photo:
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=400&q=80",
    details:
      "The Disaster Management Department prepares city-wide emergency plans, coordinates rescue operations, organizes drills, and raises awareness about disaster risk reduction and climate resilience.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2306 7890",
    website: "https://ndma.gov.in/",
    color: "#F44336",
    icon: "🚨",
  },
  {
    id: 6,
    name: "Electricity & Power Department",
    description:
      "Ensures reliable power supply, manages outages, and implements energy conservation initiatives.",
    photo:
      "https://images.unsplash.com/photo-1581091215363-9ff4c47ff234?auto=format&fit=crop&w=400&q=80",
    details:
      "This department manages electricity distribution, maintenance of transformers, electricity billing systems, and implements sustainable energy programs to reduce city-wide power consumption.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 1234",
    website: "https://powermin.nic.in/",
    color: "#FFEB3B",
    icon: "⚡",
  },
  {
    id: 7,
    name: "Health & Family Welfare",
    description:
      "Monitors public health, vaccination drives, and health awareness programs.",
    photo:
      "https://images.unsplash.com/photo-1576765607922-159590d5b8cb?auto=format&fit=crop&w=400&q=80",
    details:
      "The Health Department manages hospitals, vaccination programs, health awareness campaigns, epidemic control, and sanitation initiatives to maintain public health standards.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2306 2465",
    website: "https://main.mohfw.gov.in/",
    color: "#E91E63",
    icon: "🩺",
  },
  {
    id: 8,
    name: "Environment & Sustainability Department",
    description:
      "Protects environment, promotes recycling, and manages city parks and green spaces.",
    photo:
      "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=80",
    details:
      "Manages environmental regulations, pollution control, recycling campaigns, city forestry programs, and sustainability initiatives to make the city greener and cleaner.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 6781",
    website: "https://moef.gov.in/",
    color: "#4CAF50",
    icon: "🌳",
  },
  {
    id: 9,
    name: "Fire & Emergency Services",
    description:
      "Handles fire emergencies, fire safety inspections, and volunteer programs.",
    photo:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    details:
      "The Fire Department responds to fire emergencies, conducts safety audits, promotes fire awareness campaigns, and provides training to volunteers and city staff on emergency response.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2336 7890",
    website: "https://ndrf.gov.in/",
    color: "#FF5722",
    icon: "🔥",
  },
  {
    id: 10,
    name: "Police Department",
    description:
      "Maintains law and order, crime prevention, and community policing initiatives.",
    photo:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=400&q=80",
    details:
      "The Police Department works on crime prevention, traffic enforcement, community engagement programs, cybercrime awareness, and ensuring the safety of citizens in urban areas.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 9876",
    website: "https://mha.gov.in/",
    color: "#3F51B5",
    icon: "👮‍♂️",
  },
  {
    id: 11,
    name: "Housing & Urban Development",
    description:
      "Manages affordable housing projects, urban planning, and citizen welfare schemes.",
    photo:
      "https://images.unsplash.com/photo-1560448071-6e5c87b92d70?auto=format&fit=crop&w=400&q=80",
    details:
      "Responsible for affordable housing, inspection of residential areas, urban planning projects, slum redevelopment schemes, and welfare programs for citizens.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 6782",
    website: "https://mohua.gov.in/",
    color: "#795548",
    icon: "🏠",
  },
  {
    id: 12,
    name: "Finance Department",
    description:
      "Oversees municipal budgets, tax collection, and economic planning.",
    photo:
      "https://images.unsplash.com/photo-1542223616-433fa2276dfc?auto=format&fit=crop&w=400&q=80",
    details:
      "The Finance Department manages city budgets, monitors revenue generation, implements fiscal policies, audits government accounts, and ensures transparent financial governance.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 4321",
    website: "https://financialservices.gov.in/",
    color: "#009688",
    icon: "💰",
  },
  {
    id: 13,
    name: "Technology & Digital Services",
    description:
      "Implements smart city initiatives, digital governance, and cyber-security measures.",
    photo:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    details:
      "Responsible for implementing digital solutions for citizens, improving service portals, cybersecurity management, and deploying smart city projects to enhance urban governance.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 8765",
    website: "https://meity.gov.in/",
    color: "#3F51B5",
    icon: "💻",
  },
  {
    id: 14,
    name: "Tourism & Culture Department",
    description:
      "Promotes tourism, organizes cultural events, and preserves heritage sites.",
    photo:
      "https://images.unsplash.com/photo-1486308510493-c5c0b2c56481?auto=format&fit=crop&w=400&q=80",
    details:
      "Handles promotion of local tourism, cultural festivals, preservation of heritage sites, and engagement of international tourists with city attractions.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 9870",
    website: "https://tourism.gov.in/",
    color: "#FF9800",
    icon: "✈️",
  },
  {
    id: 15,
    name: "Parks & Recreation",
    description:
      "Maintains city parks, recreational facilities, and outdoor community programs.",
    photo:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    details:
      "The Parks & Recreation Department manages public parks, gardens, and recreational facilities, organizes community events, and promotes outdoor fitness and wellness programs for citizens.",
    location: "New Delhi, India",
    contact: "Phone: +91-11-2345 3456",
    website: "https://moef.gov.in/parks",
    color: "#4CAF50",
    icon: "🏞️",
  },
];


export default function AuthorityUpdates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const filteredDepartments = useMemo(() => {
    if (!searchTerm.trim()) return departmentsData;
    return departmentsData.filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <>
      <main className="bg-white min-h-screen p-6 max-w-7xl mx-auto font-sans text-gray-900">
        <h1 className="text-center text-4xl font-extrabold mb-10 select-none">
          Civic Departments Dashboard
        </h1>

        <div className="max-w-md mx-auto mb-12">
          <input
            type="search"
            aria-label="Search departments"
            placeholder="Search departments or updates..."
            className="w-full px-5 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 placeholder-gray-500 text-gray-900 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <section
          aria-label="Department updates list"
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredDepartments.length === 0 && (
            <p className="text-center text-gray-400 col-span-full">
              No departments found.
            </p>
          )}

          {filteredDepartments.map((dept) => (
            <article
              key={dept.id}
              tabIndex={0}
              aria-describedby={`desc-${dept.id}`}
              className="rounded-xl shadow-lg overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:-translate-y-1 hover:shadow-xl"
              onClick={() => setSelectedDept(dept)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedDept(dept);
                }
              }}
            >
              <img
                src={dept.photo}
                alt={`${dept.name} photo`}
                loading="lazy"
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-6 flex flex-col justify-between h-56 bg-white">
                <div>
                  <h2
                    className="text-xl font-extrabold flex items-center gap-2 mb-2 select-none"
                    aria-label={`${dept.name} department`}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {dept.icon}
                    </span>{" "}
                    {dept.name}
                  </h2>
                  <p
                    id={`desc-${dept.id}`}
                    className="text-gray-600 truncate"
                    title={dept.description}
                  >
                    {dept.description}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDept(dept);
                  }}
                  style={{ backgroundColor: dept.color }}
                  className="mt-4 px-6 py-2 rounded-full text-white font-semibold focus:outline-none focus:ring-4 focus:ring-offset-1 focus:ring-opacity-70 shadow-lg transition duration-300 hover:brightness-110 active:brightness-90"
                  aria-label={`View details of ${dept.name}`}
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {selectedDept && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDept(null);
          }}
        >
          <article className="relative bg-white rounded-3xl max-w-lg w-full max-h-full overflow-auto shadow-2xl animate-slideIn p-8">
            <button
              aria-label="Close details window"
              onClick={() => setSelectedDept(null)}
              className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 text-4xl font-bold focus:outline-none"
            >
              &times;
            </button>

            <img
              src={selectedDept.photo}
              alt={`${selectedDept.name} department photo`}
              className="rounded-xl w-full max-h-56 object-cover mb-6 select-none"
              draggable={false}
            />

            <h3
              id="modal-title"
              className="text-3xl font-extrabold mb-3 flex items-center gap-3 select-none"
            >
              <span aria-hidden="true" className="text-4xl">
                {selectedDept.icon}
              </span>
              {selectedDept.name}
            </h3>

            <p className="text-gray-700 whitespace-pre-wrap">{selectedDept.details}</p>
            <p className="text-gray-700 mt-3">
              <strong>Location:</strong> {selectedDept.location}
            </p>
            <p className="text-gray-700">
              <strong>Contact:</strong> {selectedDept.contact}
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong>{" "}
              <a
                href={selectedDept.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                {selectedDept.website}
              </a>
            </p>
          </article>
        </section>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
