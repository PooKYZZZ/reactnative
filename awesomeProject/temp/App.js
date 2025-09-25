import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import GoalInput from '/components/GoalInput';
import GoalItem from '/components/GoalItem';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim() === "") return;
    
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals, 
      {
        text: enteredGoalText,
        key: Math.random().toString()
      }
    ]);
    setEnteredGoalText("");
  };

  const removeGoalHandler = (goalToRemove) => {
    setCourseGoals((currentCourseGoals) => 
      currentCourseGoals.filter(goal => goal.key !== goalToRemove.key)
    );
  };

  const renderGoalItem = (itemData) => {
    return (
      <GoalItem 
        text={itemData.item.text}
        onRemove={() => removeGoalHandler(itemData.item)}
      />
    );
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput 
        enteredGoalText={enteredGoalText}
        onChangeText={goalInputHandler}
        onAddGoal={addGoalHandler}
      />

      {/* Goals List Section */}
      <View style={styles.goalsContainer}>
        <Text style={styles.goalsTitle}>📝 List of Goals ({courseGoals.length})</Text>
        
        {courseGoals.length === 0 ? (
          <Text style={styles.emptyText}>No goals yet. Add your first goal above! 🚀</Text>
        ) : (
          <FlatList 
            data={courseGoals}
            renderItem={renderGoalItem}
            style={styles.goalsList}
          />
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

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 1,
  },
  goalsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  goalsList: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 40,
  },
  footerContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});