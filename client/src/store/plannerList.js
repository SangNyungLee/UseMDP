import { createSlice } from '@reduxjs/toolkit';
//todo     doing    done

const initialState = []


const plannerListSlice = createSlice({
    name: 'planners',
    initialState,
    reducers: {
        setPlannersInit(state, action) {
            state = action.payload;
            return state;
        },
        addPlanner(state,action){
            state = [...state,action.payload];
            return state;
        },
        addCard(state,action){
            const { id, card } = action.payload
            state[id].dataContent[0] = [...state[id].dataContent[0], card]
            return state;
        },
        updatePlanner(state,action){
            const { cardId, ...rest } = action.payload
            return state.map( e =>
                ({ ...e, dataContent: e.dataContent.map( r =>
                    r.map( d => d.cardId === cardId ? {
                        ...d,
                        ...Object.keys(rest).reduce((acc, key) => {
                            if (rest.hasOwnProperty(key)) {
                            acc[key] = rest[key];
                            }
                            return acc;
                            }, {})
                        } : d ) ) })
            )
        }
    },
});
export const plannerListActions = plannerListSlice.actions;
export default plannerListSlice.reducer;