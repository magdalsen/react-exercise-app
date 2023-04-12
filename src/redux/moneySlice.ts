import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from './configureStore'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: "moneySlice", //nazwa reducera
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
    },
    decrementByAmount: (state,action:PayloadAction<number>)=>{
      state.value-=action.payload;
  }
  },
});

export const { incremented, decremented,incrementByAmount, decrementByAmount } = counterSlice.actions;
//nasz wlasny selector do wyciągania części przechowywanego stanu
export const selectCount=(state:RootState)=>state.counter.value
export default counterSlice.reducer;