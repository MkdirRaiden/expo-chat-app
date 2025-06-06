import { Link } from "expo-router";
import moment from "moment";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import chats from "../../constants/chats.json";
import { useTheme } from "../../context/ThemeContext";
import { Chat } from "../../types";

export default function ChatList() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredChats = (chats as Chat[]).filter((chat) =>
    chat.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputStyle = [
    {
      padding: 12,
      borderRadius: 9999,
      fontSize: 16,
      borderWidth: 1,
      width: "100%",
    },
    theme === "dark"
      ? {
          backgroundColor: "#1F2937",
          color: "#FFFFFF",
          borderColor: isFocused ? "#60A5FA" : "#4B5563",
        }
      : {
          backgroundColor: "#FFFFFF",
          color: "#000000",
          borderColor: isFocused ? "#3B82F6" : "#D1D5DB",
        },
    ...(Platform.OS === "web"
      ? [{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" } as any]
      : []),
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className={`flex-1 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
      >
        {/* Search Input */}
        <View className="px-4 pt-4 pb-2">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search by name..."
            placeholderTextColor={theme === "dark" ? "#999" : "#666"}
            style={inputStyle}
          />
        </View>

        {/* Chat List */}
        <FlatList
          className="my-2 mx-4"
          data={filteredChats}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-8">
              No results found.
            </Text>
          }
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/chat/[id]",
                params: { id: item.id, user: item.user },
              }}
              asChild
            >
              <TouchableOpacity
                className={`p-4 border-b rounded-lg flex-row items-center gap-3 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              >
                <View className="w-16 h-16 rounded-full bg-blue-500 justify-center items-center">
                  <Text
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.user.charAt(0)}
                  </Text>
                </View>

                <View className="flex-1">
                  <Text
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                    accessibilityLabel={`Chat with ${item.user}`}
                  >
                    {item.user}
                  </Text>
                  <Text
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                    numberOfLines={1}
                  >
                    {item.lastMessage}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {moment(item.timestamp).calendar(undefined, {
                      sameDay: "h:mm A",
                      lastDay: "[Yesterday]",
                      lastWeek: "ddd h:mm A",
                      sameElse: "MMM D",
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
