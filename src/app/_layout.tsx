import { Stack } from "expo-router";
import { View } from "react-native";
import "../../global.css";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-surface">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0a0c18" },
        }}
      />
    </View>
  );
}
