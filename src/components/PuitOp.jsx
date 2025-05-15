import { useState } from 'react';

const PuitOp = () => {
  // État pour stocker les valeurs des rectangles de droite
  const [rightSideValues, setRightSideValues] = useState({
    top: 20,
    middle: 13,
    bottom: 9,
    dv3: 3,
    dv2: 3,
    dv1: 3,
    ord2: 4,
    ord1: 4
  });
  
  // État pour stocker les valeurs prévues (côté gauche - fixe)
  const leftSideValues = {
    top: 20,
    middle: 13.375,
    bottom: 9.375,
    dv3: 3,
    dv2: 3,
    dv1: 3,
    ord2: 4,
    ord1: 4
  };
  
  // Fonction pour déterminer la couleur selon le dépassement
  const getColor = (leftValue, rightValue) => {
    if (rightValue > leftValue * 1.15) return "#ff3333"; // Rouge si dépassement > 15%
    if (rightValue > leftValue * 1.05) return "#ff9933"; // Orange si dépassement > 5%
    return "#ffcc00"; // Jaune par défaut
  };
  
  // Fonction pour mettre à jour les valeurs
  const handleChange = (field, value) => {
    setRightSideValues({
      ...rightSideValues,
      [field]: parseFloat(value) || 0
    });
  };
  
  const scale = 10; // Échelle pour la hauteur des sections
  
  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-xl font-bold mb-4">Diagramme de Brine</h2>
      
      {/* Contrôles pour ajuster les valeurs */}
      <div className="mb-6 grid grid-cols-3 gap-4 w-full max-w-lg">
        <div className="col-span-3 text-center font-bold">Ajuster les valeurs du côté droit:</div>
        
        <div className="text-right">Section supérieure:</div>
        <input 
          type="number" 
          className="border px-2 col-span-2"
          value={rightSideValues.top} 
          onChange={(e) => handleChange('top', e.target.value)} 
        />
        
        <div className="text-right">Section milieu:</div>
        <input 
          type="number" 
          className="border px-2 col-span-2"
          value={rightSideValues.middle} 
          onChange={(e) => handleChange('middle', e.target.value)} 
        />
        
        <div className="text-right">Section inférieure:</div>
        <input 
          type="number" 
          className="border px-2 col-span-2"
          value={rightSideValues.bottom} 
          onChange={(e) => handleChange('bottom', e.target.value)} 
        />
        
        <div className="text-right">Objectif Dv3:</div>
        <input 
          type="number" 
          className="border px-2 col-span-2"
          value={rightSideValues.dv3} 
          onChange={(e) => handleChange('dv3', e.target.value)} 
        />
        
        <div className="text-right">Objectif Dv2:</div>
        <input 
          type="number" 
          className="border px-2 col-span-2"
          value={rightSideValues.dv2} 
          onChange={(e) => handleChange('dv2', e.target.value)} 
        />
        
        <div className="text-right">Objectif Dv1:</div>
        <input 
          type="number" 
          className="border px-2 col-span-2"
          value={rightSideValues.dv1} 
          onChange={(e) => handleChange('dv1', e.target.value)} 
        />
        
        <div className="text-right">Ord2:</div>
        <input 
          type="number" 
          className="border px-2 col-span-2"
          value={rightSideValues.ord2} 
          onChange={(e) => handleChange('ord2', e.target.value)} 
        />
        
        <div className="text-right">Ord1:</div>
        <input 
          type="number" 
          className="border px-2 col-span-2"
          value={rightSideValues.ord1} 
          onChange={(e) => handleChange('ord1', e.target.value)} 
        />
      </div>
      
      {/* Diagramme */}
      <div className="relative" style={{ width: '300px', height: '500px' }}>
        {/* Container */}
        <div className="absolute border-2 border-black" style={{ width: '120px', height: '480px', left: '90px' }}>
          
          {/* Top section */}
          <div className="relative border-b-2 border-dotted border-gray-500" style={{ height: `${leftSideValues.top * scale}px` }}>
            {/* Labels */}
            <div className="absolute" style={{ right: '130px', top: '0px' }}>
              <div className="flex items-center">
                <div className="w-3 h-0 border-t-8 border-t-black border-l-8 border-l-transparent"></div>
                <span className="font-bold">20"</span>
              </div>
            </div>
            
            {/* Section label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bold text-xl">Brine</span>
            </div>
            
            {/* Left rectangle (prévu) */}
            <div 
              className="absolute bg-green-500" 
              style={{ width: '15px', height: '100%', left: '-15px' }}
            ></div>
            
            {/* Right rectangle (réel) */}
            <div 
              className="absolute" 
              style={{ 
                width: '15px', 
                height: `${(rightSideValues.top / leftSideValues.top) * 100}%`, 
                right: '-15px',
                backgroundColor: getColor(leftSideValues.top, rightSideValues.top)
              }}
            ></div>
          </div>
          
          {/* Middle section */}
          <div className="relative border-b-2 border-dotted border-gray-500" style={{ height: `${leftSideValues.middle * scale}px` }}>
            {/* Labels */}
            <div className="absolute" style={{ right: '130px', top: '0px' }}>
              <div className="flex items-center">
                <div className="w-3 h-0 border-t-8 border-t-black border-l-8 border-l-transparent"></div>
                <span className="font-bold">13 3/8</span>
              </div>
            </div>
            
            {/* Left rectangle (prévu) */}
            <div 
              className="absolute bg-green-500" 
              style={{ width: '15px', height: '100%', left: '-15px' }}
            ></div>
            
            {/* Right rectangle (réel) */}
            <div 
              className="absolute" 
              style={{ 
                width: '15px', 
                height: `${(rightSideValues.middle / leftSideValues.middle) * 100}%`, 
                right: '-15px',
                backgroundColor: getColor(leftSideValues.middle, rightSideValues.middle)
              }}
            ></div>
          </div>
          
          {/* Bottom section */}
          <div className="relative border-b-2 border-dotted border-gray-500" style={{ height: `${leftSideValues.bottom * scale}px` }}>
            {/* Labels */}
            <div className="absolute" style={{ right: '130px', top: '0px' }}>
              <div className="flex items-center">
                <div className="w-3 h-0 border-t-8 border-t-black border-l-8 border-l-transparent"></div>
                <span className="font-bold">9 3/8</span>
              </div>
            </div>
            
            {/* Left bar */}
            <div 
              className="absolute bg-black" 
              style={{ width: '15px', height: '15px', left: '-15px', bottom: '0px' }}
            ></div>
            
            {/* Right bar */}
            <div 
              className="absolute bg-black" 
              style={{ width: '15px', height: '15px', right: '-15px', bottom: '0px' }}
            ></div>
            
            {/* Objectifs label */}
            <div className="absolute" style={{ right: '130px', top: '20px' }}>
              <span className="font-bold">Objectifs</span>
            </div>
          </div>
          
          {/* Dv3 section */}
          <div className="relative border-b-0" style={{ height: `${leftSideValues.dv3 * scale}px` }}>
            {/* Labels */}
            <div className="absolute" style={{ right: '130px', top: '0px' }}>
              <span className="font-bold">Dv3</span>
            </div>
            
            {/* Blue line */}
            <div className="absolute bg-blue-500 h-px" style={{ width: '80%', left: '10%', top: '50%' }}></div>
            
            {/* Left rectangle indicator */}
            <div 
              className="absolute bg-gray-300" 
              style={{ width: '30px', height: '6px', left: '-45px', top: 'calc(50% - 3px)' }}
            ></div>
            
            {/* Right rectangle indicator */}
            <div 
              className="absolute" 
              style={{ 
                width: '30px', 
                height: '6px', 
                right: '-45px', 
                top: 'calc(50% - 3px)',
                backgroundColor: getColor(leftSideValues.dv3, rightSideValues.dv3)
              }}
            ></div>
          </div>
          
          {/* Dv2 section */}
          <div className="relative border-b-0" style={{ height: `${leftSideValues.dv2 * scale}px` }}>
            {/* Labels */}
            <div className="absolute" style={{ right: '130px', top: '0px' }}>
              <span className="font-bold">Dv2</span>
            </div>
            
            {/* Blue line */}
            <div className="absolute bg-blue-500 h-px" style={{ width: '80%', left: '10%', top: '50%' }}></div>
            
            {/* Left rectangle indicator */}
            <div 
              className="absolute bg-gray-300" 
              style={{ width: '30px', height: '6px', left: '-45px', top: 'calc(50% - 3px)' }}
            ></div>
            
            {/* Right rectangle indicator */}
            <div 
              className="absolute" 
              style={{ 
                width: '30px', 
                height: '6px', 
                right: '-45px', 
                top: 'calc(50% - 3px)',
                backgroundColor: getColor(leftSideValues.dv2, rightSideValues.dv2)
              }}
            ></div>
          </div>
          
          {/* Dv1 section */}
          <div className="relative border-b-0" style={{ height: `${leftSideValues.dv1 * scale}px` }}>
            {/* Labels */}
            <div className="absolute" style={{ right: '130px', top: '0px' }}>
              <span className="font-bold">Dv1</span>
            </div>
            
            {/* Blue line */}
            <div className="absolute bg-blue-500 h-px" style={{ width: '80%', left: '10%', top: '50%' }}></div>
            
            {/* Left rectangle indicator */}
            <div 
              className="absolute bg-gray-300" 
              style={{ width: '30px', height: '6px', left: '-45px', top: 'calc(50% - 3px)' }}
            ></div>
            
            {/* Right rectangle indicator */}
            <div 
              className="absolute" 
              style={{ 
                width: '30px', 
                height: '6px', 
                right: '-45px', 
                top: 'calc(50% - 3px)',
                backgroundColor: getColor(leftSideValues.dv1, rightSideValues.dv1)
              }}
            ></div>
          </div>
          
          {/* Ord2 section */}
          <div className="relative border-b-0" style={{ height: `${leftSideValues.ord2 * scale}px` }}>
            {/* Labels */}
            <div className="absolute" style={{ right: '130px', top: '0px' }}>
              <span className="font-bold">Ord2</span>
            </div>
            
            {/* Left rectangle indicator */}
            <div 
              className="absolute bg-gray-300" 
              style={{ width: '30px', height: '6px', left: '-45px', top: 'calc(50% - 3px)' }}
            ></div>
            
            {/* Right rectangle indicator */}
            <div 
              className="absolute" 
              style={{ 
                width: '30px', 
                height: '6px', 
                right: '-45px', 
                top: 'calc(50% - 3px)',
                backgroundColor: getColor(leftSideValues.ord2, rightSideValues.ord2)
              }}
            ></div>
          </div>
          
          {/* Ord1 section */}
          <div className="relative" style={{ height: `${leftSideValues.ord1 * scale}px` }}>
            {/* Labels */}
            <div className="absolute" style={{ right: '130px', top: '0px' }}>
              <span className="font-bold">Ord1</span>
            </div>
            
            {/* Left rectangle indicator */}
            <div 
              className="absolute bg-gray-300" 
              style={{ width: '30px', height: '6px', left: '-45px', top: 'calc(50% - 3px)' }}
            ></div>
            
            {/* Right rectangle indicator */}
            <div 
              className="absolute" 
              style={{ 
                width: '30px', 
                height: '6px', 
                right: '-45px', 
                top: 'calc(50% - 3px)',
                backgroundColor: getColor(leftSideValues.ord1, rightSideValues.ord1)
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Légende */}
      <div className="mt-6 p-4 border rounded-md">
        <h3 className="font-bold mb-2">Légende:</h3>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span>Prévu (côté gauche)</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
          <span>Réel dans les normes (≤ 5% de dépassement)</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-orange-400 mr-2"></div>
          <span>Dépassement modéré (5-15%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 mr-2"></div>
          <span>Dépassement important ({'>'}15%)</span>
        </div>
      </div>
    </div>
  );
};

export default PuitOp;