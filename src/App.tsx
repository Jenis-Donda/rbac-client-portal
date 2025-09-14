import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/History";
import { LogOut, Key, User, Menu } from "lucide-react";
import AddClient from "./pages/AddClient";
import ManageClients from "./pages/ManageClients";
import Transactions from "./pages/Transactions";


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // 🔑 Example role (replace with actual auth context or API later)
  const userRole = "master admin";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  return (
    <Router>
      <div className="flex h-screen bg-slate-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} role={userRole} />

        <div className="flex-1 h-full flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 h-16 flex items-center justify-between relative">
            <div className="flex items-center gap-4">
              {/* Hamburger button for mobile */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              >
                <Menu size={22} />
              </button>
              <h2 className="text-2xl font-bold text-slate-900">Logo</h2>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <div
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
                onClick={toggleProfile}
              >
                <User size={18} className="text-white" />
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded shadow-lg z-50">
                  <button
                    onClick={() => alert("Profile clicked")}
                    className="flex items-center px-4 py-2 w-full text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <Key size={16} className="mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={() => alert("Reset Password clicked")}
                    className="flex items-center px-4 py-2 w-full text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <Key size={16} className="mr-2" />
                    Reset Password
                  </button>
                  <button
                    onClick={() => alert("Logout clicked")}
                    className="flex items-center px-4 py-2 w-full text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Routes */}
          <main className="p-6 h-[calc(100%-4rem)] overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/add-client" element={<AddClient />} />
              <Route path="/manage-clients" element={<ManageClients />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
