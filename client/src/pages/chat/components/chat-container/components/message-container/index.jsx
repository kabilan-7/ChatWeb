import React, { useEffect, useRef } from 'react'
import { useAppStore } from '@/store'
import moment from 'moment'
const MessageContainer = () => {
  const scrollRef = useRef
  const {selectedChatData,selectedChatType,userInfo, selectedChatMessages} = useAppStore()
  useEffect(()=>{
     if(scrollRef.current){
      scrollRef.current.scrollIntoView({behaviour:"smooth"})
     }
  },[selectedChatMessages])
  const renderMessages = () => {
       let lastDate = null;
       return selectedChatMessages.map((message,index) =>{
          const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
          const showDate = messageDate !== lastDate;
          lastDate = messageDate;
          return <div key={index}>
            {
              showDate && (
                <div className='text-center text-gray-500 my-2'>{moment(timestamp).format("LL")}</div>
              )
            }
            {
              selectedChatType === 'contact' && renderDmMessages(message)
            }
          </div>
       });
  };
  const renderDmMessages = (message) => 
    <div className={`${message.sender === selectedChatData.id ? "text-left" : "text-right"}`}>
    {
      message.messageType === "text" && (
        <div className={`${message.sender !== selectedChatData ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#ffffff]/20" : "bg-[#2a2b33]/5 text-white/80 border-[#8417ff]/50"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
          {message.content}
   </div>
      )
    }
   </div>
  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full '>
      MessageContainer
    </div>
  )
}

export default MessageContainer
