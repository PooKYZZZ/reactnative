import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';

const ScrollViewDemo = ({ goals, onRemove }) => {
  console.log('ScrollView rendered with', goals.length, 'items');
  
  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9ff', padding: 10, margin: 5, borderRadius: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#4338ca' }}>
        📜 ScrollView ({goals.length} items)
      </Text>
      <Text style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', marginBottom: 10 }}>
        Renders ALL items immediately
      </Text>
      
      {/* Limited height container to show scrolling */}
      <View style={{ height: 200, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, backgroundColor: 'white' }}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {goals.map((goal, index) => (
            <View key={goal.key} style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              marginVertical: 2,
              marginHorizontal: 8,
              backgroundColor: index % 2 === 0 ? '#f3f4f6' : '#ffffff',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#e5e7eb'
            }}>
              <Text style={{ flex: 1, fontSize: 14 }}>{goal.text}</Text>
              <Text style={{ fontSize: 12, color: '#6b7280', marginRight: 8 }}>#{index + 1}</Text>
              <TouchableOpacity 
                style={{ backgroundColor: '#fee2e2', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => onRemove(goal)}
              >
                <Text style={{ color: '#dc2626', fontSize: 12 }}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          {goals.length === 0 && (
            <Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 80 }}>No goals added yet</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const FlatListDemo = ({ goals, onRemove }) => {
  console.log('FlatList rendered with', goals.length, 'items');
  
  const renderItem = ({ item, index }) => {
    console.log('Rendering item:', index);
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        marginVertical: 2,
        marginHorizontal: 8,
        backgroundColor: index % 2 === 0 ? '#f3f4f6' : '#ffffff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e5e7eb'
      }}>
        <Text style={{ flex: 1, fontSize: 14 }}>{item.text}</Text>
        <Text style={{ fontSize: 12, color: '#6b7280', marginRight: 8 }}>#{index + 1}</Text>
        <TouchableOpacity 
          style={{ backgroundColor: '#fee2e2', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => onRemove(item)}
        >
          <Text style={{ color: '#dc2626', fontSize: 12 }}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f9ff', padding: 10, margin: 5, borderRadius: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#1e40af' }}>
        ⚡ FlatList ({goals.length} items)
      </Text>
      <Text style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', marginBottom: 10 }}>
        Renders only visible items
      </Text>
      
      {/* Same limited height container */}
      <View style={{ height: 200, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, backgroundColor: 'white' }}>
        <FlatList
          data={goals}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 80 }}>No goals added yet</Text>
          }
        />
      </View>
    </View>
  );
};

export default function ScrollViewVsFlatListDemo() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalHandler = () => {
    if (enteredGoalText.trim() === "") return;
    
    setCourseGoals(currentGoals => [
      ...currentGoals,
      {
        text: enteredGoalText,
        key: Math.random().toString()
      }
    ]);
    setEnteredGoalText("");
  };

  const removeGoalHandler = (goalToRemove) => {
    setCourseGoals(currentGoals => 
      currentGoals.filter(goal => goal.key !== goalToRemove.key)
    );
  };

  const addMultipleGoals = () => {
    const goals = [];
    for (let i = 1; i <= 20; i++) {
      goals.push({
        text: `Sample Goal ${i + courseGoals.length} - This is a longer goal text to demonstrate scrolling behavior`,
        key: Math.random().toString()
      });
    }
    setCourseGoals(currentGoals => [...currentGoals, ...goals]);
  };

  const clearAllGoals = () => {
    setCourseGoals([]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', paddingTop: 40, paddingHorizontal: 16 }}>
      {/* Header */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#1f2937' }}>
        📊 ScrollView vs FlatList Demo
      </Text>
      
      {/* Input Section */}
      <View style={{ 
        flexDirection: 'row', 
        marginBottom: 16, 
        paddingBottom: 16, 
        borderBottomWidth: 1, 
        borderBottomColor: '#e5e7eb' 
      }}>
        <TextInput
          style={{ 
            flex: 1, 
            borderWidth: 1, 
            borderColor: '#d1d5db', 
            borderRadius: 8, 
            paddingHorizontal: 12, 
            paddingVertical: 8,
            backgroundColor: 'white',
            marginRight: 8
          }}
          placeholder="Enter a goal"
          value={enteredGoalText}
          onChangeText={setEnteredGoalText}
        />
        <TouchableOpacity 
          style={{ 
            backgroundColor: '#3b82f6', 
            paddingHorizontal: 16, 
            paddingVertical: 8, 
            borderRadius: 8 
          }}
          onPress={addGoalHandler}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 }}>
        <TouchableOpacity 
          style={{ backgroundColor: '#10b981', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}
          onPress={addMultipleGoals}
        >
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>Add 20 Sample Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ backgroundColor: '#ef4444', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}
          onPress={clearAllGoals}
        >
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Performance Info */}
      <View style={{ 
        backgroundColor: '#fef3c7', 
        padding: 12, 
        borderRadius: 8, 
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#f59e0b'
      }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#92400e', marginBottom: 4 }}>
          📈 Performance Comparison ({courseGoals.length} goals):
        </Text>
        <Text style={{ fontSize: 12, color: '#78350f' }}>
          • ScrollView: Renders all {courseGoals.length} items immediately (memory intensive)
        </Text>
        <Text style={{ fontSize: 12, color: '#78350f' }}>
          • FlatList: Renders only visible items (~3-5 items) (memory efficient)
        </Text>
        <Text style={{ fontSize: 12, color: '#78350f', marginTop: 4 }}>
          Open developer console to see render logs!
        </Text>
      </View>

      {/* Side by Side Comparison */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <ScrollViewDemo goals={courseGoals} onRemove={removeGoalHandler} />
        <FlatListDemo goals={courseGoals} onRemove={removeGoalHandler} />
      </View>
    </View>
  );
}