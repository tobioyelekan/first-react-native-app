import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceDetailScreen = props => {
    return <View>
        <Text>PlaceDetailScreen</Text>
    </View>
}

let styles = StyleSheet.create({

});

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    };
}

export default PlaceDetailScreen;