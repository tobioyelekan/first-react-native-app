import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const GoalItem = (props) => {

    const deleteGoal = () => {
        let goalId = props.data.id
        props.onDelete(goalId)
    }

    return (
        <TouchableOpacity onPress={props.onDelete.bind(this, props.data.id)}>
            <View style={styles.itemContainer}>
                <Text>{props.data.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    itemContainer: {
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'grey',
        padding: 10,
        marginVertical: 10
    }
})