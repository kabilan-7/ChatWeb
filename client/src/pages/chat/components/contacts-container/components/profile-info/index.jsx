import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useAppStore } from '@/store'
import { getColor } from '@/lib/utils'
import { HOST } from '@/utils/constants'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FiEdit2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { IoLogOut } from 'react-icons/io5'
import { apiClient } from '@/lib/api-client'
import { LOGOUT_ROUTE } from '@/utils/constants'

const ProfileInfo = () => {
    const {userInfo,setUserInfo} = useAppStore()
    const navigate = useNavigate()

    const logOut = async()=>{
        try{
          const response = await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true})
          if(response.status == 200){
            navigate('/profile')
            setUserInfo(null)
          }
        }catch(error){
           console.log(error)
        }
    }
  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#212b33]'>
      <div className="flex gap-3 items-center justify-center">
         <div className='h-12 w-12 relative'>
         <Avatar className='h-12 w-12  rounded-full overflow-hidden'>
          {userInfo.image?(<AvatarImage src={`${HOST}/${userInfo.image}`} alt='profile' className='object-cover w-full h-full rounded-full bg-black'/>):
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
      <div className="flex gap-5">
      <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <FiEdit2 onClick={()=>navigate('/profile')} className="text-purple-500 text-xl font-medium" />
    </TooltipTrigger>
    <TooltipContent>
      <p>Edit profile</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <IoLogOut onClick={logOut} className="text-purple-500 text-2xl font-medium" />
    </TooltipTrigger>
    <TooltipContent>
      <p>Log out</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

      </div>
    </div>
  )
}

export default ProfileInfo
