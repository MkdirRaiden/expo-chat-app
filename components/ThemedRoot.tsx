import { Slot } from "expo-router";
import { Platform, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import "../global.css";

export default function ThemedRoot() {
  const { theme } = useTheme();
  const statusBarColor = theme === "dark" ? "#1f2937" : "#ffffff";

  return (
    <View style={{ flex: 1 }}>
      {/* Fill notch/top space with background matching theme */}
      {(Platform.OS === "android" || Platform.OS === "ios") && (
        <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: statusBarColor,
          }}
        />
      )}

      <StatusBar
        translucent={false}
        backgroundColor={statusBarColor}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      <SafeAreaView
        style={{ flex: 1 }}
        className="flex-1 bg-white dark:bg-neutral-900"
        edges={["bottom", "left", "right"]}
      >
        <Slot />
      </SafeAreaView>
    </View>
  );
}
