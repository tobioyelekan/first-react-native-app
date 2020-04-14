import React, { useState } from 'react'
import { View, Button, StyleSheet, FlatList } from 'react-native'

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [visible, setVisibility] = useState(false);
  const [goals, setGoals] = useState([]);

  const cancelModalHandler = () => {
    setVisibility(!visible)
  }

  const onAddGoalHandler = goal => {
    setGoals(goals => [
      ...goals,
      { id: Math.random().toString(), title: goal }
    ])
    setVisibility(!visible)
  }

  const deleteGoalHandler = goalId => {
    setGoals(goals.filter(goal => goal.id !== goalId))
  }

  return (
    <View style={styles.generalContainer}>
      <Button title="Add New Goal" onPress={cancelModalHandler} />
      <GoalInput
        visibility={visible}
        onCancel={cancelModalHandler}
        onAddGoal={onAddGoalHandler} />
      <FlatList
        keyExtractor={(item, _) => item.id}
        data={goals}
        renderItem={itemData => (
          <GoalItem
            data={itemData.item}
            onDelete={deleteGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  generalContainer: {
    padding: 50
  }
})