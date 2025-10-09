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

  return (
    <View style={styles.appContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>🎯 Goal Manager</Text>
      </View>

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
