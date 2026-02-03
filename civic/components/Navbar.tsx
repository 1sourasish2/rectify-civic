"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  Map,
  Users,
  FileText,
  PlusCircle,
  Trophy,
  Bell,
  Building2,
  Settings,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Map", href: "/map", icon: Map },
  { name: "Community", href: "/community", icon: Users },
  { name: "Issue", href: "/issue", icon: FileText },
  { name: "Report", href: "/report", icon: PlusCircle },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Authority", href: "/authority", icon: Building2 },
  { name: "Emergency", href: "/emergency", icon: FaExclamationTriangle },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout and go to signup page
  const handleLogout = () => {
    setProfileOpen(false);
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("civicflowUser");
    }
    router.push("/signup");
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 mr-6">
            <Link href="/feed">
              <Image
                src="Rectify SVG.svg"
                alt="Rectify Home"
                width={120}
                height={100}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 justify-end space-x-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 text-lg font-medium transition ${
                    isActive
                      ? "text-green-600 border-b-2 border-green-600 pb-1"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4 relative" ref={profileRef}>
            {/* Profile dropdown */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`p-3 rounded-full transition ${
                pathname === "/profile"
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <User size={24} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-14 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                >
                  <User size={18} />
                  <span>View Profile</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md text-md font-medium transition ${
                    isActive
                      ? "bg-green-100 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Mobile profile options */}
            <div className="border-t border-gray-200 mt-3 pt-3">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
              >
                <User size={20} />
                <span>View Profile</span>
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
              >
                <Settings size={20} />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center space-x-3 px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
