import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

/**
 * Two right-aligned blue bubbles ("Hello", "World") and an image card below.
 * Bubbles keep a natural width so short words don't wrap to 2 letters/line.
 */
export default function MessageItem({ message, onPressMessage = () => {} }) {
  if (message.type === "text") {
    return (
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => onPressMessage(message)}>
          <View style={styles.bubble}>
            <Text style={styles.text}>{message.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  if (message.type === "image") {
    return (
      <View style={[styles.row, { marginTop: 6 }]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onPressMessage(message)}
          style={styles.mediaShadow}
        >
          <Image source={{ uri: message.uri }} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  // full width row -> align item to the right edge
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
    paddingHorizontal: 8,
  },

  // blue bubble with natural width (no forced wrap)
  bubble: {
    alignSelf: "flex-end",
    backgroundColor: "#2d5bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderBottomRightRadius: 6,
    // no maxWidth constraint -> short words like "Hello" won't break
  },
  text: { color: "#fff", fontSize: 16, lineHeight: 20 },

  // image card (below the bubbles)
  mediaShadow: { borderRadius: 12, overflow: "hidden" },
  image: { width: 220, height: 165, backgroundColor: "#eee", borderRadius: 12 },
});
