import React, { useState } from 'react'
import { View, Modal, TextInput, Button, StyleSheet } from 'react-native'

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const textInputHandler = text => {
        setEnteredGoal(text)
    }

    const addGoalHandler = () => {
        if (enteredGoal.length === 0)
            return;
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');
    }

    const cancelHandler = () => {
        setEnteredGoal('');
        props.onCancel()
    }

    return (
        <Modal visible={props.visibility} animationType='slide'>
            <View style={styles.modalContainer} >
                <TextInput
                    placeholder="Enter a goal"
                    style={styles.textInput}
                    onChangeText={textInputHandler}
                    value={enteredGoal} />
                <View style={styles.button}>
                    <Button title="Add goal" onPress={addGoalHandler} />
                </View>
                <View style={styles.button}>
                    <Button title="Cancel" color="red" onPress={cancelHandler} />
                </View>
            </View>
        </Modal>
    );
}

export default GoalInput;

const styles = StyleSheet.create({
    modalContainer: {
        padding: 50
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    },
    button: {
        marginTop: 10
    }
})