import { Text, View, Button } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button 
        onPress={() => {
          console.log("You tapped the button!");
        }}
        title="Press Me"
      />
    </View>
  );
}
