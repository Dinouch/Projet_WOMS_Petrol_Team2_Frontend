import React from 'react';

export default function MirroredRectangles() {
  // Dimensions des rectangles - tailles triplées
  const heights = {
    small: 48,     // Hauteur du petit rectangle (16×3)
    medium: 96,    // Hauteur du rectangle moyen (32×3)
    large: 192,    // Hauteur du grand rectangle (64×3)
    horizontal: 18  // Hauteur des rectangles horizontaux (6×3)
  };
  
  const widths = {
    vertical: 21,       // Largeur des rectangles verticaux (7×3)
    horizontal: 48     // Largeur des rectangles horizontaux (16×3)
  };
  
  const spacings = {
    betweenSections: 1,  // Espacement triplé entre les groupes (8×3)
    betweenItems: 12,     // Espacement triplé entre les rectangles (4×3)
    centerGap1: 135,      // Espace horizontal réduit (en px au lieu de rem)
    centerGap2: 78        // Espace horizontal réduit (en px au lieu de rem)
  };

  // Propriétés des connexions en U
  const connectorThickness = 10; // Épaisseur de la ligne de connexion

  return (
    <div className="flex flex-col items-center w-full p-16 bg-white">
      {/* Premier groupe avec effet miroir */}
      <div className="flex justify-center w-full"  style={{height: `210px`}}>
        {/* Côté gauche - rectangles jaunes */}
        <div className="flex">
          {/* Colonne de textes */}
          <div className="flex flex-col mr-4 pl-4">
            <p className="text-lg font-medium" style={{height: `${heights.small}px`}}>20"</p>
            <p className="text-lg font-medium" style={{height: `${heights.medium}px`}}>13"</p>
            <p className="text-lg font-medium" style={{height: `${heights.large}px`}}>9"</p>
          </div>
          
          {/* Rectangles jaunes collés */}
          <div className="flex flex-row items-start">
            <div className="bg-yellow-400 border border-black" style={{width: `${widths.vertical}px`, height: `${heights.small}px`}}></div>
            <div className="bg-yellow-400 border border-black" style={{width: `${widths.vertical}px`, height: `${heights.medium}px`}}></div>
            <div className="bg-yellow-400 border border-black flex flex-col justify-end" style={{width: `${widths.vertical}px`, height: `${heights.large}px`}}>
                          <div className="bg-black border border-black ml-5" style={{width: `${widths.horizontal-12}px`, height: `${connectorThickness+3}px`}}></div>
            </div>
          </div>
        </div>
        
        {/* Espace central */}
        <div className='flex justify-center items-end'style={{width: `${spacings.centerGap1}px`, height:`150px`}}>
          <h3 className="text-2xl font-medium">Brine</h3>
        </div>
        
        {/* Côté droit - effet miroir en vert */}
        <div className="flex">
          {/* Rectangles verts collés */}
          <div className="flex flex-row items-start">
            <div className=" border  flex flex-col justify-end" style={{width: `${widths.vertical}px`, height: `${heights.large}px`}}>
                            <div className="bg-black border border-black ml-[-37px]" style={{width: `${widths.horizontal-12}px`, height: `${connectorThickness+3}px`}}></div>
            </div>
            <div className=" border-black" style={{width: `${widths.vertical}px`, height: `${heights.medium}px`}}></div>
            <div className="bg-green-400 border border-black " style={{width: `${widths.vertical}px`, height: `${heights.small}px`}}></div>
          </div>
          
        </div>
      </div>
      
      {/* Titre Objectifs */}
      <div className="flex justify-between w-1/2 mb-12" style={{height: `${spacings.betweenSections}px`}}>
        <h3 className="text-3xl font-bold">Objectifs</h3>
      </div>
      
      {/* Deuxième groupe avec effet miroir */}
      <div className="flex justify-center w-full relative">
        {/* Côté gauche - rectangles jaunes */}
        <div className="flex flex-col space-y-2 mb-8">
          <div className="flex items-center" id="connector-start-1">
            <p className="mr-6 text-lg font-medium">DV3</p>
            <div className="bg-yellow-400 border border-black" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
          <div className="flex items-center" id="connector-start-2">
            <p className="mr-6 text-lg font-medium">DV2</p>
            <div className="bg-yellow-400 border border-black" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
          <div className="flex items-center" id="connector-start-3">
            <p className="mr-7 text-lg font-medium">DV1</p>
            <div className="bg-yellow-400 border border-black" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
        </div>
        
        {/* Espace central avec connexions en U */}
        <div className="relative z-10" style={{width: `${spacings.centerGap2}px`}}>
          {/* Connexion en U pour la première paire */}
          <div className="absolute" style={{
            top: '-78px',
            left: '-2px',
            width: '105%',
            height: '270px',
            borderBottom: `${connectorThickness}px solid black`,
            borderLeft: `${connectorThickness}px solid black`,
            borderRight: `${connectorThickness}px solid black`
          }}></div>
          
        </div>
        
        {/* Côté droit - effet miroir en vert */}
        <div className="flex flex-col space-y-5 mb-8">
          <div className="flex items-center" id="connector-end-1">
            <div className="" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
          <div className="flex items-center" id="connector-end-2">
            <div className="" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
          <div className="flex items-center" id="connector-end-3">
            <div className="" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
        </div>
      </div>
      
      {/* Troisième groupe avec effet miroir */}
      <div className="flex justify-center w-full relative">
        {/* Côté gauche - rectangles jaunes */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <p className="mr-5 text-lg font-medium">Ord2</p>
            <div className="bg-yellow-400 border border-black" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
          <div className="flex items-center">
            <p className="mr-6 text-lg font-medium">Ord1</p>
            <div className="bg-yellow-400 border border-black" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
        </div>
        
        {/* Espace central avec connexions en U */}
        <div  style={{width: `${spacings.centerGap2}px`}}>
        </div>
        
        {/* Côté droit - effet miroir en vert */}
        <div className="flex flex-col space-y-5 mt-1">
          <div className="flex items-center">
            <div className="" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
          <div className="flex items-center">
            <div className="" style={{width: `${widths.horizontal}px`, height: `${heights.horizontal}px`}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}