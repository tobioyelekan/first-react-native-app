import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const Cart = props => { 
    return (
        <View style={styles.content}>
            <Text>cart screen</Text>
            <Button title="next" onPress={() => props.navigation.navigate('ProductDetailScreen')} />
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