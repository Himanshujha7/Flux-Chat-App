
import {BrowserRouter, Navigate, Route, RouterProvider, Routes} from 'react-router-dom'
import Auth from "./pages/auth"
import Chat from "./pages/chat"
import Profile from "./pages/profile"
import { useAppStore } from './store'
import { useEffect } from 'react'
import { useState } from 'react'
import { GET_USER_INFO } from './utils/constant'

const PrivateRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children: <Navigate to='/auth'/>;

}

const AuthRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ?  <Navigate to='/chat'/> : children;

}


function App() {
  const {userInfo, setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res =await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if(res.status===200 && res.data.id){
          setUserInfo(res.data);
        } else{
          setUserInfo(undefined);
        } 
        console.log({res});
      }catch(error) {
          setUserInfo(undefined);
        }
        finally{
          setLoading(false);
        }
    };


    if(!userInfo){
      getUserData();
    }
    else{
      setLoading(false);
    }
  },[userInfo, setUserInfo]);

  if(loading) {
    return <div>
      Loading...
    </div>
  }


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/auth" element={
      <AuthRoute>
        <Auth/>
      </AuthRoute>}/>
      <Route path="/chat" element={
        <PrivateRoute>
          <Chat/>
        </PrivateRoute>
      }/>
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile/>
        </PrivateRoute>
      }/>
      <Route path = "*" element = {<Navigate to='/auth'/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App