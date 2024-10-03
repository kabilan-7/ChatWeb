import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useAppStore } from '@/store'
import { getColor } from '@/lib/utils'
const ProfileInfo = () => {
    const {userInfo} = useAppStore()
  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#212b33]'>
      <div className="flex gap-3 items-center justify-center">
         <div className='h-12 w-12 relative'>
         <Avatar className='h-12 w-12  rounded-full overflow-hidden'>
          {userInfo.image?(<AvatarImage src={`${HOST}/${userInfo.image}`} alt='profile' className='object-cover w-full h-full bg-black'/>):
          (<div className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
            {userInfo.firstName?userInfo.firstName.split("").shift():userInfo.email.split("").shift()}
            </div>)}
           </Avatar>
         </div>
         <div>
            {
                userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}`: ""
            }
         </div>
      </div>
    </div>
  )
}

export default ProfileInfo
