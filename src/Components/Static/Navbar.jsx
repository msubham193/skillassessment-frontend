import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../../assets/logo.png";
import skillindialogo from "../../assets/skillindialogo.png";
import NCVETlogo from "../../assets/NCVETlogo.jpeg";
import { FiAlignJustify, FiX } from "react-icons/fi";

function Header({ isVisible }) {
  return (
    <header
      className={`px-4 py-2 md:py-3 lg:py-4 transition-all duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
            <a href="#" className="mr-2 sm:mr-4 flex-shrink-0">
              <img
                src={logo}
                alt="logo"
                className="w-12 h-12 object-contain sm:w-18 sm:h-18 md:w-24 md:h-24"
              />
            </a>
            <div className="text-left flex-1">
              <h1 className="text-xs font-semibold text-[#070F36] sm:text-base md:text-lg lg:text-2xl">
                Awards and Certification
              </h1>
              <h2 className="text-2xs font-semibold text-gray-700 sm:text-sm md:text-xl">
                of Centurion University of Technology & Management (CUTM)
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-500 sm:text-sm md:text-base">
                Awarding Body recognized by NCVET
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end w-full sm:w-auto mt-2 sm:mt-0">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <img
                src={NCVETlogo}
                alt="NCVET Logo"
                className="w-8 h-8 object-contain sm:w-12 sm:h-12 md:w-20 md:h-20"
              />
              <img
                src={skillindialogo}
                alt="Skill India Logo"
                className="w-8 h-8 object-contain sm:w-12 sm:h-12 md:w-16 md:h-16"
              />
            </div>
            <span className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              Toll Free: +919345678998
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Navigation({ handleNavItemClick, open, setOpen, links }) {
  return (
    <nav className="sticky top-0 shadow-md w-full border border-[#001d3d] z-50 bg-[#070F36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center py-4">
            <span className="text-white text-lg font-semibold">AMSAY</span>
          </div>
          <div className="xl:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-white focus:outline-none"
            >
              {open ? <FiX size={24} /> : <FiAlignJustify size={24} />}
            </button>
          </div>
          <div
            className={`xl:flex xl:items-center xl:space-x-4 ${
              open
                ? "block absolute top-full left-0 w-full bg-[#070F36] p-4"
                : "hidden"
            } xl:static xl:w-auto xl:bg-transparent xl:p-0`}
          >
            <ul className="xl:flex xl:items-center xl:space-x-6">
              {links.map((link) => (
                <li
                  key={link.name}
                  className="text-base relative group py-2 xl:py-0"
                >
                  <Link
                    to={link.link}
                    className="text-white hover: transition duration-300 relative before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full hover:before:left-0"
                    onClick={handleNavItemClick}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/portal"
              className=" xl:block"
              onClick={handleNavItemClick}
            >
              <button className="bg-[#0066ff] text-base flex items-center justify-center text-white font-semibold px-3 py-1 rounded duration-500 hover:bg-[#3f37c9]">
                Portal login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Navbar() {
  const links = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Partners", link: "/partner" },
    { name: "Training & Assessments", link: "/tp" },
    { name: "Qualification", link: "/qualification" },
    { name: "Resources", link: "/resource" },
    { name: "Notifications", link: "/notification" },
    { name: "Contact Us", link: "/contact" },
  ];

  const [open, setOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleNavItemClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the header
          setIsHeaderVisible(false);
        } else {
          // if scroll up show the header
          setIsHeaderVisible(true);
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <Header isVisible={isHeaderVisible} />
      <Navigation
        handleNavItemClick={handleNavItemClick}
        open={open}
        setOpen={setOpen}
        links={links}
      />
    </>
  );
}

export default Navbar;
