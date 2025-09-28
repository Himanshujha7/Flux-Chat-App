import Background from "@/assets/login2.png";
import Flux from "@/assets/flx.svg";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";


const Auth = () => {
  const navigate = useNavigate();

  const {setUserInfo} = useAppStore();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "", confirmPassword: "" });
  const [activeTab, setActiveTab] = useState("login");

  // Get current form data based on active tab
  const email = activeTab === "login" ? loginData.email : signupData.email;
  const password = activeTab === "login" ? loginData.password : signupData.password;
  const confirmPassword = signupData.confirmPassword;
  

  const validatesLogin = () => {
    if(!loginData.email.length){
      toast.error("Email is required.");
      return false;
    }
    if(!loginData.password.length){
      toast.error("Password is required.");
      return false;
    }
    return true;
  }

  const validatesSignup = () => {
    if(!signupData.email.length){
      toast.error("Email is required.");
      return false;
    }
    if(!signupData.password.length){
      toast.error("Password is required.");
      return false;
    }
    if(signupData.password !== signupData.confirmPassword){
      toast.error("Password and confirm password do not match.");
      return false;
    }
    return true;
  };


  const handleLogin = async () => {
    if(validatesLogin()){
      try {
        const res = await apiClient.post(
          LOGIN_ROUTE,
          {email: loginData.email, password: loginData.password},
          {withCredentials : true}
        );
        if(res.data.user.id){
          setUserInfo(res.data.user);
          if(res.data.user.profileSetup) navigate("/chat");
          else navigate("/profile");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
      }
    }
  };

  const handleSignup = async () => {
    if(validatesSignup()){
      try {
        const res = await apiClient.post(
          SIGNUP_ROUTE, 
          {email: signupData.email, password: signupData.password},
          {withCredentials : true}
        );
        if(res.status === 201){
          setUserInfo(res.data.user);
          navigate("/profile");
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-6xl overflow-hidden relative">
        <div className="flex flex-col xl:flex-row min-h-[600px]">
          
          {/* Gradient Side - Always Left */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 xl:p-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <div className="text-center space-y-6">
              <img src={Flux} alt="flux" className="h-20 xl:h-[120px] mx-auto"/>
              <div className="space-y-2">
                <h1 className="text-2xl xl:text-4xl font-bold">Flux Chat</h1>
                <p className="text-purple-100 text-sm xl:text-lg">Join the chat, meet new people, and vibe</p>
              </div>
            </div>
          </div>

          {/* Form Side - Always Right */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 xl:p-12 bg-white">
            <div className="w-full max-w-sm">
              
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl xl:text-3xl font-bold text-gray-900">
                  {activeTab === 'login' ? 'Welcome back' : 'Join the vibe'}
                </h2>
                <p className="text-gray-600 text-sm xl:text-base">
                  {activeTab === 'login' 
                    ? 'Ready to continue your conversations?' 
                    : 'Create your account and start vibing'
                  }
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-gray-100 rounded-lg w-full h-12 mb-8">
                  <TabsTrigger 
                    value="login" 
                    className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold rounded-md h-10 w-full text-sm xl:text-base transition-all duration-300"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold rounded-md h-10 w-full text-sm xl:text-base transition-all duration-300"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <div className="min-h-[280px] flex flex-col justify-between">
                  <TabsContent value="login" className="space-y-6">
                    <div className="space-y-4">
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        className="h-12 xl:h-14 px-4 xl:px-6 rounded-full" 
                        value={loginData.email} 
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      />
                      <Input 
                        placeholder="Enter your password" 
                        type="password" 
                        className="h-12 xl:h-14 px-4 xl:px-6 rounded-full" 
                        value={loginData.password} 
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      />
                      <div className="h-[60px]"></div> {/* Spacer to match signup height */}
                    </div>
                    <Button 
                      className="w-full h-12 xl:h-14 bg-gray-900 hover:bg-gray-700 active:bg-black text-white font-semibold rounded-full text-base xl:text-lg transition-all duration-200 shadow-sm hover:shadow-lg active:shadow-xl transform active:scale-[0.98]"
                      onClick={handleLogin}
                    >
                      Let me in
                    </Button>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-6">
                    <div className="space-y-4">
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        className="h-12 xl:h-14 px-4 xl:px-6 rounded-full" 
                        value={signupData.email} 
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      />
                      <Input 
                        placeholder="Enter your password" 
                        type="password" 
                        className="h-12 xl:h-14 px-4 xl:px-6 rounded-full" 
                        value={signupData.password} 
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      />
                      <Input 
                        placeholder="Confirm your password" 
                        type="password" 
                        className="h-12 xl:h-14 px-4 xl:px-6 rounded-full" 
                        value={signupData.confirmPassword} 
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      />
                    </div>
                    <Button 
                      className="w-full h-12 xl:h-14 bg-gray-900 hover:bg-gray-700 active:bg-black text-white font-semibold rounded-full text-base xl:text-lg transition-all duration-200 shadow-sm hover:shadow-lg active:shadow-xl transform active:scale-[0.98]"
                      onClick={handleSignup}
                    >
                      Count me in
                    </Button>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

