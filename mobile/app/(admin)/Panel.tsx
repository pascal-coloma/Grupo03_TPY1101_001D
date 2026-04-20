import styles from '@/styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mockAmbulancias } from '@/constants/mockAmbulancia';
import { ScrollView } from 'react-native';
import { useDespachos } from '@/context/DespachosContext';
import { usePersonal } from '@/context/PersonalContext';

const Panel = () => {
  const { despachos } = useDespachos();
  const { personal } = usePersonal();
  const totalDespachos = despachos.length;
  const movilesActivos = mockAmbulancias.filter((p) => p.disponible).length;
  const personalActivo = personal.filter((p) => p.disponible).length;

  return (
    <>
      <View style={styles.container}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Panel de Control</Text>
        </View>
      </View>
      <View style={[{ flexDirection: 'row', gap: 10, padding: 10 }]}>
        <View style={style.statCard}>
          <Text style={style.cardTitle}>Despachos hoy</Text>
          <Text style={style.cardSubtitle}>{totalDespachos}</Text>
        </View>
        <View style={style.statCard}>
          <Text style={style.cardTitle}>Moviles disponibles</Text>
          <Text style={style.cardSubtitle}>{movilesActivos}</Text>
        </View>
      </View>
      <View style={[{ flexDirection: 'row', gap: 10, padding: 10 }]}>
        <View style={[style.personalCard]}>
          <Text style={style.cardTitle}>Personal activo</Text>
          <Text style={style.cardSubtitle}>{personalActivo}</Text>
        </View>
        <View style={[style.personalCard]}>
          <Text style={style.cardTitle}>Personal activo</Text>
          <Text style={style.cardSubtitle}>{personalActivo}</Text>
        </View>
      </View>
      <Text style={style.title}>Acciones Rapidas</Text>
      <View style={[{ flexDirection: 'row', gap: 10, padding: 10 }]}>
        <Link href={'/(admin)/RegistrarPaciente'} style={style.linkStyle}>
          <View style={style.patientCard}>
            <MaterialIcons name="person" size={40} color="#372121" />
            <View style={{ padding: 5 }}>
              <Text style={[style.cardTitle, { color: '#372121' }]}>Registrar Paciente</Text>
              <Text>Nuevo llamado - crear despacho </Text>
            </View>
          </View>
        </Link>
      </View>
      <View style={[{ flexDirection: 'row', gap: 10, padding: 10 }]}>
        <Link href={'/(admin)/Despachos'} style={style.linkStyle}>
          <View style={style.patientCard}>
            <MaterialIcons name="airport-shuttle" size={40} color="#372121" />
            <View style={{ padding: 5 }}>
              <Text style={[style.cardTitle, { color: '#372121' }]}>Ver Despachos</Text>
              <Text>Lista de despachos </Text>
            </View>
          </View>
        </Link>
      </View>
      <View style={[{ flexDirection: 'row', gap: 10, padding: 10 }]}>
        <Link href={'/(admin)/Despachos'} style={style.linkStyle}>
          <View style={style.patientCard}>
            <MaterialIcons name="inventory" size={40} color="#372121" />
            <View style={{ padding: 5 }}>
              <Text style={[style.cardTitle, { color: '#372121' }]}>Inventario</Text>
              <Text>Gestion de Inventario</Text>
            </View>
          </View>
        </Link>
      </View>
      <Text style={style.title}>Despachos Activos</Text>
    </>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
  },
  cardTitle: {
    color: 'white',
    fontWeight: 'medium',
    fontSize: 18,
  },
  cardSubtitle: {
    color: 'white',
    fontWeight: 'light',
    fontSize: 35,
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
  statCard: {
    backgroundColor: '#db2421',
    borderRadius: 20,
    flex: 1,
    gap: 10,
    padding: 10,
  },
  personalCard: {
    backgroundColor: '#ddcfcf',
    borderRadius: 20,
    flex: 1,
    gap: 10,
    padding: 10,
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
  patientCard: {
    backgroundColor: '#dfacab5b',
    borderRadius: 20,
    gap: 10,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Panel;
