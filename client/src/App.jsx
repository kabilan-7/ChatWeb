import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Auth from '@/pages/auth/Auth'
import Chat from '@/pages/chat/Chat'
import Profile from '@/pages/profile/Profile'
import { useAppStore } from './store'
import { apiClient } from './lib/api-client'
import { GET_USERINFO } from './utils/constants'
import { useState } from 'react'
const PrivateRoute = ({children})=>{
  const {userInfo} = useAppStore()
  const isAuthenticated = !!userInfo
  return isAuthenticated?children:<Navigate to='/auth'/>
}
const AuthRoute = ({children})=>{
  const {userInfo} = useAppStore()
  const isAuthenticated = !!userInfo
  return isAuthenticated?<Navigate to='/chat'/>:children
}
const App = () => {
  const {userInfo,setUserInfo} = useAppStore()
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USERINFO, { withCredentials: true });
        if(response.status===200 && response.data.id){
          setUserInfo(response.data)
        }else{
          setUserInfo(undefined)
        }
        setLoading(false);
      } catch (error) {
        setUserInfo(undefined)
      }finally{
        setLoading(false)
      }
    };
  
    if (!userInfo && document.cookie.includes('jwt')) {  // Only fetch if JWT is set
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  
  
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/auth' element={
      <AuthRoute><Auth/></AuthRoute>
    }/>
    <Route path='/chat' element={
      <PrivateRoute><Chat/></PrivateRoute>
    }></Route>
    <Route path='/profile' element={
      <PrivateRoute><Profile/></PrivateRoute>
    }></Route>
    <Route path='*' element={<Navigate to="/auth"/>}/>
    
   </Routes>
   </BrowserRouter>
  )
}

export default App