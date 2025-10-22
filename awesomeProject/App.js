import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Image,
  Pressable,
  BackHandler,
  Alert,
} from "react-native";
import { Image as RNImage } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";

import MessageList from "./components/MessageList";
import { createTextMessage, createImageMessage } from "./utils/MessageUtils";

const BG = "#F6F7FB"; // <- soft off-white

function ChatScreen() {
  const insets = useSafeAreaInsets();
  const memeUri = RNImage.resolveAssetSource(require("./assets/meme.jpg")).uri;

  const [messages, setMessages] = useState([
    createTextMessage("Hello"),
    createTextMessage("World"),
    createImageMessage(memeUri),
  ]);

  const [fullscreenUri, setFullscreenUri] = useState(null);

  const onPressMessage = (message) => {
    if (message.type === "text") {
      Alert.alert(
        "Delete message?",
        `"${message.text}"`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () =>
              setMessages((prev) => prev.filter((m) => m.id !== message.id)),
          },
        ],
        { cancelable: true }
      );
    } else if (message.type === "image") {
      setFullscreenUri(message.uri);
    }
  };

  useEffect(() => {
    const onBack = () => {
      if (fullscreenUri) {
        setFullscreenUri(null);
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [fullscreenUri]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: BG }]} edges={["top", "left", "right"]}>
      <View style={[styles.container, { paddingTop: insets.top ? 4 : 12 }]}>
        <MessageList messages={messages} onPressMessage={onPressMessage} />
      </View>

      <Modal
        visible={!!fullscreenUri}
        animationType="fade"
        transparent
        onRequestClose={() => setFullscreenUri(null)}
      >
        <Pressable style={styles.overlay} onPress={() => setFullscreenUri(null)}>
          {fullscreenUri && (
            <Image
              source={{ uri: fullscreenUri }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: { width: "100%", height: "100%" },
});
