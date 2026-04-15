export type Personal = {
  id: string;
  nombre: string;
  rol: string;
  disponible: boolean;
};

const PERSONAL: Personal[] = [
  { id: '1', nombre: 'Dr. García', rol: 'Médico', disponible: true },
  { id: '2', nombre: 'Enf. Martínez', rol: 'Enfermero', disponible: true },
  { id: '3', nombre: 'Cho. Rodríguez', rol: 'Chofer', disponible: false },
];

export default PERSONAL;
