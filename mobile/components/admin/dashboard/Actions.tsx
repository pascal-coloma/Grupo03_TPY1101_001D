import styles from '@/styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const Actions = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={style.title}>Acciones Rápidas</Text>
        <View style={style.cardsRow}>
          <View style={style.dispatchCard}>
            <MaterialIcons name="airport-shuttle" size={50} color="white" />
            <View>
              <Text style={style.cardTitle}>Despachos</Text>
              <Text style={style.cardSubtitle}>Ver despachos activos</Text>
            </View>
          </View>
          <View style={style.attentionCard}>
            <MaterialIcons name="assignment" size={50} color="#372121" />{' '}
            <View>
            <Text style={[style.cardTitle, { color: '#372121' }]}>Atención</Text>
            <Text style={[style.cardSubtitle, {color: '#c17575'}]}>
                Registrar Ficha
            </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Actions;

const style = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontWeight: 'medium',
    fontSize: 18,
  },
  cardSubtitle: {
    color: 'white',
    fontWeight: 'light',
    fontSize: 10,
  },
  cardsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  dispatchCard: {
    backgroundColor: '#E53935',
    flex: 1,
    borderRadius: 20,
    gap: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  attentionCard: {
    backgroundColor: '#d398975b',
    flex: 1,
    borderRadius: 20,
    gap: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
