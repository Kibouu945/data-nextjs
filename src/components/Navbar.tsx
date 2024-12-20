import Link from 'next/link';
import { cn } from '@/lib/utils'; // Utilitaire CN (si configuré par ShadCN)
import { Menu, Bike, Map, Info, Home, MapPin, Book } from 'lucide-react';
import React from 'react';

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Bike className="w-6 h-6 text-blue-600" />
          <span>NYC Urban Analytics</span>
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              <Home className="inline-block w-4 h-4 mr-1" />
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/map" className="hover:text-blue-600 transition-colors">
              <Map className="inline-block w-4 h-4 mr-1" />
              Carte
            </Link>
          </li>
          <li>
            <Link href="/licences-tbc-graphs" className="hover:text-blue-600 transition-colors">
              < Book className="inline-block w-4 h-4 mr-1" />
              Plafonds de Licences à NYC
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              <Info className="inline-block w-4 h-4 mr-1" />
              À propos
            </Link>
          </li>
        </ul>

         {/* Menu (Mobile) */}
         <div className="md:hidden flex items-center">
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <label htmlFor="menu-toggle" className="cursor-pointer">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            {/* Menu déroulant */}
            <div className="absolute left-0 top-16 w-full bg-white border-t border-gray-200 hidden peer-checked:block z-10">
              <div className="flex flex-col items-start p-4 space-y-2">
                <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600 w-full">
                  <Home className="w-5 h-5 mr-2" /> Accueil
                </Link>
                <Link href="/stations" className="flex items-center text-gray-700 hover:text-blue-600 w-full">
                  <Bike className="w-5 h-5 mr-2" /> Stations
                </Link>
                <Link href="/map" className="flex items-center text-gray-700 hover:text-blue-600 w-full">
                  <MapPin className="w-5 h-5 mr-2" /> Carte
                </Link>
                <Link href="/licences-tbc-graphs" className="flex items-center text-gray-700 hover:text-blue-600 w-full">
                  <Info className="w-5 h-5 mr-2" /> À Propos
                </Link>
              </div>
            </div>
          </div>
      </nav>
    </header>
  );
};

export default Navbar;
