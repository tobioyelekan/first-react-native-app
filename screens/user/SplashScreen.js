import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';

import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';

const SplashScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }

            const transformedData = JSON.parse(userData);
            const { token, userId, expDate } = transformedData;
            const expirationDate = new Date(expDate)

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigation('Auth');
                return;
            }

            const expTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expTime));
        }

        tryLogin();
    }, [dispatch])

    return <View style={styles.screen}>
        <ActivityIndicator
            size='large'
            color={Colors.primary}
        />
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SplashScreen;