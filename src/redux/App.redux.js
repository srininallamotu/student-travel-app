const GET_COUNTRIES_AND_THREAT_LEVELS = "GET_COUNTRIES_AND_THREAT_LEVELS";
const ADD_USER_WISH_LIST_COUNTRIES = "ADD_USER_WISH_LIST_COUNTRIES";

/**
 * Action Creators 
 */

export function getCountriesAndThreatLevels(url) {
    return dispatch =>
        fetch(url, {
            method: "GET"
        }).then(res => res.json())
        .then(countries => {
            dispatch({
                type: GET_COUNTRIES_AND_THREAT_LEVELS,
                value: countries
            })
        })
        .catch((err) => {
            console.error(err);
        })
}

export function addUserWishListCountry(country) {
    return {
        type: ADD_USER_WISH_LIST_COUNTRIES,
        value: country 
    }
}

/**
 * Reducers
 */

var initialState = {
    countries: [],
    userWishListCountries: []
}

export function studentReducer(state = initialState, action) {

    switch (action.type) {
        case GET_COUNTRIES_AND_THREAT_LEVELS:
            return Object.assign({}, state, {
                countries: [...action.value]
            });
        case ADD_USER_WISH_LIST_COUNTRIES:
            return Object.assign({},state,{ userWishListCountries:[...state.userWishListCountries,action.value]  })
        default:
            return state;
    }

}