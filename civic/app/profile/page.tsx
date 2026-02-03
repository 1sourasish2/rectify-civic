'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

interface Badge {
  id: number;
  name: string;
  description: string;
  earned: boolean;
}

interface Report {
  id: number;
  title: string;
  status: 'open' | 'solved';
  createdAt: string;
}

interface UserProfile {
  name: string;
  email: string;
  location: string;
  pincode: string;
  address: string;
  badges: Badge[];
  photoURL: string | null;
}

interface IdentityDetails {
  idType: 'aadhaar' | 'pan' | 'voter';
  idNumber: string;
  fullName: string;
  address: string;
  verified: boolean;
}

function fetchReports(): Promise<Report[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Pothole on 5th Avenue', status: 'solved', createdAt: '2025-09-01' },
        { id: 2, title: 'Broken Streetlight', status: 'open', createdAt: '2025-09-10' },
        { id: 3, title: 'Graffiti Removal', status: 'solved', createdAt: '2025-09-12' },
        { id: 4, title: 'Overflowing Trash Bin', status: 'open', createdAt: '2025-09-15' },
      ]);
    }, 700)
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [uploading, setUploading] = useState(false);
  const [identity, setIdentity] = useState<IdentityDetails>({
    idType: 'aadhaar',
    idNumber: '',
    fullName: '',
    address: '',
    verified: false,
  });
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('civicflowUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const badges: Badge[] = parsedUser.badges || [
          { id: 1, name: 'First Report', description: 'Reported your first issue!', earned: true },
          { id: 2, name: 'Contributor', description: 'Reported 5 issues', earned: true },
          { id: 3, name: 'Problem Solver', description: 'Solved 3 reports', earned: false },
        ];
        setUser({ ...parsedUser, badges, photoURL: parsedUser.photoURL || null });
      }
    }
    fetchReports().then(setReports);
  }, []);

  if (!user) return <p className="text-center mt-20 text-gray-600">Loading profile...</p>;

  const solvedCount = reports.filter((r) => r.status === 'solved').length;
  const openCount = reports.filter((r) => r.status === 'open').length;
  const earnedBadges = user.badges.filter((b) => b.earned).length;
  const totalBadges = user.badges.length;

  const reportsBarData = {
    labels: ['Open Reports', 'Solved Reports'],
    datasets: [
      {
        label: 'Number of Reports',
        data: [openCount, solvedCount],
        backgroundColor: ['#34d399', '#3b82f6'],
        borderRadius: 12,
      },
    ],
  };

  const badgesPieData = {
    labels: ['Earned', 'Remaining'],
    datasets: [
      {
        label: 'Badges',
        data: [earnedBadges, totalBadges - earnedBadges],
        backgroundColor: ['#10b981', '#a78bfa'],
        hoverOffset: 20,
        borderRadius: 8,
      },
    ],
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const updatedUser = { ...user, photoURL: reader.result as string };
      setUser(updatedUser);
      localStorage.setItem('civicflowUser', JSON.stringify(updatedUser));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleIdentityChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIdentity((prev) => ({
      ...prev,
      [name]: value,
      verified: false,
    }));
    setVerifyMessage(null);
  };

  const verifyIdentity = (e: FormEvent) => {
    e.preventDefault();
    const { idType, idNumber, fullName, address } = identity;

    if (!idNumber.trim() || !fullName.trim() || !address.trim()) {
      setVerifyMessage('Please fill all identity fields correctly.');
      setIdentity((prev) => ({ ...prev, verified: false }));
      return;
    }

    let valid = false;
    if (idType === 'aadhaar' && /^\d{12}$/.test(idNumber)) valid = true;
    else if (idType === 'pan' && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(idNumber)) valid = true;
    else if (idType === 'voter' && /^[A-Z0-9]{6,16}$/i.test(idNumber)) valid = true;

    if (valid) {
      setIdentity((prev) => ({ ...prev, verified: true }));
      setVerifyMessage('Identity Verified Successfully ✅');
    } else {
      setIdentity((prev) => ({ ...prev, verified: false }));
      setVerifyMessage('Verification Failed: Invalid ID number format.');
    }
  };

  return (
    <section className="min-h-screen bg-white p-6 md:max-w-5xl md:mx-auto select-none">
      <h1 className="text-4xl font-extrabold mb-10 text-green-700 transition-transform duration-700 hover:scale-105">
        Welcome, {user.name}!
      </h1>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
        <div className="relative w-40 h-40 rounded-full border-4 border-green-400 overflow-hidden shadow-lg transition-transform duration-700 hover:scale-110">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={`${user.name} profile`}
              className="object-cover w-full h-full transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-green-100 text-green-700 text-lg font-semibold">
              No Photo
            </div>
          )}

          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-500 to-teal-600 text-white text-center cursor-pointer py-2 hover:opacity-90 transition-all duration-500"
          >
            {uploading ? 'Uploading...' : 'Change Photo'}
          </label>
          <input
            type="file"
            accept="image/*"
            id="photo-upload"
            className="hidden"
            onChange={handlePhotoUpload}
            disabled={uploading}
          />
        </div>

        <div className="space-y-3 flex-1 animate-fade-in">
          <p className="text-2xl font-bold text-green-800">{user.name}</p>
          <p className="text-md text-teal-600">{user.location}</p>
          <p className="text-green-500 font-medium">
            Pincode: <span className="font-normal">{user.pincode}</span>
          </p>
          <p className="text-green-500 font-medium">
            Address: <span className="font-normal">{user.address}</span>
          </p>
        </div>
      </div>

      {/* Identity Verification */}
      <div className="mb-14 border border-green-300 rounded-2xl p-6 bg-gradient-to-br from-green-50 to-white shadow-xl max-w-3xl mx-auto transition-transform duration-500 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold mb-5 text-green-700 flex items-center gap-3">
          Identity Verification
          {identity.verified && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-label="Verified"
              role="img"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </h2>
        <form onSubmit={verifyIdentity} className="flex flex-col gap-6">
          <div>
            <label htmlFor="idType" className="block font-medium text-green-800 mb-1">
              Select ID Type:
            </label>
            <select
              name="idType"
              id="idType"
              value={identity.idType}
              onChange={handleIdentityChange}
              className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
              <option value="aadhaar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
              <option value="voter">Voter ID</option>
            </select>
          </div>

          <div>
            <label htmlFor="idNumber" className="block font-medium text-green-800 mb-1">
              ID Number:
            </label>
            <input
              type="text"
              name="idNumber"
              id="idNumber"
              value={identity.idNumber}
              onChange={handleIdentityChange}
              className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block font-medium text-green-800 mb-1">
              Full Name (as per ID):
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={identity.fullName}
              onChange={handleIdentityChange}
              className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="address" className="block font-medium text-green-800 mb-1">
              Address (as per ID):
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={identity.address}
              onChange={handleIdentityChange}
              className="w-full p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold hover:scale-105 transition-transform duration-300"
          >
            Verify Identity
          </button>
        </form>

        {verifyMessage && (
          <p
            className={`mt-4 font-medium ${
              identity.verified ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {verifyMessage}
          </p>
        )}
      </div>

      {/* Badges Section */}
      <div className="mb-14">
        <h2 className="text-3xl font-bold mb-5 text-green-700">Your Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 border rounded-2xl shadow-md transition-transform duration-300 hover:scale-105 ${
                badge.earned
                  ? 'bg-gradient-to-br from-green-100 to-green-50 border-green-400'
                  : 'bg-gray-100 border-gray-300 opacity-70'
              }`}
            >
              <h3 className="font-semibold text-green-700">{badge.name}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
              <p
                className={`text-sm mt-2 font-medium ${
                  badge.earned ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {badge.earned ? 'Earned ✅' : 'Locked 🔒'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reports Section */}
      <div className="mb-14">
        <h2 className="text-3xl font-bold mb-5 text-green-700">Your Reports</h2>
        <div className="overflow-y-auto max-h-72 pr-2 space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`p-4 rounded-2xl shadow-sm transition-all hover:shadow-lg ${
                report.status === 'solved'
                  ? 'bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-500'
                  : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500'
              }`}
            >
              <h3 className="font-semibold text-green-700">{report.title}</h3>
              <p className="text-sm text-gray-600">Created: {report.createdAt}</p>
              <p
                className={`text-sm font-medium ${
                  report.status === 'solved' ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                Status: {report.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
        <div className="p-6 border rounded-2xl shadow-lg bg-white hover:scale-[1.01] transition-transform">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Reports Overview</h2>
          <Bar data={reportsBarData} />
        </div>
        <div className="p-6 border rounded-2xl shadow-lg bg-white hover:scale-[1.01] transition-transform">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Badges Progress</h2>
          <Pie data={badgesPieData} />
        </div>
      </div>
    </section>
  );
}
