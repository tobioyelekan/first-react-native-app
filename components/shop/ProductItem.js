import React from 'react';
import { View, Button, Text, Image, StyleSheet, Platform } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';

const ProductItem = props => {
    let TouchElement = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchElement = TouchableNativeFeedback;
    }

    return (
        <View style={styles.itemContainer}>
            <TouchElement onPress={props.onViewDetail} useForeground>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: props.imageUrl }}
                        style={styles.imageStyle} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    <Button color={Colors.primary} title="detail" onPress={props.onViewDetail} />
                    <Button color={Colors.primary} title="add to cart" onPress={props.onAddToCart} />
                </View>
            </TouchElement>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans-bold'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    }
});

export default ProductItem;