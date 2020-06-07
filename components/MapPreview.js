import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MapPreview = props => {
    let imagePreviewUrl;
    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat}, ${props.location.lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:green%7Clabel:G%7C${props.location.lat},${props.location.lng}&key=AIzaSyA-_TIKkg2pFUQHSGUaJI3in-Ltl4YBfUs`;
    }

    return (
        <View style={{ ...styles.mapPreview, ...props.style }}>
            {props.location ? <Image style={styles.mapImage} sourse={{ uri: imagePreviewUrl }} /> : props.children}
        </View>
    );
}

let styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
})

export default MapPreview;