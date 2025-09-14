import React, { useState } from 'react';
import { Menu, LogOut, Key } from 'lucide-react';

function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    };

    return (
        <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 h-16 flex items-center justify-between relative">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors mr-4"
                >
                    <Menu size={20} />
                </button>
                <h2 className="text-2xl font-bold text-slate-900">Home Page</h2>
            </div>

            <div className="relative">
                <div className="flex items-center space-x-4 cursor-pointer" onClick={toggleProfile}>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">JD</span>
                    </div>
                </div>

                {/* Dropdown menu */}
                {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded shadow-lg z-50">
                        <button
                            onClick={() => alert('Reset Password clicked')}
                            className="flex items-center px-4 py-2 w-full text-sm text-slate-700 hover:bg-slate-100"
                        >
                            <Key size={16} className="mr-2" />
                            Reset Password
                        </button>
                        <button
                            onClick={() => alert('Logout clicked')}
                            className="flex items-center px-4 py-2 w-full text-sm text-slate-700 hover:bg-slate-100"
                        >
                            <LogOut size={16} className="mr-2" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
