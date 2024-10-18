import {create} from 'zustand'
import { createAuthSlice } from './slices/auth-slice'
import { createChatSlice } from './slices/chat-slice'

//Create a store 
export const useAppStore = create((...a)=>(
    {
        ...createAuthSlice(...a),
        ...createChatSlice(...a),
    }
))