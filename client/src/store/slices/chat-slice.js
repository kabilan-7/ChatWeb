export const createChatSlice = (set,get) => ({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessage:[],
    setSelectedChatType: (selectedChatType) => set({selectedChatType}),
    setSelectedChatData: (selectedChatData) => set({selectedChatData}),
    setSelectedChatMessage:(selectedChatMessage) => set({selectedChatMessage}),
    closeChat: () => set({selectedChatType:undefined, selectedChatData:undefined, selectedChatMessage:[]}),
})