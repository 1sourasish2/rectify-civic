"use client";

import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-12 pb-10 mt-16 text-gray-700 text-base">
      <div className="container mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-4">
        {/* Brand & Description */}
        <div className="space-y-4">
          <Image
            src="Rectify SVG.svg" // Place your logo in /public/images/
            alt="Rectify Logo"
            width={64}
            height={64}
            className="h-16 w-auto"
          />
          <p className="text-sm leading-relaxed">
            Rectify is your official platform for reporting, tracking, and
            engaging with local civic issues. Together, we build stronger,
            safer, and more transparent communities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-5 text-gray-900 text-lg">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              { href: "/map", label: "Map" },
              { href: "/community", label: "Community" },
              { href: "/issue", label: "Issue" },
              { href: "/report", label: "Report" },
              { href: "/leaderboard", label: "Leaderboard" },
              { href: "/notifications", label: "Notifications" },
              { href: "/authority", label: "Authority" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="hover:text-green-600 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* User & Profile */}
        <div>
          <h4 className="font-semibold mb-5 text-gray-900 text-lg">User</h4>
          <ul className="space-y-3">
            <li>
              <a
                href="/profile"
                className="hover:text-green-600 transition-colors"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="hover:text-green-600 transition-colors"
              >
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="font-semibold mb-5 text-gray-900 text-lg">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>Email: support@civicflow.gov</li>
            <li>Phone: +1 (800) 123-4567</li>
            <li>Address: 123 Civic Plaza, City Center</li>
          </ul>

          <div className="flex space-x-5 mt-6">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-green-600 transition-colors"
            >
              <Facebook size={22} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-green-600 transition-colors"
            >
              <Instagram size={22} />
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              className="hover:text-green-600 transition-colors"
            >
              <Twitter size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-300 mt-12 pt-6 text-center text-sm text-gray-500 select-none">
        &copy; {new Date().getFullYear()} Rectify. All rights reserved. | 
        Designed and maintained by the Department of Public Services.
      </div>
    </footer>
  );
}
