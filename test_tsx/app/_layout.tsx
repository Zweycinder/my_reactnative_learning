import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
          name="index"
        />
        <Tabs.Screen
          options={{
            title: "Album",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="photo" size={size} color={color} />
            ),
          }}
          name="album"
        />
        <Tabs.Screen
          options={{
            title: "profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
          name="profile"
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
