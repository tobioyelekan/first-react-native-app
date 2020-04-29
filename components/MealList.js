import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/MealItem';

const MealList = props => {

    const favMeals = useSelector(state => state.meals.favoriteMeals);

    const onSelectMealHandler = (mealId, mealTitle) => {
        const isFav = favMeals.some(meal => meal.id === mealId)
        props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
                mealId: mealId,
                mealTitle: mealTitle,
                isFav: isFav
            }
        });
    };

    const renderMealitem = itemData => {
        return (
            <MealItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                onSelectMeal={() => {
                    onSelectMealHandler(itemData.item.id, itemData.item.title)
                }}
                complexity={itemData.item.complexity}
                image={itemData.item.imageUrl}
                affordability={itemData.item.affordability}
            />
        )
    };

    return (
        <View style={styles.list}>
            <FlatList
                data={props.meals}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealitem}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        margin: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList;