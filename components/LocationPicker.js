import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';

const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permission!',
                'You need to grant location permissions to use the app',
                [{ text: 'Ok' }]
            );
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeInterval: 5000 });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert('could not fetch location', 'please try again later', [{ text: 'Okay' }]);
        }
        setIsFetching(false);
    };

    return (
        <View style={styles.LocationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                {isFetching ? (<ActivityIndicator size='large' color={Colors.primary} />) :
                    <Text>No location chosen yet</Text>}
            </MapPreview>
            <Button title='get user location' color={Colors.primary}
                onPress={getLocationHandler} />
        </View>
    )
}

let styles = StyleSheet.create({
    LocationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default LocationPicker;