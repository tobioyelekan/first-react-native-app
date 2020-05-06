import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import ShopNavigator from './navigation/ShopNavigator';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';

enableScreens();

const rootReducer = combineReducers({
  products: productReducer,
  carts: cartReducer
});

const store = createStore(rootReducer);

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