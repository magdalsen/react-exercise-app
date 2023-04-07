import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'


export interface CounterState {
    orders: []
  }
  
  const initialState = {
    orders: []
  }

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
      increment: (state,action:PayloadAction<CounterState>)=>{
        return {
            ...state,
            orders: [...state.orders, action.payload],
          }
      },
      decrement: (state,action:PayloadAction<number>)=>{
        const id = action.payload
        return {
            ...state,
            orders: state.orders.filter((order: {id:number})=> {return order.id !== id})
        }
    }
    },
  });
  
  export const { increment,decrement } = orderSlice.actions;
  export default orderSlice.reducer;