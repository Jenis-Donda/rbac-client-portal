import React, { useState } from 'react';

interface CoinCardProps {
    imageUrl: string;
}

const CoinCard: React.FC<CoinCardProps> = ({ imageUrl }) => {
    const [rotation, setRotation] = useState(0);

    const handleClick = () => {
        setRotation(prev => prev + 360); // Increment by 360° each click
    };

    return (
        <div
            className="flex flex-col items-center mb-4 last:mb-0 cursor-pointer"
            onClick={handleClick}
        >
            {/* Circle part with image */}
            <div
                className="w-12 h-12 rounded-full overflow-hidden shadow-lg z-10 transition-transform duration-1000"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <img src={imageUrl} alt="coin" className="w-full h-full object-cover" />
            </div>

            {/* White label part */}
            <div className="mt-[-24px] bg-white rounded-xl px-9 py-4 shadow-sm border border-slate-200 text-xs text-slate-700">
                {/* Optional label text */}
            </div>
        </div>
    );
};

export default CoinCard;
