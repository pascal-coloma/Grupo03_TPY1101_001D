import FormPaciente from '@/components/user/FormPaciente';
import { useForm } from 'react-hook-form';
import { FormUsuario } from '../../../shared/types/types';
import DEFAULT_VALUES from '@/constants/defaultValues';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ControlVitales from '@/components/user/ControlVitales';
import PreInforme from '@/components/user/PreInforme';
import Cronologia from '@/components/user/Cronologia';
import styles from '@/styles/globalStyles';
import { useDespachos } from '@/context/DespachosContext';
import { usePacientes } from '@/context/PacienteContext';

const RegistrarAtencion = () => {
  const { despachoActivo, actualizarDespacho } = useDespachos();
  const { buscarPaciente, agregarPaciente } = usePacientes();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUsuario>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: FormUsuario) => {
    const existe = buscarPaciente(data.rut);
    if (!existe) {
      agregarPaciente({
        rut: data.rut,
        pnombre: data.primerNombre,
        snombre: data.segundoNombre,
        apaterno: data.apellidoPaterno,
        amaterno: data.apellidoMaterno,
        edad: data.edad,
        telefono: data.telefono,
      });
    }

    if (despachoActivo) {
      actualizarDespacho(despachoActivo.id, {
        rutPaciente: data.rut,
        nombrePaciente: `${data.primerNombre} ${data.apellidoPaterno}`,
        edad: data.edad,
        estado: 'completado',
      });
    }

    reset();
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <FormPaciente control={control} errors={errors} />
          <ControlVitales control={control} errors={errors} />
          <PreInforme control={control} errors={errors} />
          <Cronologia control={control} errors={errors} />
        </ScrollView>

        <View style={local.botonesContainer}>
          <TouchableOpacity style={[styles.button, local.botonLimpiar]} onPress={() => reset()}>
            <Text style={local.botonLimpiarTexto}>Limpiar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, local.botonEnviar]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Registrar atención</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const local = StyleSheet.create({
  botonesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  botonEnviar: {
    flex: 2,
  },
  botonLimpiar: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#E53935',
  },
  botonLimpiarTexto: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RegistrarAtencion;
