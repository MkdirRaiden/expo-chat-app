import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const index = () => {
  const { theme } = useTheme();
  const [LottieWebPlayer, setLottieWebPlayer] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      import("@lottiefiles/react-lottie-player").then((mod) => {
        setLottieWebPlayer(() => mod.Player);
      });
    }
  }, []);

  const lottieSize = {
    width: Dimensions.get("window").width * 0.9,
    height: 250,
  };

  const buttonShadowStyle = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  };

  return (
    <View
      className={`flex-1 items-center justify-center p-6 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {Platform.OS === "web" && LottieWebPlayer ? (
        <LottieWebPlayer
          autoplay
          loop
          src={require("../../assets/lottie/chat-animation.json")}
          style={lottieSize}
        />
      ) : Platform.OS !== "web" ? (
        <LottieView
          source={require("../../assets/lottie/chat-animation.json")}
          autoPlay
          loop
          style={lottieSize}
        />
      ) : null}

      <Text
        className={`text-3xl font-bold mt-6 ${
          theme === "dark" ? "text-blue-400" : "text-blue-500"
        }`}
      >
        Welcome to Chat
      </Text>

      <Text
        className={`text-base mt-2 mb-8 text-center w-3/4 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Stay connected with your friends in real-time. Jump into the chat below.
      </Text>

      <Link href="/chats" asChild>
        <Pressable
          className={`transition-colors duration-300 rounded-2xl px-6 py-4 flex-row items-center justify-between ${
            theme === "dark" ? "bg-white" : "bg-black"
          }`}
          style={[buttonShadowStyle]}
        >
          <Text
            className={`text-lg font-semibold mr-2 ${
              theme === "dark" ? "text-black" : "text-white"
            }`}
          >
            Start Chatting
          </Text>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color={theme === "dark" ? "#000000" : "#ffffff"}
          />
        </Pressable>
      </Link>
    </View>
  );
};

export default index;
