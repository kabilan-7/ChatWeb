import React, { useEffect, useRef } from 'react'
import { useAppStore } from '@/store'
const MessageContainer = () => {
  const scrollRef = useRef
  const {selectedChatData,selectedChatType,userInfo, selectedChatMessages} = useAppStore()
  useEffect(()=>{
     if(scrollRef.current){
      scrollRef.current.scrollIntoView({behaviour:"smooth"})
     }
  },[selectedChatMessages])
  const renderMessages = () => {

  }
  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full '>
      MessageContainer
    </div>
  )
}

export default MessageContainer
