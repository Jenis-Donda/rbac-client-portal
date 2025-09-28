import React from "react";

interface CoinCardProps {
    imageUrl: string;
    isActive: boolean;
    onClick: () => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ imageUrl, isActive, onClick }) => {
    return (
        <div
            className="flex flex-col items-center mb-4 last:mb-0 cursor-pointer"
            onClick={onClick}
        >
            {/* Circle coin */}
            <div
                className={`w-12 h-12 rounded-full overflow-hidden shadow-lg z-10 
          ${isActive ? "animate-spin-slow" : ""}`}
            >
                <img src={imageUrl} alt="coin" className="w-full h-full object-cover" />
            </div>

            {/* White label part */}
            <div className="mt-[-24px] bg-white rounded-xl px-9 py-4 shadow-sm border border-slate-200 text-xs text-slate-700" />
        </div>
    );
};

export default CoinCard;
