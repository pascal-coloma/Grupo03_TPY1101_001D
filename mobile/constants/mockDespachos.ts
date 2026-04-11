const DESPACHOS: Despacho[] = [
  { id: '1', paciente: 'Juan Pérez', destino: 'Hospital Central', estado: 'pendiente' },
  { id: '2', paciente: 'María López', destino: 'Clínica Sur', estado: 'activo' },
  { id: '3', paciente: 'Carlos Ruiz', destino: 'Hospital Norte', estado: 'completado' },
  { id: '4', paciente: 'Ana Gómez', destino: 'Clínica Este', estado: 'pendiente' },
];


export type Despacho ={
    id: string;
    paciente: string;
    destino: string;
    estado: 'pendiente' | 'activo' | 'completado';
}

export default DESPACHOS;