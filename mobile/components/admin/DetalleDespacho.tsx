import styles from '@/styles/globalStyles';
import { StyleSheet, Text, View } from 'react-native';
import { Despacho } from '@/constants/mockDespachos';

const DetalleDespacho = ({ despacho }: { despacho: Despacho }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.title, { marginBottom: 2 }]}>DSP-{despacho.id}</Text>
        <View>
          <Text style={[styles.subtitle, { marginTop: 2 }]}>
            Av. Argentina{` -> `}
            {despacho.destino}
          </Text>
          <Text style={styles.subtitle}>Paciente: {despacho.paciente}</Text>
          <Text style={styles.subtitle}>Estado: {despacho.estado}</Text>
        </View>
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
  },
});
export default DetalleDespacho;
