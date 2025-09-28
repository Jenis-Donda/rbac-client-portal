import React, { useState, useEffect } from "react";

interface GridSquareProps {
  index: number;
  title: string;
  value: number;
  onSave?: (index: number, newValue: number) => void; // callback to parent
}

const images = [
  "/images/yantra/shree.jfif",
  "/images/yantra/vashikaran.jfif",
  "/images/yantra/sudarshan.jpg",
  "/images/yantra/vastu.jpg",
  "/images/yantra/planet.jfif",
  "/images/yantra/love.jpg",
  "/images/yantra/tara.jpg",
  "/images/yantra/grah.jpg",
  "/images/yantra/matsya.jpg",
  "/images/yantra/meditation.jpg",
];

const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-cyan-500",
];

const GridSquare: React.FC<GridSquareProps> = ({ index, title, value, onSave }) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value); // sync with parent
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
    const numericValue = rawValue === "" ? 0 : parseInt(rawValue, 10);
    setCurrentValue(numericValue);
    onSave?.(index, numericValue);
  };

  const imageUrl = images[index % images.length];
  const bgColor = colors[index % colors.length];

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200">
      {/* Icon */}
      <div className="p-3 flex justify-center">
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover scale-125" />
        </div>
      </div>

      {/* Text + value */}
      <div className="px-3 pb-6 text-center">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">{title}</h3>
        <div className="h-8 bg-black rounded-lg flex items-center justify-center px-2">
          <input
            type="text"
            value={currentValue.toString()}
            onChange={handleInputChange}
            className="text-center bg-transparent text-white text-lg font-bold outline-none"
            style={{ width: `${Math.min(currentValue.toString().length, 9)}ch` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GridSquare;
