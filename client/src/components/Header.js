import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const userType = sessionStorage.getItem('userType');

  const handleLinkClick = (index) => {
    setActiveLink(index);
    setIsOpen(false); // Close the mobile menu after clicking a link
  };

  return (
    <nav className="shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://res.cloudinary.com/duwadnxwf/image/upload/v1713351625/logo_lqkj0b.png"
                alt="Logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://res.cloudinary.com/duwadnxwf/image/upload/v1713351625/logo_lqkj0b.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className={`hidden sm:flex sm:space-x-4 ${isOpen ? 'flex' : 'hidden'}`}>
            <div className="flex-grow">
              <ul className="flex flex-grow justify-center sm:justify-end space-x-4">
                {!isLoggedIn && (
                  <li>
                    <Link
                      to="/login"
                      className={`text-black px-3 py-2 rounded-md text-sm font-medium ${activeLink === 0 ? 'bg-black text-white' : ''}`}
                      onClick={() => handleLinkClick(0)}
                    >
                      Login
                    </Link>
                  </li>
                )}
                {isLoggedIn && (
                  <>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-black px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </button>
                    </li>
                    {userType === 'Care Taker' && (
                      <li>
                        <Link
                          to="/form"
                          className={`text-black px-3 py-2 rounded-md text-sm font-medium ${activeLink === 1 ? 'bg-black text-white' : ''}`}
                          onClick={() => handleLinkClick(1)}
                        >
                          Form
                        </Link>
                      </li>
                    )}
                    {(userType === 'Care Taker' || userType === 'doctor') && (
                      <li>
                        <Link
                          to="/reports"
                          className={`text-black px-3 py-2 rounded-md text-sm font-medium ${activeLink === 2 ? 'bg-black text-white' : ''}`}
                          onClick={() => handleLinkClick(2)}
                        >
                          Reports
                        </Link>
                      </li>
                    )}
                    {userType === 'doctor' && (
                      <li>
                        <Link
                          to="/chatbot"
                          className={`text-black px-3 py-2 rounded-md text-sm font-medium ${activeLink === 3 ? 'bg-black text-white' : ''}`}
                          onClick={() => handleLinkClick(3)}
                        >
                          Chatbot
                        </Link>
                      </li>
                    )}
                    {userType === 'admin' && (
                      <>
                        <li>
                          <Link
                            to="/patientRegister"
                            className={`text-black px-3 py-2 rounded-md text-sm font-medium ${activeLink === 4 ? 'bg-black text-white' : ''}`}
                            onClick={() => handleLinkClick(4)}
                          >
                            Add Patient
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/careRegister"
                            className={`text-black px-3 py-2 rounded-md text-sm font-medium ${activeLink === 5 ? 'bg-black text-white' : ''}`}
                            onClick={() => handleLinkClick(5)}
                          >
                            Add Caretaker
                          </Link>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
