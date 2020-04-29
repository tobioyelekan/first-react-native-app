import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TouchableNativeFeedback
} from 'react-native';

const CategoryGridTile = props => {
    let TouchableCom = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCom = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
            <TouchableCom
                onPress={() => { props.onItemClick(props.data.id) }}>
                <View style={{ ...styles.container, ...{ backgroundColor: props.data.color } }}>
                    <Text style={styles.title} numberOfLines={2}>{props.data.title}</Text>
                </View>
            </TouchableCom>
        </View>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        elevation: 5,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible'
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right'
    }
});

export default CategoryGridTile;