import {create} from 'zustand'
import { createAuthSlice } from './slices/auth-slice'

//Create a store 
export const useAppStore = create((...a)=>(
    {
        ...createAuthSlice(...a)
    }
))