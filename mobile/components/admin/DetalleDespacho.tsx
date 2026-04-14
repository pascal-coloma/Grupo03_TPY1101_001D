import styles from '@/styles/globalStyles';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Despacho } from '@/constants/mockDespachos';
import { useState } from 'react';
import AsignarPersonalModal from './AsignarPersonalModal';

const estadoColors: Record<Despacho['estado'], string> = {
  activo: '#22c55e',
  pendiente: '#ef4444',
  completado: '#eab308',
};

const DetalleDespacho = ({ despacho }: { despacho: Despacho }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={[styles.container]}>
        <Text style={[styles.title, { marginBottom: 2 }]}>DSP-{despacho.id}</Text>
        <View>
          <Text style={[styles.subtitle, { marginTop: 2 }, { fontWeight: 'bold' }]}>
            Av. Argentina{` -> `}
            {despacho.destino}
          </Text>
          <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>
            Paciente: {despacho.paciente}
          </Text>
          <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>
            Estado:{' '}
            <Text style={{ color: estadoColors[despacho.estado] }}>
              {despacho.estado[0].toUpperCase() + despacho.estado.slice(1)}
            </Text>
          </Text>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <TouchableOpacity style={style.btnAsignar} onPress={() => setModalVisible(true)}>
            <Text style={[{ color: 'white', fontWeight: 'bold', fontSize: 16 }]}>Asignar</Text>
          </TouchableOpacity>
        </View>
        <AsignarPersonalModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAsignar={(personal) => {
            console.log('Asignado:', personal);
            // acá irá la lógica de asignación
          }}
        />
        <View style={style.divisor}></View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  divisor: {
    height: 1,
    backgroundColor: 'grey',
    width: '100%',
    marginTop: 10,
  },
  btnAsignar: {
    backgroundColor: '#e60303',
    padding: 8,
    borderRadius: 10,
  },
});
export default DetalleDespacho;
