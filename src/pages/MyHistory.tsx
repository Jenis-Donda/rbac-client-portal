import React, { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Yantra {
    name: string;
    image: string;
    quantity: number;
}

interface HistoryItem {
    ticketNumber: string;
    tickets: number;
    points: number;
    result: "Win" | "Lose";
    time: string;
    yantras: Yantra[];
}

const user = {
    id: 5,
    role: "client" as "client",
};

const MyHistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const yantraList = [
        { name: "Shree", image: "/images/yantra/shree.jfif" },
        { name: "Vastu", image: "/images/yantra/vastu.jpg" },
        { name: "Planet", image: "/images/yantra/planet.jfif" },
        { name: "Tara", image: "/images/yantra/tara.jpg" },
        { name: "Meditation", image: "/images/yantra/meditation.jpg" },
    ];

    const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openRow, setOpenRow] = useState<number | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            await new Promise((res) => setTimeout(res, 800));

            const mockData: HistoryItem[] = Array.from({ length: 25 }, (_, i) => ({
                ticketNumber: `CL${user.id}-TCK-${1001 + i}`,
                tickets: Math.floor(Math.random() * 5) + 1,
                points: Math.floor(Math.random() * 100) + 10,
                result: Math.random() > 0.5 ? "Win" : "Lose",
                time: `2025-09-18 ${9 + (i % 12)}:${i % 2 ? "30" : "00"} AM`,
                yantras: Array.from(
                    { length: Math.floor(Math.random() * 3) + 1 },
                    () => {
                        const base = yantraList[Math.floor(Math.random() * yantraList.length)];
                        return { ...base, quantity: Math.floor(Math.random() * 5) + 1 };
                    }
                ),
            }));

            setHistoryData(mockData);
            setLoading(false);
        };

        fetchHistory();
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = historyData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(historyData.length / rowsPerPage);
    const maxVisiblePages = 3;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="relative px-6">
            {/* Back button between navbar and white container */}
            <div className="flex items-center mt-6 mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full shadow-md"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>

            {/* White content container */}
            <div className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 mx-auto max-w-6xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">My History</h2>

                {loading ? (
                    <p className="text-center text-slate-500 py-8">Loading history...</p>
                ) : historyData.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">No history available.</p>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <div className="grid grid-cols-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm uppercase tracking-wide rounded-t-md">
                                <div className="px-4 py-3">#</div>
                                <div className="px-4 py-3">Ticket Number</div>
                                <div className="px-4 py-3">Tickets</div>
                                <div className="px-4 py-3">Points</div>
                                <div className="px-4 py-3">Result</div>
                                <div className="px-4 py-3">Time</div>
                            </div>

                            {currentRows.map((row, idx) => {
                                const rowIndex = indexOfFirstRow + idx + 1;
                                const isOpen = openRow === rowIndex;

                                return (
                                    <div key={idx} className="border-b border-slate-200">
                                        <div
                                            onClick={() => setOpenRow(isOpen ? null : rowIndex)}
                                            className="grid grid-cols-6 items-center cursor-pointer hover:bg-blue-50 transition-colors"
                                        >
                                            <div className="px-4 py-3 text-slate-500 font-medium flex items-center gap-2">
                                                {rowIndex}
                                                {isOpen ? (
                                                    <ChevronUp size={16} className="text-slate-500" />
                                                ) : (
                                                    <ChevronDown size={16} className="text-slate-500" />
                                                )}
                                            </div>
                                            <div className="px-4 py-3 font-medium text-slate-700">{row.ticketNumber}</div>
                                            <div className="px-4 py-3 text-slate-600">{row.tickets}</div>
                                            <div className="px-4 py-3 font-semibold text-blue-600">{row.points}</div>
                                            <div className="px-4 py-3">
                                                <span
                                                    className={`px-3 py-1 text-xs font-bold rounded-full ${row.result === "Win"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-red-100 text-red-600"
                                                        }`}
                                                >
                                                    {row.result}
                                                </span>
                                            </div>
                                            <div className="px-4 py-3 text-slate-500 text-sm">{row.time}</div>
                                        </div>

                                        {isOpen && (
                                            <div className="bg-slate-50 px-2 py-3 flex flex-wrap gap-4">
                                                {row.yantras.map((y, yIdx) => (
                                                    <div
                                                        key={yIdx}
                                                        className="bg-white shadow-md rounded-xl p-4 inline-flex flex-col items-center text-center hover:shadow-lg transition w-fit"
                                                    >
                                                        <div className="relative w-16 h-16 rounded-full overflow-hidden shadow mb-2">
                                                            <img src={y.image} alt={y.name} className="object-cover w-full h-full" />
                                                        </div>
                                                        <h4 className="text-sm font-bold text-slate-800">{y.name}</h4>
                                                        <p className="text-xs text-slate-500">
                                                            Quantity: <span className="font-semibold">{y.quantity}</span>
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
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
                                    onChange={handleRowsChange}
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
        </div>
    );
};

export default MyHistoryPage;
