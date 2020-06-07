import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesAction from '../store/places-action';

const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesAction.loadPlaces())
    }, [])

    const placeItemHandler = data => {
        return (
            <PlaceItem
                image={data.item.imageUri}
                title={data.item.title}
                address={null}
                onSelect={() => {
                    props.navigation.navigate('PlaceDetail', {
                        placeTitle: data.item.title,
                        placeId: data.item.id
                    })
                }} />
        )
    }

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={placeItemHandler} />
    )
}

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Add Place'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => navData.navigation.navigate('NewPlace')}
                />
            </HeaderButtons>
        )
    }
}

let styles = StyleSheet.create({

});

export default PlacesListScreen;