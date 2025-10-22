import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  Animated,
} from 'react-native';

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

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    setCourseGoals((currentGoals) => {
      const updatedGoals = [...currentGoals, enteredGoalText];
      if (updatedGoals.length > 5) {
        setWarningVisible(true);
      }
      return updatedGoals;
    });
    setEnteredGoalText('');
    setModalVisible(false);
  }

  return (
    <View style={styles.appContainer}>
      {/* === Add Goal Button (Animated) === */}
      <Pressable
        onPress={() => setModalVisible(true)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.openButton,
            {
              transform: [{ scale: scaleAnim }],
              backgroundColor: '#03DAC5',
            },
          ]}
        >
          <Text style={styles.buttonText}>Add New Goal</Text>
        </Animated.View>
      </Pressable>

      {/* === Add Goal Modal === */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Your course goal"
            onChangeText={goalInputHandler}
            value={enteredGoalText}
          />

          <Pressable
            onPress={addGoalHandler}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View
              style={[
                styles.addButton,
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              <Text style={styles.buttonText}>Add</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={() => setModalVisible(false)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View
              style={[
                styles.cancelButton,
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Animated.View>
          </Pressable>
        </View>
      </Modal>

      {/* === Warning Modal === */}
      <Modal visible={warningVisible} transparent={true} animationType="fade">
        <View style={styles.warningOverlay}>
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>Too many goals! ⚠️</Text>
            <Text style={styles.warningSubText}>
              Don’t overwhelm yourself — focus on your top priorities.
            </Text>

            <Pressable
              onPress={() => setWarningVisible(false)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Animated.View
                style={[
                  styles.closeWarningButton,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <Text style={styles.buttonText}>Okay</Text>
              </Animated.View>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* === Goals List === */}
      <View style={styles.goalsContainer}>
        <Text style={styles.header}>List of Goals:</Text>
        {courseGoals.map((goal, index) => (
          <Pressable key={index}>
            <Animated.View
              style={[
                styles.goalItem,
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              <Text style={{ color: 'white' }}>{goal}</Text>
            </Animated.View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    width: '70%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  openButton: {
    backgroundColor: '#03DAC5',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '70%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#B00020',
    padding: 10,
    borderRadius: 5,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  goalsContainer: {
    flex: 5,
    marginTop: 20,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goalItem: {
    backgroundColor: '#3700B3',
    padding: 10,
    borderRadius: 6,
    marginVertical: 5,
  },
  warningOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningBox: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  warningSubText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeWarningButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
  },
});
