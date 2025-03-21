import React, { useState } from "react";

function Storagebar() {
  const [usedStorage, setUsedStorage] = useState(25); // GB usados
  const totalStorage = 100; // GB totales

  const usagePercentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="p-3">
      <p>Almacenamiento usado: {usedStorage}GB de {totalStorage}GB</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${usagePercentage}%` }}
        >
          {Math.round(usagePercentage)}%
        </div>
      </div>
    </div>
  );
}

export default Storagebar;
