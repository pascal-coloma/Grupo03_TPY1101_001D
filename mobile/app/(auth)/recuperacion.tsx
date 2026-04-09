import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const RecuperarContrasena = () => {

    const [email, setEmail] = useState('');

    function enviarCorreo() {
        // TODO: redirigir a recuperación del back
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recupera tu contraseña</Text>
            <Text style={styles.subtitle}>Ingresa el correo registrado y recibirás una nueva contraseña para recuperar tu acceso.</Text>

            <TextInput
                style={styles.input}
                placeholder="Ingresa tu correo"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={newEmail => setEmail(newEmail)}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={enviarCorreo}>Recuperar contraseña</Text>
            </TouchableOpacity>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    forgotPassword: {
        color: '#E53935',
        textAlign: 'right',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#E53935',
        padding: 16,
        borderRadius: 24,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});



export default RecuperarContrasena;