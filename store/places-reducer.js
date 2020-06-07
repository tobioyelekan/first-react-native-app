import { ADD_PLACE, SET_PLACE } from './places-action';
import Place from '../model/place';

const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                new Date().toString(),
                action.placeData.title,
                action.placeData.image
            )
            return {
                places: state.places.concat(newPlace)
            }
        case SET_PLACE:
            return {
                places: action.places.map(pl => new Place(pl.id.toString(), pl.title, pl.imageUri))
            };
        default:
            return state;
    }
}