import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/order';
import { ActivityIndicator } from 'react-native-paper';
import Colors from '../../constants/Colors';

const Orders = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);

    const dispatch = useDispatch();

    const loadOrders = async () => {
        setIsLoading(true);
        await dispatch(orderActions.fetchOrders());
        setIsLoading(false);
    };

    useEffect(() => {
        loadOrders();
    }, [dispatch])

    useEffect(() => {
        const willFoucsSub = props.navigation.addListener('willFocus', loadOrders);
        return () => {
            willFoucsSub.remove()
        };
    }, [loadOrders])

    const orderItemHandler = data => {
        return (
            <OrderItem
                amount={data.item.totalAmount}
                date={data.item.readableDate}
                items={data.item.items}
            />
        )
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={orderItemHandler}
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

Orders.navigationOptions = navData => {
    return {
        headerTitle: "Your Orders",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
}

export default Orders;