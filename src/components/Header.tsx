import React, { useState, useRef, useEffect } from "react";
import { Menu, User, Key, LogOut, Coins } from "lucide-react";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const toggleProfile = () => setProfileOpen((prev) => !prev);

    // ✅ Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // ✅ Example: Fetch or calculate points
    const userPoints = 1200; // replace with real points from API/context
    const todayDate = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
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

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    <Coins size={16} className="text-yellow-600" />
                    {userPoints}
                </div>

                {/* ✅ Date */}
                <div className="text-slate-600 text-sm font-medium">{todayDate}</div>

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
                                <User size={16} className="mr-2" />
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
            </div>
        </header>
    );
};

export default Header;
