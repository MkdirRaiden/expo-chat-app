import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import HeaderWithThemeToggle from "../../components/HeaderWithThemeToggle";
import { useTheme } from "../../context/ThemeContext";

export default function TabsLayout() {
  const { theme } = useTheme();

  const statusBarColor = theme === "dark" ? "#1f2937" : "#ffffff";
  const tabBarStyles = {
    backgroundColor: statusBarColor,
    borderTopColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
    ...(Platform.OS === "web" && {
      boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.05)",
    }),
  };

  return (
    <>
      <HeaderWithThemeToggle />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#1E90FF",
          tabBarInactiveTintColor: theme === "dark" ? "#ccc" : "#666",
          tabBarStyle: tabBarStyles,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "home",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: "chats",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="comments" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
