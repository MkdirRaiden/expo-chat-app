import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const HeaderWithThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleToggle = () => {
    toggleTheme();
    setDropdownOpen(false);
  };
  return (
    <View
      className={`relative z-50 flex-row items-center justify-between px-4 py-2 border-b ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-300"
      }`}
    >
      {/* Logo */}
      <Link href="/" asChild>
        <Pressable className="flex-row items-center gap-1">
          <Text
            className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Chat
          </Text>
          <FontAwesome name="comment" size={24} color={"#1E90FF"} />
        </Pressable>
      </Link>

      {/* Avatar and Dropdown */}
      <View className="relative">
        <Pressable onPress={() => setDropdownOpen(!dropdownOpen)}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme === "dark" ? "#4B5563" : "#D1D5DB",
            }}
          />
        </Pressable>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <View
            className={`absolute right-0 top-12 shadow-lg z-9999 p-6 rounded-md min-w-40 ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <Pressable
              onPress={handleToggle}
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View>
                <FontAwesome
                  name={theme === "dark" ? "sun-o" : "moon-o"}
                  size={20}
                  color={theme === "dark" ? "#fff" : "#000"}
                />
              </View>
              <Text
                style={{
                  color: theme === "dark" ? "#fff" : "#000",
                  fontSize: 14,
                }}
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default HeaderWithThemeToggle;
