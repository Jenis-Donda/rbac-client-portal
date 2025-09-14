import React, { useState, useEffect } from 'react';

interface GridSquareProps {
  index: number;
  title: string;
  value: number;
  onSave?: (index: number, newValue: number) => void; // callback to parent
}

const GridSquare: React.FC<GridSquareProps> = ({ index, title, value, onSave }) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value); // keep synced with parent changes (like clear all)
  }, [value]);

  const images = [
    '/images/yantra/shree.jfif',
    '/images/yantra/vashikaran.jfif',
    '/images/yantra/sudarshan.jpg',
    '/images/yantra/vastu.jpg',
    '/images/yantra/planet.jfif',
    '/images/yantra/love.jpg',
    '/images/yantra/tara.jpg',
    '/images/yantra/grah.jpg',
    '/images/yantra/matsya.jpg',
    '/images/yantra/meditation.jpg'
  ];

  const colors = [
    'bg-red-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-teal-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-cyan-500'
  ];

  const imageUrl = images[index % images.length];
  const bgColor = colors[index % colors.length];

  const handleChange = (delta: number) => {
  const newValue = Math.max(0, currentValue + delta); // prevent going below 0
  setCurrentValue(newValue);
  if (onSave) {
    onSave(index, newValue); // notify parent
  }
};


  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200">
      {/* Icon section */}
      <div className="p-3 flex justify-center">
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover scale-125"
          />
        </div>
      </div>

      {/* Text section */}
      <div className="px-3 pb-6 text-center">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">{title}</h3>

        {/* Black box with controls inside */}
        <div className="h-8 bg-black rounded-lg flex items-center justify-between px-2">
          <button
            onClick={() => handleChange(-1)}
            className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400"
          >
            -
          </button>
          <p className="text-white text-lg font-bold">{currentValue}</p>
          <button
            onClick={() => handleChange(1)}
            className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:text-green-400"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridSquare;
