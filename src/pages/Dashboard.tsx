import React, { useEffect, useState } from "react";
import {
    Award,
    Clock,
    Timer,
    Watch,
    Ticket,
} from "lucide-react";
import MetricCard from "../components/MetricCard";
import GridSquare from "../components/GridSquare";
import CoinCard from "../components/CoinCard";
import ConfirmModal from "../components/ConfirmModal"; // ✅ custom modal

// Function to get current time
const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutesStr}:${secondsStr} ${ampm}`;
};

// Initial grid data
const initialGridData = [
    { title: "Shree", value: 0 },
    { title: "Vashikaran", value: 0 },
    { title: "Sudarshan", value: 0 },
    { title: "Vastu", value: 0 },
    { title: "Planet", value: 0 },
    { title: "Love", value: 0 },
    { title: "Tara", value: 0 },
    { title: "Grah", value: 0 },
    { title: "Matsya", value: 0 },
    { title: "Meditation", value: 0 },
];

function Dashboard() {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [gridData, setGridData] = useState(initialGridData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // live clock
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // metrics
    const metrics = [
        {
            title: "Ticket",
            value: "10",
            icon: Ticket,
            change: "+12.5%",
            changeType: "positive" as const,
        },
        {
            title: "Points",
            value: "2,834",
            icon: Award,
            change: "+8.2%",
            changeType: "positive" as const,
        },
        {
            title: "Draw time",
            value: "3:30 PM",
            icon: Clock,
            change: "-2.4%",
            changeType: "negative" as const,
        },
        {
            title: "Remaining time",
            value: "2 min 30 sec",
            icon: Timer,
            change: "+15.3%",
            changeType: "positive" as const,
        },
        {
            title: "Current time",
            value: currentTime,
            icon: Watch,
            change: "+0.5%",
            changeType: "positive" as const,
        },
    ];

    // last draws
    const lastFiveDraws = [
        {
            time: "2025-02-07 16:05",
            title: "Planet",
            image: "/images/yantra/planet.jfif",
        },
        {
            time: "2025-02-07 16:00",
            title: "Vastu",
            image: "/images/yantra/vastu.jpg",
        },
        {
            time: "2025-02-07 15:55",
            title: "Grah",
            image: "/images/yantra/grah.jpg",
        },
        {
            time: "2025-02-07 15:50",
            title: "Tara",
            image: "/images/yantra/tara.jpg",
        },
        {
            time: "2025-02-07 15:45",
            title: "Meditation",
            image: "/images/yantra/meditation.jpg",
        },
    ];

    // update single grid value
    const handleSaveGridValue = (index: number, newValue: number) => {
        setGridData((prev) =>
            prev.map((item, i) => (i === index ? { ...item, value: newValue } : item))
        );
    };

    // clear all values
    const handleClearAll = () => {
        const cleared = gridData.map((item) => ({ ...item, value: 0 }));
        setGridData(cleared);
    };

    // submit (open modal)
    const handleSubmit = () => {
        setIsModalOpen(true);
    };

    // confirm submit
    const confirmSubmit = () => {
        console.log("Saving bet values:", gridData);
        // 👉 call API here to save bets
    };

    return (
        <div>
            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {metrics.map((metric, index) => (
                    <MetricCard
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        icon={metric.icon}
                        change={metric.change}
                        changeType={metric.changeType}
                    />
                ))}
            </div>

            {/* Activity Grid + Coins */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">
                        Activity Grid
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {gridData.map((item, index) => (
                            <GridSquare
                                key={index}
                                index={index}
                                title={item.title}
                                value={item.value}
                                onSave={handleSaveGridValue}
                            />
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={handleClearAll}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                                />
                            </svg>
                            Clear All
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-2 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Submit
                        </button>
                    </div>
                </div>

                <div className="flex flex-row lg:flex-col w-full lg:w-24 justify-center lg:justify-start gap-4">
                    <CoinCard imageUrl="/images/coins/coin1.png" />
                    <CoinCard imageUrl="/images/coins/coin2.png" />
                    <CoinCard imageUrl="/images/coins/coin5.png" />
                    <CoinCard imageUrl="/images/coins/coin10.png" />
                    <CoinCard imageUrl="/images/coins/coin20.png" />
                </div>
            </div>

            {/* Last 5 Draws */}
            <div className="mt-10 bg-white rounded-2xl shadow-md border border-slate-200 p-6">
                <div className="relative flex items-center justify-center mb-8">
                    <div className="absolute w-full border-t border-blue-400 top-1/2"></div>
                    <span className="relative bg-white px-6 py-1 rounded-full font-semibold text-blue-600 border border-blue-400 shadow-sm">
                        Last 5 Draw
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                    {lastFiveDraws.map((draw, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <p className="text-sm font-medium text-slate-600 mb-2">
                                {draw.time}
                            </p>
                            <div className="w-24 h-24 rounded-full shadow-md">
                                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white">
                                    <img
                                        src={draw.image}
                                        alt={draw.title}
                                        className="object-cover w-full h-full scale-125"
                                    />
                                </div>
                            </div>
                            <p className="mt-3 text-sm font-semibold text-slate-800 tracking-wide">
                                {draw.title}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-full font-semibold shadow">
                        View All Draw
                    </button>
                </div>
            </div>

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmSubmit}
            />
        </div>
    );
}

export default Dashboard;
