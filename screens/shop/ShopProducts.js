import React from 'react';
import { View, FlatList, Button, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';

const ShopProducts = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const renderItemHandler = data => {
        return (
            <ProductItem
                id={data.item.id}
                title={data.item.title}
                price={data.item.price}
                imageUrl={data.item.imageUrl}
                onViewDetail={() => {
                    props.navigation.navigate('ProductDetailScreen',
                        {
                            productId: data.item.id,
                            productTitle: data.item.title
                        });
                }}
                onAddToCart={() => {
                    dispatch(cartActions.addToCart(data.item));
                }}
            />
        );
    };

    return (
        <View style={styles.content}>
            <FlatList
                renderItem={renderItemHandler}
                data={products}
                keyExtractor={(item, _) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1
    }
});

ShopProducts.navigationOptions = {
    headerTitle: 'All products'
};

export default ShopProducts;