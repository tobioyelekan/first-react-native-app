import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE';

import { insertPlace, fetchPlaces } from '../helpers/db';

export const addPlace = (title, imageUri) => {
    return async dispatch => {
        const fileName = imageUri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: imageUri,
                to: newPath
            });

            const insertResult = await insertPlace(
                title,
                newPath,
                'dummy address',
                15.6,
                12.3
            );
            console.log(insertResult);

            dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath } });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const placesResult = await fetchPlaces();
            dispatch({ type: SET_PLACE, places: placesResult.rows._array })
        } catch (err) {
            throw err;
        }
    };
}