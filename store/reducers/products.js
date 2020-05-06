import PRODUCTS from '../../data/dummy-data';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
    cartProducts: []
};

const productReducer = (state = initialState, action) => {
    return state;
};

export default productReducer;