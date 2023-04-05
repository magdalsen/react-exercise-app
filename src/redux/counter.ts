import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../redux/configureStore'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: "counter", //nazwa reducera
  initialState,
  reducers: {
    //akcje
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state,action:PayloadAction<number>)=>{
        state.value+=action.payload;
    }
  },
});

export const { incremented, decremented,incrementByAmount } = counterSlice.actions;
//nasz wlasny selector do wyciągania części przechowywanego stanu
export const selectCount=(state:RootState)=>{return state.counter.value}
export default counterSlice.reducer;