import { createSlice } from '@reduxjs/toolkit';
//todo     doing    done

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        description: '',
        title: `title ${k + offset}`,
        cover_Color: '#FFD6DA',
        start_date: new Date(2023, 0, 1).toISOString(),
        end_date: new Date(2023, 0, 1).toISOString(),
        todolist: [{ done: false }, { jpa: false }],
        intOrder: k,
        separator: 'TODO',
    }));

const initialState = [getItems(10), getItems(5, 10), getItems(5, 15)];

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
        // idx를 받았을 때, idx4개를 받아 order를 바꿔줘야함.
        //시작지에서는 droppableid로 접근하고, index초과인 친구들의 intOrder를 -1하면 된다.
        // 도착지에서는 droppableid로 접근하고, index초과인 친구들의 intOrder를 +1하면 된다.
        moveCardByIdx(state, action) {
            console.log('moveCardByIdx', action.payload);
        },

        //reOrder
        reOrderCardByIdx(state, action) {},
        //idx를 받고, state에서 idx에 해당하는 카드를 지워야한다.
        delCardsByIdx(state, action) {},
        //idx를 받고, idx에 해당하는 카드로 접근해 내용을 바꿔야한다.
        patchCardsByIdx(state, action) {
            // console.log('patchCardByIdx', action.payload);
            state[action.payload.idx1][action.payload.idx2] = action.payload.cardItem;
        },
    },
});
export const planActions = planSlice.actions;
export default planSlice.reducer;
