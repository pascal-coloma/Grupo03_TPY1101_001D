import styles from '@/styles/globalStyles';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DESPACHOS from '@/constants/mockDespachos';
import DetalleDespacho from './DetalleDespacho';

const FILTROS = [
  { label: 'Todos', value: 'todos' },
  { label: 'Pendientes', value: 'pendiente' },
  { label: 'Activos', value: 'activo' },
  { label: 'Completados', value: 'completado' },
];

const ListaDespachos = () => {
  const [activeFilter, setActiveFilter] = useState('todos');

  const despachosFiltrados =
    activeFilter == 'todos' ? DESPACHOS : DESPACHOS.filter((d) => d.estado == activeFilter);

  return (
    <>
      <View style={styles.container}>
        <View style={style.filtros}>
          {FILTROS.map((filtro) => (
            <TouchableOpacity onPress={() => setActiveFilter(filtro.value)}>
              <View>
                <Text style={activeFilter == filtro.value ? style.pillActive : style.pillInactive}>
                  {filtro.label}
                </Text>
                {filtro.value === activeFilter && <View style={style.underline} />}
              </View>
              
            </TouchableOpacity>
          ))}
        </View>
        <View style={style.divisor}></View>
        <View>
          {despachosFiltrados.map((desp) => (
            <DetalleDespacho key={desp.id} despacho={desp} />
          ))}
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  filtros: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  divisor:{
    height:1,
    width: '100%',
    backgroundColor: '#5a444452'
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

export default ListaDespachos;
