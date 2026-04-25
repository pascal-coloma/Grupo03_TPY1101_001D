import { useDespachos } from '@/context/DespachosContext';
import styles from '@/styles/globalStyles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const estadoColors: Record<string, string> = {
  activo: '#22c55e',
  pendiente: '#ef4444',
  completado: '#eab308',
};
const FILTROS = [
  { label: 'Activos', value: 'activo' },
  { label: 'Completados', value: 'completado' },
];
const ListaDespachosUser = () => {
  const { despachos, seleccionarDespacho } = useDespachos();
  const [activeFilter, setActiveFilter] = useState('activo');
  const router = useRouter();

  const despachosFiltrados = despachos.filter((d) => d.estado === activeFilter);
  const handleSeleccionar = (id: string) => {
    seleccionarDespacho(id);
    router.push('/(user)/RegistrarAtencion');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={local.filtros}>
          {FILTROS.map((filtro) => (
            <TouchableOpacity key={filtro.label} onPress={() => setActiveFilter(filtro.value)}>
              <View>
                <Text style={activeFilter === filtro.value ? local.pillActive : local.pillInactive}>
                  {filtro.label}
                </Text>
                {filtro.value === activeFilter && <View style={local.underline} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={local.divisor} />
      </View>
      <ScrollView>
        {despachosFiltrados.length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.subtitle}>No hay despachos activos</Text>
          </View>
        ) : (
          despachosFiltrados.map((desp) => (
            <TouchableOpacity key={desp.id} onPress={() => handleSeleccionar(desp.id)}>
              <View style={styles.container}>
                <Text style={[styles.title, { marginBottom: 2 }]}>DSP-{desp.id}</Text>
                <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>
                  {desp.origen} {'->'} {desp.destino}
                </Text>
                <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>
                  Paciente: {desp.nombrePaciente}
                </Text>
                <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>
                  Estado:{' '}
                  <Text style={{ color: estadoColors[desp.estado] }}>
                    {desp.estado[0].toUpperCase() + desp.estado.slice(1)}
                  </Text>
                </Text>
                <View style={local.divisor} />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </>
  );
};

const local = StyleSheet.create({
  divisor: {
    height: 1,
    backgroundColor: 'grey',
    width: '100%',
    marginTop: 10,
  },
  filtros: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 5,
  },
  pillActive: {
    color: '#E53935',
  },
  pillInactive: {
    color: 'grey',
  },
  underline: {
    height: 2,
    backgroundColor: '#E53935',
    borderRadius: 2,
    marginTop: 4,
  },
});

export default ListaDespachosUser;
