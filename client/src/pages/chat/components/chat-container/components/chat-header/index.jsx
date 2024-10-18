import { useAppStore } from '@/store'
import React from 'react'
import {RiCloseFill} from "react-icons/ri"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { getColor } from '@/lib/utils'
import { HOST } from '@/utils/constants'
const ChatHeader = () => {
  const  {closeChat,selectedChatData,selectedChatType} = useAppStore()
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
        <div className='flex gap-5 items-cente w-full justify-between'>
            <div className='flex gap-3 items-center '>
            <div className='h-12 w-12 relative'>
             <Avatar className='h-12 w-12  rounded-full overflow-hidden'>
              {selectedChatData.image?(<AvatarImage src={`${HOST}/${selectedChatData.image}`} alt='profile' className='object-cover w-full h-full rounded-full bg-black'/>):
              (<div className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(selectedChatData.color)}`}>
                {selectedChatData.firstName?selectedChatData.firstName.split("").shift(): selectedChatData.email.split("").shift()}
                </div>)}
               </Avatar>
             </div>
             <div>{selectedChatType === "contact" && `${selectedChatData.firstName} ${selectedChatData.lastName}`}</div>
              </div> 
                <div className="flex items-center justify-center gap-5">
                    <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all' onClick={closeChat} >
                    <RiCloseFill className='text-3xl'/>
                    </button> 
                </div>
            </div>
        
    </div>
  )
}

export default ChatHeader