import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header"; // ✅ Import Header
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/History";
import AddClient from "./pages/AddClient";
import ManageClients from "./pages/ManageClients";
import Transactions from "./pages/Transactions";
import AddMaster from "./pages/AddMaster";
import MyHistoryPage from "./pages/MyHistory";
import MyTransactions from "./pages/MyTransactions";
import ManageMasters from "./pages/ManageMasters";
import MasterHistoryPage from "./pages/MasterHistory";
import MasterTransactions from "./pages/MasterTransactions";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Example role (replace with actual auth context or API later)
  const userRole = "super admin";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} role={userRole} />

      <div className="flex-1 h-full flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <main className="p-6 h-[calc(100%-4rem)] overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-history" element={<MyHistoryPage />} />
            <Route path="/clients/:id/history" element={<HistoryPage />} />
            <Route path="/masters/:id/history" element={<MasterHistoryPage />} />
            <Route path="/add-client" element={<AddClient />} />
            <Route path="/add-master" element={<AddMaster />} />
            <Route path="/manage-clients" element={<ManageClients />} />
            <Route path="/manage-masters" element={<ManageMasters />} />
            <Route path="/my-transactions" element={<MyTransactions />} />
            <Route path="/clients/:id/transactions" element={<Transactions />} />
            <Route path="/masters/:id/transactions" element={<MasterTransactions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
