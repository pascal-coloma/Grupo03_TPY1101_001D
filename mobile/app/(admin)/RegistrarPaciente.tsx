import FormDespacho from '@/components/admin/FormDespacho';
import FormPaciente from '@/components/admin/FormPaciente';
import { FormCompleta } from '../../../shared/types/types';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Despacho } from '@/constants/mockDespachos';
import PERSONAL from '@/constants/mockPersonal';
import { useDespachos } from '@/context/DespachosContext';
import DEFAULT_VALUES from '@/constants/defaultValues';

const RegistrarPaciente = () => {
  const { agregarDespacho, despachos } = useDespachos();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCompleta>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: FormCompleta) => {
    const nuevoDespacho: Despacho = {
      id: String(despachos.length + 1),
      rutPaciente: data.rut,
      nombrePaciente:
        `${data.primerNombre} ${data.segundoNombre ?? ''} ${data.apellidoPaterno} ${data.apellidoMaterno}`.trim(),
      edad: data.edad,
      destino: data.direccionDestino,
      origen: data.direccionOrigen,
      estado: 'pendiente',
      prioridad: data.prioridad as Despacho['prioridad'],
      tipoEmergencia: data.tipoEmergencia,
      unidad: data.unidad,
      personal: PERSONAL.filter((p) => data.equipoAsignado.includes(p.id)),
      observaciones: data.observaciones,
    };

    agregarDespacho(nuevoDespacho);
    router.back();
  };

  return (
    <ScrollView>
      <FormPaciente control={control} errors={errors} />
      <FormDespacho control={control} errors={errors} />
      <View style={style.rowBotones}>
        <TouchableOpacity style={style.btnCancelar} onPress={() => router.back()}>
          <Text style={style.btnText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btnSubmit} onPress={handleSubmit(onSubmit)}>
          <Text style={style.btnText}>Enviar despacho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  rowBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    padding: 20,
  },
  btnSubmit: {
    backgroundColor: '#e60303',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnCancelar: {
    backgroundColor: '#f1bebe',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RegistrarPaciente;
