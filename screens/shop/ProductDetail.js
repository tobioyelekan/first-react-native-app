import React from 'react';
import { ScrollView, Button, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetail = props => {
    const productId = props.navigation.getParam('productId');
    const dispatch = useDispatch();

    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
    );

    return (
        <ScrollView>
            <Image source={{ uri: selectedProduct.imageUrl }} style={styles.imageStyle} />
            <View style={styles.action}>
                <Button color={Colors.primary} title="add to cart" onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct));
                }} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.desc}</Text>
        </ScrollView>
    );
};

ProductDetail.navigationOptions = navData => {
    const productTitle = navData.navigation.getParam('productTitle');
    return {
        headerTitle: productTitle
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    action: {
        marginVertical: 10,
        alignItems: 'center'
    },
    imageStyle: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ProductDetail;