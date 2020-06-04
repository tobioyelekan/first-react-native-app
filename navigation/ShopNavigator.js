import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator, DrawerItems } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

import ShopProducts from '../screens/shop/ShopProducts';
import Cart from '../screens/shop/Cart';
import ProductDetail from '../screens/shop/ProductDetail';
import Colors from '../constants/Colors';
import Orders from '../screens/shop/Orders';
import UserProduct from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import SplashScreen from '../screens/user/SplashScreen';
import * as authActions from '../store/actions/auth';

let defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? 'red' : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductNavigator = createStackNavigator({
    ShopProductScreen: ShopProducts,
    CartScreen: Cart,
    ProductDetailScreen: ProductDetail
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrderNavigator = createStackNavigator({
    Orders: Orders
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
    UserProduct: UserProduct,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (<Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor} />),
        drawerLabel: "User Product"
    },
    defaultNavigationOptions: defaultNavOptions
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const SplashNavigator = createStackNavigator({
    Splash: SplashScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrderNavigator,
    UserProduct: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const disptach = useDispatch();

        return <View style={{ flex: 1, padding: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItems {...props} />
                <Button title="logout" color={Colors.primary} onPress={() => {
                    disptach(authActions.logout());
                    // props.navigation.navigate('Auth');
                }} />
            </SafeAreaView>
        </View>
    }
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Splash: SplashNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);