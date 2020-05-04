import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cart = props => { 
    return (
        <View style={styles.content}>
            <Text>cart screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Cart;