import React, { useState, useEffect } from "react";

function Storagebar({ files }) {
  const [usedStorage, setUsedStorage] = useState(0); // GB usados
  const totalStorage = 5; // GB totales

  useEffect(() => {
    calculateUsedStorage(); // Calcular al cargar o cuando cambien los archivos
  }, [files]);

  function calculateUsedStorage() {
    let usedStorageCalc = 0;

    if (Array.isArray(files)) {
      files.forEach(file => {
        if (file.size) {
          usedStorageCalc += file.size;
        }
      });
    }

    // Convertir de bytes a GB (1 GB = 1024^3 bytes)
    const usedInGB = usedStorageCalc / (1024 * 1024 * 1024);
    setUsedStorage(usedInGB);
  }

  const usagePercentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="p-3">
      <p>Almacenamiento usado: {usedStorage.toFixed(2)} GB de {totalStorage} GB</p>
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
