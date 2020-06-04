import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isSingup, setIsSignup] = useState(false);
    const disptach = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error, [{
                text: 'Okay'
            }])
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSingup) {
            action = authActions.signUp(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await disptach(action);
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message)
            setIsLoading(false);
        }
    }

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, [dispatchFormState]
    );

    return (
        <View
            // behavior='padding'
            // keyboardVerticalOffset={50}
            style={styles.screen}>
            <LinearGradient
                colors={['#ffedff', '#ff3eff']}
                style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            securityTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.button}>
                            {isLoading ?
                                <ActivityIndicator size="small" color={Colors.primary} /> : <Button title={isSingup ? "Sing Up" : "Login"}
                                    color={Colors.primary}
                                    onPress={authHandler} />}
                        </View>
                        <View style={styles.button}>
                            <Button title={`Switch to ${isSingup ? "Login" : "Sign Up"}`}
                                color={Colors.accent}
                                onPress={() => {
                                    setIsSignup(!isSingup)
                                }} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </View>
    )
};

AuthScreen.navigationOptions = {
    headerTitle: "Login"
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 20,
        maxHeight: 400
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginTop: 10
    }
});

export default AuthScreen;