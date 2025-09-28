import React, { useEffect, useState } from "react";
import {
  Pencil,
  Link as LinkIcon,
  History,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

interface Client {
  id: number;
  username: string;
  points: number;
  status: "active" | "inactive";
  cr?: number;
  pl?: number;
  plPercent?: number;
  exposure?: number;
}

function ManageClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Points modal state
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [pointsInput, setPointsInput] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"credit" | "withdrawal">("credit");

  // Edit modal state
  const [editingDetailsClient, setEditingDetailsClient] = useState<Client | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [statusInput, setStatusInput] = useState<"active" | "inactive">("active");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const dummyData: Client[] = Array.from({ length: 34 }, (_, i) => ({
        id: i + 1,
        username: `Client${i + 1}`,
        points: Math.floor(Math.random() * 2000),
        status: Math.random() > 0.5 ? "active" : "inactive",
        cr: Math.floor(Math.random() * 1000),
        pl: Math.floor(Math.random() * 5000),
        plPercent: parseFloat((Math.random() * 100).toFixed(2)),
        exposure: Math.floor(Math.random() * 10000),
      }));

      setClients(dummyData);
      setLoading(false);
    };

    fetchClients();
  }, []);

  // ---- Points Modal ----
  const openPointsModal = (client: Client) => {
    setEditingClient(client);
    setPointsInput(client.points.toString()); // show current value
    setTransactionType("credit");
  };

  const closePointsModal = () => {
    setEditingClient(null);
    setPointsInput("");
  };

  const handleSavePoints = async () => {
    if (!editingClient) return;

    const parsedPoints = parseInt(pointsInput, 10);
    if (isNaN(parsedPoints) || parsedPoints <= 0) {
      toast.error("Points must be greater than 0");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    setClients((prev) =>
      prev.map((c) =>
        c.id === editingClient.id
          ? {
              ...c,
              points:
                transactionType === "credit"
                  ? parsedPoints
                  : Math.max(0, c.points - parsedPoints),
            }
          : c
      )
    );

    toast.success(
      `${transactionType === "credit" ? "Credited" : "Withdrawn"} ${parsedPoints} points for ${editingClient.username}!`
    );
    closePointsModal();
  };

  // ---- Edit Details Modal ----
  const openEditDetailsModal = (client: Client) => {
    setEditingDetailsClient(client);
    setUsernameInput(client.username);
    setPasswordInput("");
    setStatusInput(client.status);
  };

  const closeEditDetailsModal = () => {
    setEditingDetailsClient(null);
    setUsernameInput("");
    setPasswordInput("");
    setStatusInput("active");
  };

  const handleSaveDetails = async () => {
    if (!editingDetailsClient) return;

    await new Promise((resolve) => setTimeout(resolve, 800));

    setClients((prev) =>
      prev.map((c) =>
        c.id === editingDetailsClient.id
          ? {
              ...c,
              username: usernameInput,
              status: statusInput,
            }
          : c
      )
    );

    toast.success(`Details updated for ${editingDetailsClient.username}!`);
    closeEditDetailsModal();
  };

  // ---- Pagination ----
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = clients.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(clients.length / rowsPerPage);
  const maxVisiblePages = 3;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Manage Clients</h2>

      {loading ? (
        <p className="text-center text-slate-500">Loading clients...</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl shadow-lg border border-slate-200">
            <table className="min-w-full text-sm text-left text-slate-700">
              <thead className="bg-slate-100 text-slate-900 text-sm uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3">Client ID</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">CR</th>
                  <th className="px-6 py-3">Points</th>
                  <th className="px-6 py-3">Client (P/L)</th>
                  <th className="px-6 py-3">Client (P/L) %</th>
                  <th className="px-6 py-3">Exposure</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Transactions</th>
                  <th className="px-6 py-3">History</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentRows.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{client.id}</td>
                    <td className="px-6 py-4">{client.username}</td>
                    <td className="px-6 py-4">{client.cr}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      {client.points}
                      <button
                        onClick={() => openPointsModal(client)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                    <td className="px-6 py-4">{client.pl}</td>
                    <td className="px-6 py-4">{client.plPercent}%</td>
                    <td className="px-6 py-4">{client.exposure}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          client.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/clients/${client.id}/transactions`}
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <LinkIcon size={16} className="mr-1" />
                        Transactions
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/clients/${client.id}/history`}
                        className="flex items-center text-purple-600 hover:underline"
                      >
                        <History size={16} className="mr-1" />
                        History
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openEditDetailsModal(client)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {clients.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-6 py-4 text-center text-slate-500">
                      No clients found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="rows" className="text-sm text-slate-600">
                Records per page:
              </label>
              <select
                id="rows"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-slate-300 rounded-md px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === 1
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100"
                }`}
              >
                «
              </button>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === num
                      ? "bg-blue-100 border-blue-400 text-blue-600 font-bold"
                      : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                <ChevronRight size={18} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === totalPages
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100"
                }`}
              >
                »
              </button>
            </div>
          </div>
        </>
      )}

      {/* Points Modal */}
      {editingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={closePointsModal}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-2">Update Points</h3>
            <p className="text-sm text-slate-600 mb-4">
              Enter a points value for{" "}
              <span className="font-semibold">{editingClient.username}</span>.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Points</label>
              <input
                type="number"
                min={1}
                value={pointsInput}
                onChange={(e) => setPointsInput(e.target.value.replace(/^0+/, ""))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Transaction Type
              </label>
              <select
                value={transactionType}
                onChange={(e) =>
                  setTransactionType(e.target.value as "credit" | "withdrawal")
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="credit">Credit</option>
                <option value="withdrawal">Withdrawal</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closePointsModal}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePoints}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Details Modal */}
      {editingDetailsClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={closeEditDetailsModal}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-2">Edit Client Details</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={statusInput}
                onChange={(e) =>
                  setStatusInput(e.target.value as "active" | "inactive")
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeEditDetailsModal}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDetails}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageClients;
