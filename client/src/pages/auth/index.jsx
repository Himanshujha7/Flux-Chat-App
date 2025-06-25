import Background from "@/assets/login2.png";
import Flux from "@/assets/flx.svg";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import { toast } from "sonner";
import {apiClient} from "@/lib/api-client";
import {SIGNUP_ROUTE} from "@/utils/constant"
import { LOGIN_ROUTE } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";


const Auth = () => {
  const navigate = useNavigate();

  const {setUserInfo} = useAppStore();

  const [email,setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =useState("");
  const [activeTab, setActiveTab] = useState("login");
  

  const validatesLogin =() =>{
    if(!email.length){
      toast.error("Email is required.");
      return false;
    }
    if(!password.length){
      toast.error("Password is required.");
      return false;
    }
    return true;

  }
  const validatesSignup = () =>{
    if(!email.length){
      toast.error("Email is required.");
      return false;
    }
    if(!password.length){
      toast.error("Password is required.");
      return false;
    }
    if(password!=confirmPassword){
      toast.error("Password and confirm password do not match.");
      return false;
    }

    return true;
  };


  const handleLogin = async () => {
    if(validatesLogin()){
      const res = await apiClient.post(
        LOGIN_ROUTE,
        {email, password},
        {withCredentials : true}
      );
      if(res.data.user.id){
        setUserInfo(res.data.user);
        if(res.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
    }

  };

  const handleSignup = async () => {
    if(validatesSignup()){
      const res = await apiClient.post(
        SIGNUP_ROUTE, 
        {email, password},
        {withCredentials : true}
    );
    if(res.status === 201){
      setUserInfo(res.data.user);
      navigate("/profile");
    }
      console.log(res);
    }
    
  };

  
  return (
    <div className=" h-[100vh] flex items-center justify-center">

      <div className="  bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-2xl grid xl:grid-cols-2 p-4">

        <div className=" flex flex-col gap-10 items-center justify-center">

          <div className="flex items-center justify-center flex-col">

            <div className="flex items-center justify-center">
              {/* <h1 className="text-5xl md:text-6xl font-extrabold">
                Flux
              </h1> */}
              <img src={Flux} alt="flux"  className="flex items-center justify-center h-[120px]"/>
              <img src={Victory} alt="emoji" className="h-[80px] "/>
            </div>
            <p className="font-medium text-center text-gray-700"> Join the chat, meet new people, and vibe ✨ </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                {activeTab === 'login' ? 'Welcome back!' : 'Join the vibe!'}
              </h2>
              <p className="font-medium text-center text-gray-700 ">
                  {activeTab === 'login' 
                    ? 'Ready to continue your conversations?' 
                    : 'Create your account and start vibing!'
                  }
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger className="data-[state=active]:bg-transparent  text-black text-opacity-80 
                 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold 
                 data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value ="login">Login</TabsTrigger>
                <TabsTrigger  className="data-[state=active]:bg-transparent text-black text-opacity-80
                 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold 
                 data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value = "signup">Signup</TabsTrigger>
              </TabsList>
              <TabsContent className=" flex flex-col gap-5 mt-10" value="login">
              <Input 
              placeholder ="Enter your email" 
              type="email" 
              className="rounded-full p-6" 
              value={email} onChange = {(e)=>setEmail(e.target.value)}
              />
              <Input 
              placeholder ="Enter your password" 
              type="password" 
              className="rounded-full p-6" 
              value={password} onChange = {(e)=>setPassword(e.target.value)}
              />
              <Button className=""
              onClick={handleLogin}>
                Let me in
              </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                <Input 
                placeholder ="Enter your email" 
                type="email" 
                className="rounded-full p-6" 
                value={email} onChange = {(e)=>setEmail(e.target.value)}
              />
              <Input 
                placeholder ="Enter your password" 
                type="password" 
                className="rounded-full p-6" 
                value={password} onChange = {(e)=>setPassword(e.target.value)}
              />
              <Input 
                placeholder ="Confirm your password" 
                type="password" 
                className="rounded-full p-6" 
                value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)}
              />
              <Button className=""
              onClick={handleSignup}>
                Count me in
              </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

