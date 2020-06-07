import React, { useState } from 'react';
import { ScrollView, Button, View, Text, TextInput, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-action';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setImageSelected] = useState('');

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitleValue(text);
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, selectedImage));
        props.navigation.goBack();
    };

    const imageTakenHandler = imageUri => {
        setImageSelected(imageUri);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker />
                <Button title='save place' color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
}

let styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add New Place'
}

export default NewPlaceScreen;