import React, { useState } from 'react';

// Version temporaire simplifiée pour identifier le problème
const DesiredWeightSelection: React.FC<any> = ({
  onNext,
  onBack,
  data,
}) => {
  const [desiredWeight, setDesiredWeight] = useState(70);

  return (
    <div className="p-4">
      <h1>Test - Desired Weight</h1>
      <p>Poids désiré: {desiredWeight} kg</p>
      <input 
        type="range" 
        min="40" 
        max="120" 
        value={desiredWeight}
        onChange={(e) => setDesiredWeight(Number(e.target.value))}
      />
      <button onClick={() => onNext({ desiredWeight })}>
        Suivant
      </button>
      <button onClick={onBack}>
        Retour
      </button>
    </div>
  );
};

export default DesiredWeightSelection;
