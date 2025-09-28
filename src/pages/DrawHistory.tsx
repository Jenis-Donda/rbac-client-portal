import React, { useState, useEffect } from "react";

// Helper to generate times in 5-min intervals
const generateTimes = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 5) {
            const hh = String(h).padStart(2, "0");
            const mm = String(m).padStart(2, "0");
            times.push(`${hh}:${mm}`);
        }
    }
    return times;
};

// Generate date range: past month → next 10 days
const generateDateRange = () => {
    const today = new Date();
    const start = new Date(today);
    start.setMonth(start.getMonth() - 1);
    const end = new Date(today);
    end.setDate(end.getDate() + 10);

    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        dates.push(`${year}-${month}-${day}`);
    }
    return dates;
};

// Mock API (all values = 0)
const fetchMockData = (date) => {
    const times = generateTimes();
    return times.map((time, i) => ({
        table: i + 1,
        time,
        shree: 0,
        vashikaran: 0,
        sudarshan: 0,
        vastu: 0,
        planet: 0,
        love: 0,
        tara: 0,
        grah: 0,
        matsya: 0,
        meditation: 0,
        winner: null,
        manualWinner: "",
    }));
};

// ✅ Check if both date & time have passed
const hasTimePassed = (rowTime, selectedDate) => {
    const now = new Date();
    const [hh, mm] = rowTime.split(":").map(Number);

    const rowDateTime = new Date(
        `${selectedDate}T${hh.toString().padStart(2, "0")}:${mm
            .toString()
            .padStart(2, "0")}:00`
    );

    return rowDateTime <= now;
};

const DrawHistory = () => {
    const dateOptions = generateDateRange();
    const todayStr = new Date().toISOString().split("T")[0];

    const [selectedDate, setSelectedDate] = useState(todayStr);
    const [tableData, setTableData] = useState([]);

    const yantras = [
        "Shree",
        "Vashikaran",
        "Sudarshan",
        "Vastu",
        "Planet",
        "Love",
        "Tara",
        "Grah",
        "Matsya",
        "Meditation",
    ];

    // Auto load data only if date is today or in the past
    useEffect(() => {
        const today = new Date();
        const selected = new Date(selectedDate);

        if (selected <= today) {
            const data = fetchMockData(selectedDate);
            setTableData(data);
        } else {
            setTableData([]); // Future date → no data until Create
        }
    }, [selectedDate]);

    const handleCreate = () => {
        const data = fetchMockData(selectedDate);
        setTableData(data);
    };

    const handleRemove = () => {
        setTableData([]);
    };

    const handleSetManualWinner = (rowIndex) => {
        setTableData((prev) =>
            prev.map((row, i) =>
                i === rowIndex ? { ...row, winner: row.manualWinner || row.winner } : row
            )
        );
    };

    const isPastDate = new Date(selectedDate) < new Date(todayStr);
    const isToday = selectedDate === todayStr;
    const isFuture = new Date(selectedDate) > new Date(todayStr);

    return (
        <div className="p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg">
            {/* Header Row with Title + Buttons */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800">
                        Game Details
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Data is shown by ascending order
                    </p>
                </div>

                <div className="flex gap-3">
                    {/* ✅ Show Create only for today & future */}
                    {(isToday || isFuture) && (
                        <button
                            onClick={handleCreate}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:shadow-md hover:bg-blue-700 transition"
                        >
                            Create
                        </button>
                    )}

                    {/* ✅ Show Remove only for today & future */}
                    {(isToday || isFuture) && tableData.length > 0 && (
                        <button
                            onClick={handleRemove}
                            className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow hover:shadow-md hover:bg-orange-600 transition"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>

            {/* Date Dropdown */}
            <div className="mb-6">
                <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                >
                    {dateOptions.map((date) => (
                        <option key={date} value={date}>
                            {date}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto max-h-[500px] overflow-y-scroll rounded-lg shadow-inner">
                <table className="w-full text-sm text-center">
                    <thead className="sticky top-0 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow">
                        <tr>
                            {[
                                "TABLE",
                                "TIME",
                                "SHREE",
                                "VASHIKARAN",
                                "SUDARSHAN",
                                "VASTU",
                                "PLANET",
                                "LOVE",
                                "TARA",
                                "GRAH",
                                "MATSYA",
                                "MEDITATION",
                                "WINNER",
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="p-3 font-semibold text-xs tracking-wide"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length === 0 ? (
                            <tr>
                                <td colSpan="13" className="p-6 text-gray-500 italic">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            tableData.map((row, index) => {
                                const timePassed = hasTimePassed(row.time, selectedDate);
                                let winnerDisplay = row.winner;

                                if (timePassed && !row.winner) {
                                    winnerDisplay = "Auto Win";
                                }

                                return (
                                    <tr
                                        key={row.table}
                                        className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50"
                                            } hover:shadow-md hover:scale-[1.01] transition transform`}
                                    >
                                        <td className="p-3 font-medium text-slate-700">
                                            {row.table}
                                        </td>
                                        <td className="p-3">{row.time}</td>
                                        <td className="p-3">{row.shree}</td>
                                        <td className="p-3">{row.vashikaran}</td>
                                        <td className="p-3">{row.sudarshan}</td>
                                        <td className="p-3">{row.vastu}</td>
                                        <td className="p-3">{row.planet}</td>
                                        <td className="p-3">{row.love}</td>
                                        <td className="p-3">{row.tara}</td>
                                        <td className="p-3">{row.grah}</td>
                                        <td className="p-3">{row.matsya}</td>
                                        <td className="p-3">{row.meditation}</td>
                                        <td className="p-3">
                                            {winnerDisplay ? (
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold rounded-full text-xs">
                                                    {winnerDisplay}
                                                </span>
                                            ) : (
                                                <div className="flex gap-2 items-center justify-center">
                                                    <select
                                                        value={row.manualWinner}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setTableData((prev) =>
                                                                prev.map((r, i) =>
                                                                    i === index
                                                                        ? { ...r, manualWinner: value }
                                                                        : r
                                                                )
                                                            );
                                                        }}
                                                        disabled={timePassed} // disable if auto-win
                                                        className="border rounded-lg p-1 text-sm focus:ring-1 focus:ring-indigo-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    >
                                                        <option value="">-- Select --</option>
                                                        {yantras.map((y) => (
                                                            <option key={y} value={y}>
                                                                {y}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        onClick={() => handleSetManualWinner(index)}
                                                        disabled={timePassed} // disable if auto-win
                                                        className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-indigo-700 shadow disabled:bg-gray-400 disabled:cursor-not-allowed"
                                                    >
                                                        Set
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DrawHistory;
