import { Personal } from './mockPersonal';

const DESPACHOS: Despacho[] = [
  {
    id: '1',
    paciente: 'Juan Pérez',
    destino: 'Hospital Central',
    estado: 'pendiente',
    personal: [],
  },
  { id: '2', paciente: 'María López', destino: 'Clínica Sur', estado: 'activo', personal: [] },
  {
    id: '3',
    paciente: 'Carlos Ruiz',
    destino: 'Hospital Norte',
    estado: 'completado',
    personal: [],
  },
  { id: '4', paciente: 'Ana Gómez', destino: 'Clínica Este', estado: 'pendiente', personal: [] },
];

export type Despacho = {
  id: string;
  paciente: string;
  destino: string;
  estado: 'pendiente' | 'activo' | 'completado';
  personal: Personal[];
};

export default DESPACHOS;
