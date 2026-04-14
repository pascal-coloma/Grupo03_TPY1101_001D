import { useState } from 'react';
import { Personal } from '../../shared/types/types';

const usePersonal = () => {
  const [personal, setPersonal] = useState<Personal[]>([
    { id: '1', nombre: 'Dr. García', rol: 'Médico', disponible: true },
    { id: '2', nombre: 'Enf. Martínez', rol: 'Enfermero', disponible: true },
    { id: '3', nombre: 'Cho. Rodríguez', rol: 'Chofer', disponible: false },
  ]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch('/api/personal').then(r => r.json()).then(setPersonal).finally(() => setLoading(false));
  // }, []);

  return { personal, loading };
};

export default usePersonal;
