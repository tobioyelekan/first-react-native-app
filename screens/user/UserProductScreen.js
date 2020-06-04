import React from 'react';
import { Platform, Button, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductScreen = props => {

    const dispatch = useDispatch();

    const userProducts = useSelector(state => state.products.userProducts);

    const editProductHanlder = id => {
        props.navigation.navigate('EditProduct', {
            productId: id
        });
    }

    const deleteHandler = id => {
        Alert.alert('are you sure', 'do yo really wanna delete', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(productActions.deleteProduct(id));
                }
            }
        ])
    };

    const userProductHandler = data => {
        return (
            <ProductItem
                image={data.item.imageUrl}
                title={data.item.title}
                price={data.item.price}
                onSelect={() => {
                    editProductHanlder(data.item.id)
                }}>
                <Button
                    color={Colors.primary}
                    title="Edit"
                    onPress={() => {
                        editProductHanlder(data.item.id)
                    }} />
                <Button
                    color={Colors.primary}
                    title="Delete"
                    onPress={
                        deleteHandler.bind(this, data.item.id)
                    } />
            </ProductItem>
        )
    }

    return <FlatList
        data={userProducts}
        renderItem={userProductHandler}
        keyExtractor={item => item.id}

    />
}

UserProductScreen.navigationOptions = navData => {
    return {
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
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>
        )
    };
}

export default UserProductScreen;