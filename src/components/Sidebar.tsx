import React, { useState } from "react";
import { Link } from "react-router-dom";
import Transactions from '../pages/Transactions';
import {
  LayoutDashboard,
  History,
  Users,
  ChevronDown,
  ChevronRight,
  UserPlus,
  Settings,
  Wallet,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, role }) => {
  const [clientsOpen, setClientsOpen] = useState(false);

  return (
    <aside
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-64 bg-slate-800 text-white shadow-md transform transition-transform duration-300 z-40`}
    >
      <div className="p-4 font-bold text-lg border-b border-slate-700">
        Sidebar
      </div>

      <nav className="p-4 flex flex-col gap-2">
        {(role === "admin" || role === "master admin") && (
          <Link
            to="/"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-700"
            onClick={toggleSidebar}
          >
            <LayoutDashboard size={18} className="mr-2" />
            Dashboard
          </Link>
        )}

        
        {(role === "admin" || role === "master admin") && (<>
          <Link
            to="/my-history"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-700"
            onClick={toggleSidebar}
          >
            <History size={18} className="mr-2" />
            My History
          </Link>
          </>
        )}

        {role === "master admin" && (<>
          <Link
            to="/my-transactions"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-700"
            onClick={toggleSidebar}
          >
            <Wallet size={18} className="mr-2" />
            My Transactions
          </Link>
        </>
        )}

        {/* 👑 Master Admin only */}
        {role === "master admin" && (
          <div>
            <button
              onClick={() => setClientsOpen(!clientsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-slate-700"
            >
              <span className="flex items-center">
                <Users size={18} className="mr-2" />
                Clients
              </span>
              {clientsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {clientsOpen && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                <Link
                  to="/add-client"
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-700 text-sm"
                  onClick={toggleSidebar}
                >
                  <UserPlus size={16} className="mr-2" />
                  Add Client
                </Link>
                <Link
                  to="/manage-clients"
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-700 text-sm"
                  onClick={toggleSidebar}
                >
                  <Settings size={16} className="mr-2" />
                  Manage Clients
                </Link>
              </div>
            )}
          </div>
        )}


        {role === "super admin" && (
          <div>
            <button
              onClick={() => setClientsOpen(!clientsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-slate-700"
            >
              <span className="flex items-center">
                <Users size={18} className="mr-2" />
                Masters
              </span>
              {clientsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {clientsOpen && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                <Link
                  to="/add-master"
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-700 text-sm"
                  onClick={toggleSidebar}
                >
                  <UserPlus size={16} className="mr-2" />
                  Add Master
                </Link>
                <Link
                  to="/manage-masters"
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-700 text-sm"
                  onClick={toggleSidebar}
                >
                  <Settings size={16} className="mr-2" />
                  Manage Masters
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
