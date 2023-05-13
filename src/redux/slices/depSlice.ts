import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IRegistrationDep } from '../../interfaces/registrationDep.interface';

// Define a type for the slice state
export interface CounterState {
  value: number;
  loading: boolean
}

export interface DepState {
  dep: IRegistrationDep,
  loading: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  loading: false,
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer