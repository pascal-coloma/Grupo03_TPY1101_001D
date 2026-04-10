import { StyleSheet, Text, View } from "react-native";
import styles from "@/styles/globalStyles";

const DispatchCard = () => {

    return (
        <View style={styles.container}>
            <View style={styles.redCard}>
                <Text style={styles.redCardTitle}>Despachos Activos</Text>
                <Text style={styles.dispNumb}>4</Text>
                <View style={styles.redCardPills}>
                    <Text style={styles.pill}> 2 pendientes</Text>
                    <Text style={styles.pill}> 1 en curso </Text>
                </View>
            </View>
        </View>
    )

}


export default DispatchCard;