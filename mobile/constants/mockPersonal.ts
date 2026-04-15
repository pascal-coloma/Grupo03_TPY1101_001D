export type Personal = {
  id: string;
  nombre: string;
  rol: 'Médico' | 'Enfermero/a' | 'Técnico Paramédico' | 'Conductor';
  disponible: boolean;
};

const PERSONAL: Personal[] = [
  { id: '1', nombre: 'Dr. Ignacio García', rol: 'Médico', disponible: true },
  { id: '2', nombre: 'Dra. Valentina Soto', rol: 'Médico', disponible: false },
  { id: '3', nombre: 'Enf. Camila Martínez', rol: 'Enfermero/a', disponible: true },
  { id: '4', nombre: 'Enf. Sebastián Rojas', rol: 'Enfermero/a', disponible: true },
  { id: '5', nombre: 'TM. Francisca Núñez', rol: 'Técnico Paramédico', disponible: true },
  { id: '6', nombre: 'TM. Diego Fuentes', rol: 'Técnico Paramédico', disponible: false },
  { id: '7', nombre: 'TM. Javiera Morales', rol: 'Técnico Paramédico', disponible: true },
  { id: '8', nombre: 'Cond. Luis Rodríguez', rol: 'Conductor', disponible: true },
  { id: '9', nombre: 'Cond. Patricio Vega', rol: 'Conductor', disponible: false },
  { id: '10', nombre: 'Cond. Andrea Castillo', rol: 'Conductor', disponible: true },
];

export default PERSONAL;
