import styles from '@/styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const CARD_COLORS = {
  despachos: '#E53935',
  atencion: '#1565C0',
  pacientes: '#1976D2',
};

const UserActions = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={style.title}>Acciones Rápidas</Text>
        <View style={style.cardsRow}>
          <Link href={'/(user)/Despachos'} style={style.linkStyle}>
            <View style={[style.card, { backgroundColor: CARD_COLORS.despachos }]}>
              <MaterialIcons name="airport-shuttle" size={50} color="white" />
              <View>
                <Text style={style.cardTitle}>Despachos</Text>
                <Text style={style.cardSubtitle}>Ver despachos activos</Text>
              </View>
            </View>
          </Link>
          <Link href={'/(user)/RegistrarAtencion'} style={style.linkStyle}>
            <View style={[style.card, { backgroundColor: CARD_COLORS.atencion }]}>
              <MaterialIcons name="person" size={50} color="#f8f6f6" />
              <View>
                <Text style={[style.cardTitle]}>Registrar Atencion</Text>
                <Text style={[style.cardSubtitle]}>
                  Ficha prehospitalaria
                </Text>
              </View>
            </View>
          </Link>
          <Link href={'/(user)/ListaPacientes'} style={style.linkStyleFull}>
            <View style={[style.card, { backgroundColor: CARD_COLORS.pacientes }]}>
              <MaterialIcons name="people" size={50} color="white" />
              <View>
                <Text style={style.cardTitle}>Pacientes</Text>
                <Text style={style.cardSubtitle}>Historial de pacientes</Text>
              </View>
            </View>
          </Link>
        </View>
      </View>
    </>
  );
};

export default UserActions;

const style = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10,
  },
  cardsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    flexWrap: 'wrap',
  },
  linkStyle: {
    flex: 1,
  },
  card: {
    borderRadius: 20,
    width: '100%',
    flex: 1,
    gap: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  linkStyleFull: {
    width: '50%',
  },
});
