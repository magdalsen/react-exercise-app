import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'


export interface InvoiceElem {title:string,id:number}

export interface CounterState {
    orders: InvoiceElem[]
  }

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState: {
      orders: [] as InvoiceElem[]
    },
    reducers: {
      addInvoiceElement: (state,action:PayloadAction<InvoiceElem>)=>({
            orders: [...state.orders, action.payload],
          }),
      removeInvoiceElementById: (state,action:PayloadAction<number>)=>{
        const id = action.payload
        return {
            ...state,
            orders: state.orders.filter((order: {id:number})=> order.id !== id)
        }
      }
    },
  });
  
  export const { addInvoiceElement,removeInvoiceElementById } = orderSlice.actions;
  export default orderSlice.reducer;