import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, View } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
      } else {
        const system = Appearance.getColorScheme() ?? "light";
        setTheme(system);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    await AsyncStorage.setItem("theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <View className={theme} style={{ flex: 1 }}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
