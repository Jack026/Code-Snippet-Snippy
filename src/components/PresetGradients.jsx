import React from 'react';

const LIGHT_PRESETS = [ { name: 'Ocean', colors: ['#2E3192', '#1BFFFF'] }, { name: 'Sunset', colors: ['#FF7E5F', '#FEB47B'] }, { name: 'Forest', colors: ['#134E5E', '#71B280'] }, { name: 'Royal', colors: ['#DA22FF', '#9733EE'] }, { name: 'Cherry', colors: ['#EB3349', '#F45C43'] }, { name: 'Sky', colors: ['#00B4DB', '#0083B0'] }, ];
const DARK_PRESETS = [ { name: 'Midnight Plum', colors: ['#0f0c29', '#302b63'] }, { name: 'Emerald Night', colors: ['#0f2027', '#2c5364'] }, { name: 'Cosmic Fusion', colors: ['#141E30', '#243B55'] }, { name: 'Royal Blood', colors: ['#430541', '#23074d'] }, { name: 'Cyberpunk', colors: ['#000428', '#004e92'] }, { name: 'Volcanic Ash', colors: ['#333333', '#dd1818'] }, ];


const PresetGradients = ({ presets, onSelect }) => {
    return (
      <div className="w-full py-3 bg-white/30 dark:bg-black/20 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10">
        <h3 className="px-4 mb-2 text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
          Canvas Presets
        </h3>
        <div className="flex items-center gap-3 px-4 pb-2 overflow-x-auto">
          {presets.map((preset) => (
            <button
              key={preset.name}
              className="flex-shrink-0 w-24 h-12 rounded-lg shadow-md hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-200"
              style={{
                backgroundImage: `linear-gradient(to right, ${preset.colors[0]}, ${preset.colors[1]})`,
              }}
              onClick={() => onSelect(preset.colors)}
              title={preset.name}
              aria-label={`Select ${preset.name} preset`}
            />
          ))}
        </div>
      </div>
    );
  };

export default PresetGradients;