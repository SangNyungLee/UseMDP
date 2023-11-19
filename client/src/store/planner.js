import { createSlice } from '@reduxjs/toolkit';
//todo     doing    done

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        cardId: `item-${k + offset}-${new Date().getTime()}`,
        post: '',
        title: `title ${k + offset}`,
        coverColor: '#FFD6DA',
        startDate: new Date(2023, 0, 1).toISOString(),
        endDate: new Date(2023, 0, 1).toISOString(),
        todolist: [{ done: false }, { jpa: false }],
        intOrder: k,
        separator: 'TODO',
    }));

const initialState = [getItems(8), getItems(5, 8), getItems(5, 13)];

const planSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        //초기에 useEffect를 받고, payload를 받아서 수정해야한다.
        setPlansInit(state, action) {
            //음.. 좀 다를수 있는데 이걸 바꿔야한다.
            state = action.payload;
            return state;
        },
        setPlans(state, action) {
            state = action.payload;
            return state;
        },
        patchCardsByIdx(state, action) {
            console.log('patchCardByIdx', action.payload);
            state[action.payload.idx1][action.payload.idx2] = action.payload.cardItem;
        },
    },
});
export const planActions = planSlice.actions;
export default planSlice.reducer;
