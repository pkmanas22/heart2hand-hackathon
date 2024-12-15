"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const navItemsData = [
  { name: "Department", route: "/department" },
  { name: "Alumni", route: "/alumni" },
  { name: "Events", route: "/events" },
  { name: "Resources", route: "/resources" },
  { name: "Magazines", route: "/magazines" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-primary to-background text-primary-foreground py-4 px-2 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Heart2Hand</h1>
        <div className="flex flex-row-reverse items-center gap-3 md:flex-row">
          {/* Hamburger Menu for mobile */}
          <button
            className="block text-gray-300 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Navigation */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute left-0 top-16 z-10 w-full shadow-md md:static md:flex md:w-auto md:bg-transparent md:shadow-none`}
          >
            <ul className="flex flex-col items-center p-4 md:flex-row md:gap-8 md:p-0">
              {navItemsData.map((item, index) => (
                <li key={index} className="mb-2 md:mb-0">
                  <Link
                    href={item.route}
                    className="text-white hover:text-blue-600 font-semibold"
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
