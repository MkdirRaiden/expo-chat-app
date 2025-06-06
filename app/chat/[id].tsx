import { FontAwesome } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import messagesData from "../../constants/messages.json";
import { useTheme } from "../../context/ThemeContext";
import type { ChatMessage } from "../../types";

export default function ChatDetailScreen() {
  const { theme } = useTheme();
  const { id, user } = useLocalSearchParams<{ id?: string; user?: string }>();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const loaded =
      (messagesData as Record<string, ChatMessage[]>)[String(id)] ?? [];
    setMessages(loaded);
  }, [id]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fallbackUser =
    user ?? (messages.length > 0 ? messages[0].sender : "Unknown");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: Math.random().toString(),
      sender: "You",
      text: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View
        className={`flex-1 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
      >
        {/* Header with Back Button and User Name */}
        <View
          className={`flex-row items-center justify-between px-4 py-3 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <Link href={"/chats"} asChild>
            <TouchableOpacity className="flex-row items-center justify-center">
              <FontAwesome name="chevron-left" size={20} color={"#3B82F6"} />
              <Text className={`text-lg ml-3 text-blue-500`}>Back</Text>
            </TouchableOpacity>
          </Link>
          <Text
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Chat with {fallbackUser}
          </Text>
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
          contentContainerStyle={{ paddingVertical: 10, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <Pressable
              onLongPress={() => alert(`Long-pressed message: "${item.text}"`)}
            >
              <View
                className={`max-w-[80%] rounded-2xl px-4 py-3 my-2 mx-4 ${
                  item.sender === "You"
                    ? "bg-blue-500 self-end rounded-br-none"
                    : theme === "dark"
                    ? "bg-gray-700 self-start rounded-bl-none"
                    : "bg-gray-200 self-start rounded-bl-none"
                }`}
              >
                <Text
                  className={`text-sm font-semibold mb-1 ${
                    item.sender === "You"
                      ? "text-white"
                      : theme === "dark"
                      ? "text-gray-100"
                      : "text-black"
                  }`}
                >
                  {item.sender}
                </Text>
                <Text
                  className={`text-base ${
                    item.sender === "You"
                      ? "text-white"
                      : theme === "dark"
                      ? "text-gray-100"
                      : "text-black"
                  }`}
                >
                  {item.text}
                </Text>
                <Text
                  className={`text-[11px] mt-1 ${
                    item.sender === "You"
                      ? "text-gray-200"
                      : theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {moment(item.timestamp).calendar(undefined, {
                    sameDay: "h:mm A",
                    lastDay: "[Yesterday]",
                    lastWeek: "ddd h:mm A",
                    sameElse: "MMM D",
                  })}
                </Text>
              </View>
            </Pressable>
          )}
        />

        {/* Absolute Input Bar */}
        <View
          className={`absolute bottom-0 left-0 right-0 flex-row items-center border-t px-4 py-2 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          }`}
        >
          <Pressable
            onPress={() => {
              console.log("emoji pressed");
            }}
            style={{ marginRight: 8 }}
          >
            <FontAwesome
              name="smile-o"
              size={24}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </Pressable>

          <TextInput
            ref={inputRef}
            value={input}
            onChangeText={setInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message..."
            placeholderTextColor={theme === "dark" ? "#999" : "#666"}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            style={[
              {
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                fontSize: 16,
                borderRadius: 9999,
                borderWidth: 1,
                marginRight: 8,
              },
              theme === "dark"
                ? {
                    backgroundColor: "#374151",
                    color: "#FFFFFF",
                    borderColor: isFocused ? "#3B82F6" : "#4B5563",
                  }
                : {
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    borderColor: isFocused ? "#3B82F6" : "#D1D5DB",
                  },
              ...(Platform.OS === "web"
                ? [{ outlineStyle: "none" } as any]
                : []),
            ]}
          />

          <Pressable
            onPress={sendMessage}
            disabled={!input.trim()}
            style={{
              padding: 12,
              borderRadius: 9999,
              backgroundColor: input.trim()
                ? "#3B82F6"
                : theme === "dark"
                ? "#4B5563"
                : "#D1D5DB",
            }}
          >
            <FontAwesome name="send" size={18} color="white" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
