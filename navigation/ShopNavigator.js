import { createStackNavigator, createAppContainer } from 'react-navigation-stack';

import ShopProducts from '../screens/ShopProducts';
import Cart from '../screens/Cart';
import ProductDetail from '../screens/ProductDetail';

const navigator = createStackNavigator({
    ShopProductScreen: ShopProducts,
    CartScreen: Cart,
    ProductDetailScreen: ProductDetail
});

export default createAppContainer(navigator);