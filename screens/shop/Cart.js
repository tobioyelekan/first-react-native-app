import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import { ActivityIndicator } from 'react-native-paper';

const Cart = props => {
    const [isLoading, setIsLoading] = useState(false);

    const cartTotalAmount = useSelector(state => state.carts.totalAmount);

    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.carts.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.carts.items[key].productTitle,
                productPrice: state.carts.items[key].productPrice,
                quantity: state.carts.items[key].quantity,
                sum: state.carts.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    const cartItemHandler = itemData => {
        return (
            <CartItem
                deletable
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.sum}
                onRemove={() => {
                    dispatch(cartActions.removeFromCart(itemData.item.productId))
                }}
            />
        );
    };

    const addOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems, cartTotalAmount.toFixed(2)))
        setIsLoading(false);
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    return (
        <View style={styles.content}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button color={Colors.accent} title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={addOrderHandler} />
            </View>
            <View>
                <FlatList
                    renderItem={cartItemHandler}
                    data={cartItems}
                    keyExtractor={item => item.productId}
                />
            </View>
            <FlatList />
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

Cart.navigationOptions = {
    headerTitle: "Your Cart"
}

export default Cart;