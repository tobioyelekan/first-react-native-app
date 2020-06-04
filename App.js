import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './navigation/ShopNavigator';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer'; 

enableScreens();

const rootReducer = combineReducers({
  products: productReducer,
  carts: cartReducer,
  orders: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
    />
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}