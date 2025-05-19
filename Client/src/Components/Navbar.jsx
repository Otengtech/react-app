import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = ({ cart, userName, setUserName, userEmail, setUserEmail }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [active, setActive] = useState("none");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    if (savedName) setUserName(savedName);
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      localStorage.removeItem("userName");
    }
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    } else {
      localStorage.removeItem("userEmail");
    }
  }, [userName, userEmail]);

  useEffect(() => {
    setActive(userName !== "" ? "flex" : "none");
  }, [userName]);

  const setActiveFalse = () => setActiveLink("");
  const toggleAccountMenu = () => setAccountMenu((prev) => !prev);
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleLinkClick = (linkPath) => {
    setActiveLink(linkPath);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 h-24 w-full flex items-center justify-between px-5 shadow-md bg-gray-900 z-50">
        <div className="flex items-center justify-center space-x-6 animate-fade-in-up">
          <i
            onClick={() => setMenuOpen(!menuOpen)}
            className="fa-solid fa-bars flex text-xl text-yellow-500 cursor-pointer md:hidden lg:hidden"
          ></i>
          <Link to="/">
            <h1 className="text-md sm:text-2xl text-yellow-500 font-bold animate-fade-in-up">
              SNEEKERS
            </h1>
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-5 animate-fade-in-up">
          <ul className="hidden md:flex lg:flex items-center justify-center space-x-5 text-md text-gray-200">
            {["/", "/allsneakers", "/contact", "/about", "/policy"].map(
              (path, idx) => {
                const labels = [
                  "Home",
                  "Shop Now",
                  "Contact",
                  "About",
                  "Privacy Policy",
                ];
                return (
                  <Link key={idx} to={path}>
                    <li
                      onClick={() => setActiveLink(path)}
                      className={`cursor-pointer transition duration-300 ${
                        activeLink === path
                          ? "pb-2 text-yellow-500 font-semibold"
                          : "hover:pb-2 hover:text-yellow-500"
                      }`}
                    >
                      {labels[idx]}
                    </li>
                  </Link>
                );
              }
            )}
          </ul>

          <Link to="/cart">
            <div
              className="relative animate-fade-in-up"
              onClick={setActiveFalse}
            >
              <i className="fa-solid text-yellow-500 text-xl cursor-pointer fa-bag-shopping"></i>
              <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 text-sm rounded-full bg-gray-200">
                {totalItems}
              </span>
            </div>
          </Link>

          <div className="flex items-center justify-center space-x-3">
            <i
              onClick={() => {
                toggleAccountMenu();
                setActiveFalse();
              }}
              className="animate-fade-in-up text-white text-xl cursor-pointer fa-solid fa-user"
            ></i>

            <div
              className={`absolute top-14 right-4 z-50 rounded-xl p-5 w-64 backdrop-blur-md bg-yellow-500/90 shadow-xl ring-1 ring-yellow-400 transition-all duration-300 ease-in-out transform ${
                accountMenu
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex flex-col items-center space-y-2 text-white">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-semibold shadow-inner">
                  {userName ? userName.charAt(0).toUpperCase() : "G"}
                </div>
                <div className="font-bold text-lg">{userName || "Guest"}</div>
                <div className="text-sm text-center text-gray-100">
                  {userEmail || "No email provided"}
                </div>

                <Link to="/login" className="w-full">
                  <button
                    onClick={() => {
                      setUserName("");
                      setUserEmail("");
                      localStorage.removeItem("userName");
                      localStorage.removeItem("userEmail");
                      setAccountMenu(false)
                    }}
                    className="w-full mt-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition duration-200"
                  >
                    Logout
                  </button>
                </Link>

                <Link to="/adminpanel" className="w-full">
                  <button 
                  onclick={()=>{
                    setAccountMenu(false)
                  }}
                  className="w-full mt-2 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition duration-200 text-sm">
                    Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {!userName && (
              <Link to="/login">
                <div
                  className="flex animate-fade-in-up items-center justify-center"
                  onClick={setActiveFalse}
                >
                  <button className="py-3 px-6 rounded-full bg-yellow-500 text-xs md:text-sm sm:text-sm text-gray-900">
                    LOGIN
                  </button>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div
        className={`z-50 fixed top-16 mt-3 left-0 w-full text-yellow-500 bg-gray-900 transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0 h-screen" : "-translate-x-full h-screen"
        }`}
      >
        <ul className="flex flex-col justify-center mt-4 animate-fade-in-up">
          {["/", "/allsneakers", "/contact", "/about", "/policy", "/faq"].map(
            (path, idx) => {
              const labels = [
                "Home",
                "Shop Now",
                "Contact",
                "About",
                "Privacy Policy",
                "FAQs",
              ];
              return (
                <Link key={idx} to={path}>
                  <li
                    onClick={() => handleLinkClick(path)}
                    className={`cursor-pointer text-yellow-500 px-6 py-4 ${
                      activeLink === path ? "text-yellow-400" : ""
                    }`}
                  >
                    {labels[idx]}
                  </li>
                </Link>
              );
            }
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
