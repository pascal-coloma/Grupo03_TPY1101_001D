import { usePacientes } from '@/context/PacienteContext';
import styles from '@/styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ListaPacientes = () => {
  const { pacientes } = usePacientes();
  const [busqueda, setBusqueda] = useState('');

  const pacientesFiltrados = busqueda.trim()
    ? pacientes.filter((p) => p.rut.toLowerCase().includes(busqueda.toLowerCase()))
    : pacientes;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={local.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Pacientes</Text>        
          </View>

        <TextInput
          style={local.buscador}
          placeholder="Buscar por RUT..."
          value={busqueda}
          onChangeText={setBusqueda}
          keyboardType="default"
        />
      </View>

      <ScrollView>
        {pacientesFiltrados.length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.subtitle}>No se encontraron pacientes</Text>
          </View>
        ) : (
          pacientesFiltrados.map((p) => (
            <View key={p.rut} style={styles.container}>
              <Text style={styles.title}>
                {p.pnombre} {p.snombre ?? ''} {p.apaterno} {p.amaterno}
              </Text>
              <Text style={styles.subtitle}>RUT: {p.rut}</Text>
              <Text style={styles.subtitle}>Edad: {p.edad} años</Text>
              <Text style={styles.subtitle}>Teléfono: {p.telefono}</Text>
              <View style={local.divisor} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const local = StyleSheet.create({
  buscador: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginTop: 8,
  },
  divisor: {
    height: 1,
    backgroundColor: '#eee',
    width: '100%',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 10,
  },
});

export default ListaPacientes;