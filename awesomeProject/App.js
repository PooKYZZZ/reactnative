<<<<<<< HEAD
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

const BG = "#eb9e1bff"; // <- soft off-white

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
=======
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import styles from './styles';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);

  // Animated scale reference
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animation handlers
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  function goalInputHandler(text) {
    setEnteredGoalText(text);
  }

  function addGoalHandler() {
    if (!enteredGoalText.trim()) return;
    setCourseGoals((currentGoals) => {
      const updated = [...currentGoals, enteredGoalText.trim()];
      if (updated.length > 5) setWarningVisible(true);
      return updated;
    });
    setEnteredGoalText('');
    setModalVisible(false);
  }

  const removeGoalHandler = (indexToRemove) => {
    setCourseGoals((current) => current.filter((_, i) => i !== indexToRemove));
  };

  const confirmDeleteHandler = (index, text) => {
    Alert.alert(
      'Delete Goal?',
      `Are you sure you want to delete:\n\n"${text}"`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => removeGoalHandler(index) },
      ],
      { cancelable: true }
    );
  };
>>>>>>> 435e0b975d2896426d9fcc36b1f6c6e850e0643f

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: BG }]} edges={["top", "left", "right"]}>
      <View style={[styles.container, { paddingTop: insets.top ? 4 : 12 }]}>
        <MessageList messages={messages} onPressMessage={onPressMessage} />
      </View>

<<<<<<< HEAD
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
    backgroundColor: "#e6b562ff",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: { width: "100%", height: "100%" },
});
=======
      {/* Open Modal Button (Animated) */}
      <Pressable
        onPress={() => setModalVisible(true)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.openButton,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.buttonText}>Add New Goal</Text>
        </Animated.View>
      </Pressable>

      {/* Add Goal Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Your course goal"
            onChangeText={goalInputHandler}
            value={enteredGoalText}
            placeholderTextColor="#999"
          />

          <Pressable onPress={addGoalHandler} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={[styles.addButton, { transform: [{ scale: scaleAnim }] }]}>
              <Text style={styles.buttonText}>Add</Text>
            </Animated.View>
          </Pressable>

          <Pressable onPress={() => setModalVisible(false)} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={[styles.cancelButton, { transform: [{ scale: scaleAnim }] }]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Animated.View>
          </Pressable>
        </View>
      </Modal>

      {/* Warning Modal */}
      <Modal visible={warningVisible} transparent animationType="fade">
        <View style={styles.warningOverlay}>
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>Too many goals! ⚠️</Text>
            <Text style={styles.warningSubText}>
              Don’t overwhelm yourself — focus on your top priorities.
            </Text>
            <Pressable onPress={() => setWarningVisible(false)} onPressIn={handlePressIn} onPressOut={handlePressOut}>
              <Animated.View style={[styles.closeWarningButton, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.buttonText}>Okay</Text>
              </Animated.View>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Goals List */}
      <View style={styles.goalsContainer}>
        <Text style={styles.goalsTitle}>📝 List of Goals ({courseGoals.length})</Text>

        {courseGoals.length === 0 ? (
          <Text style={styles.emptyText}>No goals yet. Add your first goal above! 🚀</Text>
        ) : (
          courseGoals.map((goal, index) => (
            <Pressable key={`${goal}-${index}`} onPress={() => confirmDeleteHandler(index, goal)}>
              <Animated.View style={[styles.goalItem, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.goalItemText}>{goal}</Text>
              </Animated.View>
            </Pressable>
          ))
        )}

        {/* Footer */}
        {courseGoals.length > 0 && (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Keep going! You've got {courseGoals.length} goal{courseGoals.length !== 1 ? 's' : ''} to achieve! 💪
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
>>>>>>> 435e0b975d2896426d9fcc36b1f6c6e850e0643f
