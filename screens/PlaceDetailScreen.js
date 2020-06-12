import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder'

const PlaceDetailScreen = props => {
    return (
        <View style={{ margin: 10 }}>
            <Placeholder
                Animation={Fade}
                Left={PlaceholderMedia}
                Right={PlaceholderMedia}
            >
                <PlaceholderLine width={30} />
                <PlaceholderLine />
                <PlaceholderLine width={30} />
            </Placeholder>
        </View>
    )
}

let styles = StyleSheet.create({

});

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    };
}

export default PlaceDetailScreen;