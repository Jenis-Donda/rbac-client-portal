import React, { useState } from "react";
import { User, Lock, Coins, Eye, EyeOff } from "lucide-react";

function AddClient() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [points, setPoints] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState<{ username?: string; password?: string; points?: string }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!username.trim()) newErrors.username = "Username is required";
        else if (username.length < 3) newErrors.username = "Min 3 characters";

        if (!password.trim()) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Min 6 characters";

        if (points === "") newErrors.points = "Points required";
        else if (typeof points === "number" && points < 0) newErrors.points = "Cannot be negative";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/api/clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, points }),
            });

            if (response.ok) {
                setMessage("✅ Client added successfully!");
                setUsername("");
                setPassword("");
                setPoints("");
                setErrors({});
            } else {
                const errorData = await response.json();
                setMessage(`❌ Failed: ${errorData.message || "Something went wrong"}`);
            }
        } catch {
            setMessage("❌ Error connecting to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-100 via-white to-purple-100">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-200">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
                    Add New Client
                </h2>

                {message && (
                    <div
                        className={`mb-4 text-center text-sm font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className={`w-full pl-10 pr-3 py-2 rounded-lg border bg-white/70 focus:outline-none focus:ring-2 transition ${errors.username
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-slate-300 focus:ring-blue-500"
                                }`}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500 mt-1">{errors.username}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={`w-full pl-10 pr-10 py-2 rounded-lg border bg-white/70 focus:outline-none focus:ring-2 transition ${errors.password
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-slate-300 focus:ring-blue-500"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Points */}
                    <div className="relative">
                        <Coins className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input
                            type="number"
                            value={points}
                            onChange={(e) => setPoints(e.target.value === "" ? "" : Number(e.target.value))}
                            placeholder="Points"
                            min={0}
                            className={`w-full pl-10 pr-3 py-2 rounded-lg border bg-white/70 focus:outline-none focus:ring-2 transition ${errors.points
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-slate-300 focus:ring-blue-500"
                                }`}
                        />
                        {errors.points && (
                            <p className="text-xs text-red-500 mt-1">{errors.points}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : "Add Client"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddClient;
