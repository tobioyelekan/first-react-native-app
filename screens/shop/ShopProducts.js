import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, Button, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ShopProducts = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false)
        });
    }, [dispatch, loadProducts])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetailScreen', {
            productId: id,
            productTitle: title
        });
    }

    const renderItemHandler = data => {
        return (
            <ProductItem
                id={data.item.id}
                title={data.item.title}
                price={data.item.price}
                imageUrl={data.item.imageUrl}
                onSelect={() => {
                    selectItemHandler(data.item.id, data.item.title)
                }}>
                <Button
                    color={Colors.primary}
                    title="detail"
                    onPress={() => {
                        selectItemHandler(data.item.id, data.item.title)
                    }} />
                <Button
                    color={Colors.primary}
                    title="add to cart"
                    onPress={() => {
                        dispatch(cartActions.addToCart(data.item));
                    }} />
            </ProductItem>
        );
    };

    if (error) {
        return <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button title="try again" onPress={loadProducts} color={Colors.primary} />
        </View>
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={styles.centered}>
            <Text>No product found</Text>
        </View>
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            renderItem={renderItemHandler}
            data={products}
            keyExtractor={item => item.id}
        />
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

ShopProducts.navigationOptions = navData => {
    return {
        headerTitle: 'All products',
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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('CartScreen')
                    }}
                />
            </HeaderButtons>
        )
    }
};

export default ShopProducts;