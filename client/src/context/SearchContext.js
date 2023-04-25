import { createContext, useReducer } from "react";

const InitialState = {
    city: undefined,
    dates: []
}

export const SearchContext = createContext(InitialState)

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NewSearch":
            return action.payload
        case "ResetSearch":
            return InitialState
        default:
            return state
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, InitialState)

    return (
        <SearchContext.Provider value={{
            city: state.city,
            dates: state.dates,
            dispatch
        }}>
            {children}
        </SearchContext.Provider>
    )
}


