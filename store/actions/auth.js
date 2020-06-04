import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTH,
            userId,
            token
        });
    }
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMIrQ5IONDVC2IeqL63kZzPb1CpZKWwFk',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            );

            if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                let message = 'Something went wrong';
                if (errorId === 'EMAIL_NOT_FOUND') {
                    message = 'This email could not be found';
                } else if (errorId === 'INVALID_PASSWORD') {
                    message = 'Password is incorrect';
                }
                throw new Error(message);
            }

            const resData = await response.json();
            console.log(resData);
            // dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
            dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000));

            const expDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
            saveDataToStorage(resData.idToken, resData.localId, expDate);
        } catch (err) {
            throw err;
        }
    };
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationTime => {
    return disptach => {
        timer = setTimeout(() => {
            disptach(logout());
        }, expirationTime);
    };
};

export const signUp = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMIrQ5IONDVC2IeqL63kZzPb1CpZKWwFk',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            );

            if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                let message = 'Something went wrong';
                if (errorId === 'EMAIL_EXISTS') {
                    message = 'This email exists already';
                }
                throw new Error(message);
            }

            const resData = await response.json();
            console.log(resData);
            // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
            dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000));

            const expDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
            saveDataToStorage(resData.idToken, resData.localId, expDate);
        } catch (err) {
            throw err;
        }
    };
};

const saveDataToStorage = (token, userId, expDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expDate: expDate.toISOString()
    }));
}