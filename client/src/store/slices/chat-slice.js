export const createChatSlice = (set,get) => ({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages:[],
    setSelectedChatType: (selectedChatType) => set({selectedChatType}),
    setSelectedChatData: (selectedChatData) => set({selectedChatData}),
    setSelectedChatMessages:(selectedChatMessage) => set({selectedChatMessage}),
    closeChat: () => set({selectedChatType:undefined, selectedChatData:undefined, selectedChatMessage:[]}),
    addMessage: (message) => {
         const selectedChatMessages = get().selectedChatMessages
         const selectedChatType = get().selectedChatType
         set({
            selectedChatMessages:[
                ...selectedChatMessages,{
                    ...message,
                    recipient:selectedChatType === "channel" ? message.recipient :message.recipient._id
                }
            ]
         })
    }
})