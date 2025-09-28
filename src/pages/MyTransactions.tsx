import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Transaction {
    id: number;
    points: number;
    type: "deposit" | "withdrawal";
    date: string;
    createdBy: string;
}

function MyTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 800)); // simulate delay

            const dummyData: Transaction[] = Array.from({ length: 34 }, (_, i) => ({
                id: i + 1,
                points: Math.floor(Math.random() * 2000) + 100,
                type: Math.random() > 0.5 ? "deposit" : "withdrawal",
                date: new Date(
                    Date.now() - Math.floor(Math.random() * 1_000_000_000)
                ).toLocaleString(),
                createdBy: ["Admin", "John", "Jane", "Alex", "Maya"][
                    Math.floor(Math.random() * 5)
                ],
            }));

            setTransactions(dummyData);
            setLoading(false);
        };

        fetchTransactions();
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(transactions.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = transactions.slice(indexOfFirstRow, indexOfLastRow);

    const maxVisiblePages = 3;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const pageNumbers: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="p-6">
            <ToastContainer position="top-right" autoClose={3000} />

            <h2 className="text-2xl font-bold text-slate-800 mb-6">Transactions</h2>

            {loading ? (
                <p className="text-center text-slate-500">Loading transactions...</p>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto rounded-xl shadow-lg border border-slate-200">
                        <table className="min-w-full text-sm text-left text-slate-700">
                            <thead className="bg-slate-100 text-slate-900 text-sm uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-3">Transaction ID</th>
                                    <th className="px-6 py-3">Points</th>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Date & Time</th>
                                    <th className="px-6 py-3">Created By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {currentRows.map((tx) => (
                                    <tr
                                        key={tx.id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium">{tx.id}</td>
                                        <td className="px-6 py-4">{tx.points}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${tx.type === "deposit"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {tx.type === "deposit" ? "Deposit" : "Withdrawal"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{tx.date}</td>
                                        <td className="px-6 py-4">{tx.createdBy}</td>
                                    </tr>
                                ))}

                                {transactions.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-4 text-center text-slate-500"
                                        >
                                            No transactions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                        {/* Rows per page */}
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
                            </select>
                        </div>

                        {/* Page numbers */}
                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(1)}
                                className={`px-3 py-1 rounded-md border ${currentPage === 1
                                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                        : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                «
                            </button>

                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className={`p-2 rounded-md ${currentPage === 1
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
                                    className={`px-3 py-1 rounded-md border ${currentPage === num
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
                                className={`p-2 rounded-md ${currentPage === totalPages
                                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                        : "bg-slate-100 hover:bg-slate-200"
                                    }`}
                            >
                                <ChevronRight size={18} />
                            </button>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(totalPages)}
                                className={`px-3 py-1 rounded-md border ${currentPage === totalPages
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
        </div>
    );
}

export default MyTransactions;
