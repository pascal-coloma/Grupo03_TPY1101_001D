import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
const AdminHeader = () => {
    return (<>

        <View style={styles.container}>
            <View style={styles.left}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>A</Text>
                </View>
                <View>
                    <Text style={styles.welcome}>Bienvenido,</Text>
                    <Text style={styles.role}>Administrador</Text>
                </View>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.right}>
                <MaterialIcons name="notifications-none" size={24} color="#000" />
                <MaterialIcons name="settings" size={24} color="#000" />
            </View>
        </View>

    </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E53935',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    welcome: {
        fontSize: 12,
        color: '#666',
    },
    role: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    right: {
        flexDirection: 'row',
        gap: 16,
    },
})


export default AdminHeader;