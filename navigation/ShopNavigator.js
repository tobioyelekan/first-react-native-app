import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import ShopProducts from '../screens/shop/ShopProducts';
import Cart from '../screens/shop/Cart';
import ProductDetail from '../screens/shop/ProductDetail';
import Colors from '../constants/Colors';

const Navigator = createStackNavigator({
    ShopProductScreen: ShopProducts,
    CartScreen: Cart,
    ProductDetailScreen: ProductDetail
}, {
    defaultNavigationOptions: {
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
});

export default createAppContainer(Navigator);