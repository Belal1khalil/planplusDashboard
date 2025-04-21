import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/imgs/LogoBlack.png";
import { AuthContext } from "../../Context/AuthContext";

export default function Layout() {
  const { logout } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div>
        {/* Toggle Button */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          aria-controls="logo-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        {/* Sidebar */}
        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 bg-mainColor">
            {/* Close Button (Small screens only) */}
            <div className="sm:hidden flex justify-end">
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 text-gray-600 hover:text-black"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <Link to="/Dashboard" className="flex items-center pl-2.5 mb-5">
              <img src={logo} className="h-6 me-3 my-1 sm:h-7" alt="Logo" />
            </Link>

            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/Dashboard/AllVideos"
                  className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-mainColor dark:hover:bg-gray-700 group"
                >
                  <div className="flex justify-center items-center gap-5">
                    <i className="fa-solid fa-video"></i>
                    <button onClick={() => setShowSidebar(false)}>
                      <span>All Videos</span>
                    </button>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/Dashboard/GetUser"
                  className="flex items-center p-2 text-white  rounded-lg dark:text-white hover:bg-mainColor dark:hover:bg-gray-700 group"
                >
                  <div className="flex justify-center items-center gap-5">
                    <i className="fa-solid fa-user"></i>
                    <button onClick={() => setShowSidebar(false)}>
                      <span>Get User</span>
                    </button>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-mainColor dark:hover:bg-gray-700 group"
                >
                  <button
                    onClick={() => {
                      logout();
                      setShowSidebar(false);
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Sign out
                      </span>
                    </div>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="p-4 sm:ml-64 h-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
