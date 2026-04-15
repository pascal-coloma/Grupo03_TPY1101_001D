import styles from '@/styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Panel = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Panel de Control</Text>
        </View>
        <Link href={'/(admin)/RegistrarPaciente'} style={style.linkStyle}>
          <View style={style.attentionCard}>
            <MaterialIcons name="person" size={50} color="#372121" />
            <View>
              <Text style={[style.cardTitle, { color: '#372121' }]}>Registrar Paciente</Text>
              <Text style={[style.cardSubtitle, { color: '#c17575' }]}>
                Inventario, personal y despachos
              </Text>
            </View>
          </View>
        </Link>
      </View>
    </>
  );
};

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
  linkStyle: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 10,
  },
  dispatchCard: {
    backgroundColor: '#E53935',
    borderRadius: 20,
    width: '100%',
    flex: 1,
    gap: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  attentionCard: {
    backgroundColor: '#dfacab5b',
    borderRadius: 20,
    width: '100%',
    flex: 1,
    gap: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default Panel;
