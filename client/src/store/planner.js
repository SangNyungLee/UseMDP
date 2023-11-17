import { createSlice } from '@reduxjs/toolkit';
//todo     doing    done
const initialState = [[{}], [{}], [{}]];

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
        // idx를 받았을 때, state[idx1][idx2]=state[idx3][idx4] 를 해서 바꿔야한다.
        patchCardsByIdx(state, action) {},

        //idx를 받고, state에서 idx에 해당하는 카드를 지워야한다.
        delCardsByIdx(state, action) {},
        //idx를 받고, idx에 해당하는 카드로 접근해 내용을 바꿔야한다.
        patchCardsByIdx(state, action) {},
    },
});
export const planActions = planSlice.actions;
export default planSlice.reducer;
