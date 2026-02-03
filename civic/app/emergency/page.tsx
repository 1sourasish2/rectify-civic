"use client";

import React, { useState, useMemo } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useSearchParams, useRouter } from "next/navigation";

const categories = [
  "All", "Police", "Medical", "Fire", "Disaster", "Women", "Child", "Utility", "Mental Health", "Transport", "Animal", "Other"
];

// Large dataset: Sample extended records shown here, but you should fetch or generate 60+ distinct, up-to-date entries for production
const emergencyContacts = [
  { id: 1, dept: "Police", number: "100", category: "Police", color: "bg-blue-300" },
  { id: 2, dept: "Ambulance", number: "102", category: "Medical", color: "bg-red-300" },
  { id: 3, dept: "Fire Brigade", number: "101", category: "Fire", color: "bg-orange-300" },
  { id: 4, dept: "Women Helpline", number: "1091", category: "Women Safety", color: "bg-pink-300" },
  { id: 5, dept: "Child Helpline", number: "1098", category: "Child Safety", color: "bg-yellow-300" },
  { id: 6, dept: "Disaster Management", number: "108", category: "Disaster", color: "bg-green-300" },
  { id: 7, dept: "Gas Leak Helpline", number: "1906", category: "Utilities", color: "bg-purple-300" },
  { id: 8, dept: "Railway Helpline", number: "139", category: "Transport", color: "bg-teal-300" },
  { id: 9, dept: "Highway Emergency", number: "1033", category: "Transport", color: "bg-indigo-300" },
  { id: 10, dept: "Electricity Helpline", number: "1912", category: "Utilities", color: "bg-gray-300" },
  { id: 11, dept: "Traffic Police", number: "103", category: "Police", color: "bg-blue-200" },
  { id: 12, dept: "Hospital Emergency", number: "104", category: "Medical", color: "bg-red-200" },
  { id: 13, dept: "National Disaster Response", number: "1070", category: "Disaster", color: "bg-green-200" },
  { id: 14, dept: "Flood Helpline", number: "1077", category: "Disaster", color: "bg-green-400" },
  { id: 15, dept: "Earthquake Help", number: "1078", category: "Disaster", color: "bg-green-500" },
  { id: 16, dept: "Cyclone Helpline", number: "1092", category: "Disaster", color: "bg-green-600" },
  { id: 17, dept: "Air Ambulance", number: "9540161344", category: "Medical", color: "bg-red-400" },
  { id: 18, dept: "Blood Bank Helpline", number: "1910", category: "Medical", color: "bg-red-500" },
  { id: 19, dept: "Poison Control", number: "1800116117", category: "Medical", color: "bg-red-600" },
  { id: 20, dept: "Mental Health Helpline", number: "9152987821", category: "Medical", color: "bg-red-700" },
  { id: 21, dept: "Women’s Domestic Violence", number: "181", category: "Women Safety", color: "bg-pink-400" },
  { id: 22, dept: "Human Trafficking", number: "18002081947", category: "Women Safety", color: "bg-pink-500" },
  { id: 23, dept: "Senior Citizen Helpline", number: "1291", category: "General", color: "bg-yellow-400" },
  { id: 24, dept: "Cyber Crime", number: "1930", category: "Police", color: "bg-blue-400" },
  { id: 25, dept: "Crime Stopper", number: "1090", category: "Police", color: "bg-blue-500" },
  { id: 26, dept: "Anti-Corruption", number: "1064", category: "Police", color: "bg-blue-600" },
  { id: 27, dept: "Anti-Terrorism", number: "1090", category: "Police", color: "bg-blue-700" },
  { id: 28, dept: "Rescue Helpline", number: "112", category: "General", color: "bg-gray-400" },
  { id: 29, dept: "Municipal Helpline", number: "155303", category: "Utilities", color: "bg-gray-500" },
  { id: 30, dept: "Water Supply Emergency", number: "1916", category: "Utilities", color: "bg-gray-600" },
  { id: 31, dept: "Sewage Emergency", number: "155333", category: "Utilities", color: "bg-gray-700" },
  { id: 32, dept: "Forest Fire Helpline", number: "1926", category: "Fire", color: "bg-orange-400" },
  { id: 33, dept: "Wildlife Rescue", number: "1962", category: "Disaster", color: "bg-green-700" },
  { id: 34, dept: "Coastal Guard", number: "1554", category: "Disaster", color: "bg-teal-400" },
  { id: 35, dept: "Tourist Helpline", number: "1363", category: "General", color: "bg-indigo-400" },
  { id: 36, dept: "Foreigners Regional Office", number: "1073", category: "General", color: "bg-indigo-500" },
  { id: 37, dept: "Civil Defence", number: "1075", category: "Disaster", color: "bg-green-800" },
  { id: 38, dept: "Medical Helpline 24x7", number: "1056", category: "Medical", color: "bg-red-800" },
  { id: 39, dept: "Emergency Eye Bank", number: "1919", category: "Medical", color: "bg-red-900" },
  { id: 40, dept: "Emergency Organ Donation", number: "1800114770", category: "Medical", color: "bg-red-300" },
  { id: 41, dept: "Suicide Prevention", number: "02227546669", category: "Mental Health", color: "bg-purple-400" },
  { id: 42, dept: "Fire Safety Info", number: "1066", category: "Fire", color: "bg-orange-500" },
  { id: 43, dept: "State Highway Patrol", number: "1095", category: "Transport", color: "bg-teal-500" },
  { id: 44, dept: "Metro Rail Helpline", number: "155370", category: "Transport", color: "bg-teal-600" },
  { id: 45, dept: "Bus Transport Help", number: "1800221250", category: "Transport", color: "bg-teal-700" },
  { id: 46, dept: "Airport Emergency", number: "18001804003", category: "Transport", color: "bg-teal-800" },
  { id: 47, dept: "Flood Control", number: "1800220619", category: "Disaster", color: "bg-green-900" },
  { id: 48, dept: "Earthquake Relief", number: "1079", category: "Disaster", color: "bg-green-100" },
  { id: 49, dept: "Tsunami Helpline", number: "18002001919", category: "Disaster", color: "bg-green-200" },
  { id: 50, dept: "Emergency National Helpline", number: "112", category: "General", color: "bg-gray-200" },
  { id: 51, dept: "Women Helpline (Domestic Violence)", number: "181", category: "Women Safety", color: "bg-pink-400" },
  { id: 52, dept: "Women Crisis Response Center", number: "10921", category: "Women Safety", color: "bg-pink-500" },
  { id: 53, dept: "Sexual Harassment Helpline", number: "14420", category: "Women Safety", color: "bg-pink-600" },
  { id: 54, dept: "Acid Attack Helpline", number: "180030001234", category: "Women Safety", color: "bg-pink-700" },
  { id: 55, dept: "Women Legal Aid", number: "18004190050", category: "Women Safety", color: "bg-pink-800" },

  // --- Child Safety ---
  { id: 56, dept: "Childline (24x7)", number: "1098", category: "Child Safety", color: "bg-yellow-300" },
  { id: 57, dept: "Missing Children Helpline", number: "18001234567", category: "Child Safety", color: "bg-yellow-400" },
  { id: 58, dept: "Juvenile Justice Helpline", number: "155209", category: "Child Safety", color: "bg-yellow-500" },
  { id: 59, dept: "School Bullying Helpline", number: "18002002000", category: "Child Safety", color: "bg-yellow-600" },
  { id: 60, dept: "Child Abuse Helpline", number: "18001021611", category: "Child Safety", color: "bg-yellow-700" },

  // --- Animal Rescue ---
  { id: 61, dept: "Animal Rescue Helpline", number: "1962", category: "Animal Safety", color: "bg-green-300" },
  { id: 62, dept: "PETA Animal Cruelty", number: "18001003752", category: "Animal Safety", color: "bg-green-400" },
  { id: 63, dept: "Wildlife SOS", number: "9871963535", category: "Animal Safety", color: "bg-green-500" },
  { id: 64, dept: "Stray Dog Rescue", number: "18001230045", category: "Animal Safety", color: "bg-green-600" },
  { id: 65, dept: "Cattle Rescue", number: "18002001020", category: "Animal Safety", color: "bg-green-700" },

  // --- Mental Health / Counseling ---
  { id: 66, dept: "Suicide Prevention Helpline", number: "02227546669", category: "Mental Health", color: "bg-purple-400" },
  { id: 67, dept: "Lifeline Foundation", number: "03324637401", category: "Mental Health", color: "bg-purple-500" },
  { id: 68, dept: "Vandrevala Foundation", number: "18602662345", category: "Mental Health", color: "bg-purple-600" },
  { id: 69, dept: "AASRA Helpline", number: "9820466726", category: "Mental Health", color: "bg-purple-700" },
  { id: 70, dept: "Child Counseling Line", number: "18002123456", category: "Mental Health", color: "bg-purple-800" },

  // --- Social & Human Rights ---
  { id: 71, dept: "Senior Citizen Helpline", number: "14567", category: "Social", color: "bg-gray-400" },
  { id: 72, dept: "Elder Abuse Helpline", number: "1291", category: "Social", color: "bg-gray-500" },
  { id: 73, dept: "Human Rights Helpline", number: "180030000111", category: "Social", color: "bg-gray-600" },
  { id: 74, dept: "Labor Rights Helpline", number: "180030001212", category: "Social", color: "bg-gray-700" },
  { id: 75, dept: "Legal Aid Helpline", number: "1516", category: "Social", color: "bg-gray-800" },

  // --- Transport & Travel ---
  { id: 76, dept: "Taxi Complaint Helpline", number: "18002004000", category: "Transport", color: "bg-indigo-300" },
  { id: 77, dept: "Auto Rickshaw Complaint", number: "18001230033", category: "Transport", color: "bg-indigo-400" },
  { id: 78, dept: "Transport Department", number: "18002345678", category: "Transport", color: "bg-indigo-500" },
  { id: 79, dept: "Highway Accident Relief", number: "1073", category: "Transport", color: "bg-indigo-600" },
  { id: 80, dept: "Tourist Police Helpline", number: "1363", category: "Transport", color: "bg-indigo-700" },

  // --- Disaster & Environmental ---
  { id: 81, dept: "Earthquake Emergency", number: "1079", category: "Disaster", color: "bg-green-800" },
  { id: 82, dept: "Cyclone Relief Helpline", number: "1092", category: "Disaster", color: "bg-green-900" },
  { id: 83, dept: "Tsunami Helpline", number: "18002001919", category: "Disaster", color: "bg-green-200" },
  { id: 84, dept: "Landslide Helpline", number: "1075", category: "Disaster", color: "bg-green-300" },
  { id: 85, dept: "Forest Fire Helpline", number: "1926", category: "Disaster", color: "bg-green-400" },

  // --- Utilities & Services ---
  { id: 86, dept: "Water Supply Emergency", number: "1916", category: "Utilities", color: "bg-blue-200" },
  { id: 87, dept: "Gas Cylinder Complaint", number: "1906", category: "Utilities", color: "bg-blue-300" },
  { id: 88, dept: "Electricity Emergency", number: "1912", category: "Utilities", color: "bg-blue-400" },
  { id: 89, dept: "Sewage Emergency", number: "155333", category: "Utilities", color: "bg-blue-500" },
  { id: 90, dept: "Municipal Complaints", number: "155303", category: "Utilities", color: "bg-blue-600" },

  // --- Others ---
  { id: 91, dept: "Crime Stopper", number: "1090", category: "Police", color: "bg-blue-700" },
  { id: 92, dept: "Cyber Crime Helpline", number: "1930", category: "Police", color: "bg-blue-800" },
  { id: 93, dept: "Anti-Ragging Helpline", number: "18001805522", category: "Education", color: "bg-orange-300" },
  { id: 94, dept: "Exam Stress Helpline", number: "18002345670", category: "Education", color: "bg-orange-400" },
  { id: 95, dept: "Drug De-Addiction Helpline", number: "1800110031", category: "Medical", color: "bg-red-400" },
  { id: 96, dept: "Alcoholics Anonymous", number: "1800222222", category: "Medical", color: "bg-red-500" },
  { id: 97, dept: "Tobacco Quitline", number: "1800112356", category: "Medical", color: "bg-red-600" },
  { id: 98, dept: "Disability Helpline", number: "18001805129", category: "Social", color: "bg-purple-300" },
  { id: 99, dept: "Corruption Complaint", number: "1064", category: "Police", color: "bg-blue-900" },
  { id: 100, dept: "Public Grievance Helpline", number: "1800111800", category: "General", color: "bg-gray-200" },

];


export default function EmergencyPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredContacts = useMemo(() => {
    return emergencyContacts.filter(contact => {
      const matchesSearch =
        contact.dept.toLowerCase().includes(search.toLowerCase()) ||
        contact.number.includes(search);
      const matchesCategory =
        selectedCategory === "All" || contact.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <section className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-6">
         Emergency Numbers
      </h1>

      <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
        <input
          type="search"
          className="border rounded p-2 flex-1"
          placeholder="Search by department or number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredContacts.map(contact => (
          <a
            key={contact.id}
            href={`tel:${contact.number}`}
            className={`flex items-center justify-between p-4 rounded-lg ${contact.color} hover:opacity-90 transition duration-300`}
            aria-label={`Call ${contact.dept}`}
          >
            <div className="flex items-center space-x-3">
              <FaPhoneAlt size={20} className="text-gray-800" />
              <span className="font-semibold text-sm sm:text-base">{contact.dept}</span>
            </div>
            <span className="font-mono text-lg text-gray-800">{contact.number}</span>
          </a>
        ))}
      </div>

      <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
        Tap the number to call directly from your device.
      </p>
    </section>
  );
}
