import { useEffect, useState } from "react";
import { useAppStore } from "../../store"
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoMoon, IoSunny } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "../../components/ui/input";
import { colors } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { apiClient } from "../../lib/api-client";
import { ADD_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE, HOST, REMOVE_PROFILE_IMAGE_ROUTE } from "../../utils/constant";
import { useRef } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const fileInputRef = useRef(null);


  useEffect(() => {
    if(userInfo.profileSetup){
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
      
    }
    if(userInfo.image){
      setImage(`${HOST}/${userInfo.image}`);
    }

  }, [userInfo])

  const validateProfile = () => {
    if(!firstName){
      toast.error("First name is required.");
      return false;
    }
    if(!lastName){
      toast.error("Last name is required.");
      return false;
    }
    return true;
  }
  const saveChanges = async () => {
    if(validateProfile()){
      try{
        const res = await apiClient.post(UPDATE_PROFILE_ROUTE,
          {firstName, lastName, color: selectedColor},
          {withCredentials:true}
        );
        if(res.status===200 && res.data){
          setUserInfo({...res.data});
          toast.success("Profile Updated Successfully.");
          navigate('/chat');
        }

      }
      catch(error){
        toast.error("Failed to update profile.");
      }
    }

  };

  const handleNavigateBack = () => {
    if(userInfo?.profileSetup){
      navigate('/chat');
    }
    else{
      toast.error("Please Complete your Profile setup.");
    }
  }

  const handleFileInputClick = () => {
    
    fileInputRef.current.click();

  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log({file});
    if(file) {
      const formData = new FormData();
      formData.append('profile-image',file);
      const res = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {withCredentials:true});

      if(res.status===200 && res.data.image){
        setUserInfo({...userInfo, image:res.data.image});
        toast.success("Image Uploaded Successfully.");
      }

      
    }
  };

  const handleDeleteImage = async () => {
    try{
      const res = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {withCredentials:true});
      if(res.status === 200 ){
        setUserInfo({...userInfo, image: null});
        toast.success("Image Removed Successfully");
        setImage(null);
      }

    }
    catch{
      toast.error("Failed to remove image.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-6 right-6 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700' 
            : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200 shadow-sm'
        }`}
      >
        {isDarkMode ? <IoSunny className="text-lg" /> : <IoMoon className="text-lg" />}
      </button>
      
      <div className="w-full max-w-5xl">
        

        <div className="flex items-center justify-between mb-16">
          <button 
            onClick={() => navigate(-1)}
            className={`flex items-center gap-4 transition-colors group ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <IoArrowBack onClick={handleNavigateBack} className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="text-base font-medium">Back</span>
          </button>
          <div className="text-center">
            <h1 className={`text-2xl font-medium mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Setup Your Profile</h1>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Complete your information to get started</p>
          </div>
          <div className="w-20"></div> 
        </div>

      
        <div className={`backdrop-blur-sm rounded-2xl border overflow-hidden transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-900/50 border-gray-800' 
            : 'bg-gray-100/80 border-gray-300 shadow-xl'
        }`}>
          <div className="grid lg:grid-cols-5 gap-0">
            
            
            <div className={`lg:col-span-2 p-12 flex flex-col items-center justify-center space-y-10 transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-900/30' : 'bg-gray-50/50'
            }`}>
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className="w-40 h-40 relative">
                  <Avatar className={`w-full h-full border-2 shadow-xl transition-colors duration-300 ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  }`}>
                    {image ? (
                      <AvatarImage 
                        src={image} 
                        alt="profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-5xl font-medium rounded-full transition-colors duration-300 ${getColor(selectedColor)}`}>
                        {firstName ? firstName.charAt(0).toUpperCase() : userInfo?.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </Avatar>
                  
                  {hovered && (
                    <div
                    onClick={image ? handleDeleteImage : handleFileInputClick} 
                    className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center transition-all duration-200">
                      {image ? (
                        <FaTrash className="text-white text-2xl hover:text-red-400 transition-colors" />
                      ) : (
                        <FaPlus className="text-white text-2xl hover:text-blue-400 transition-colors" />
                      )}
                    </div>
                  )}
                  <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden " 
                  onChange={handleImageChange} 
                  name = "profile-image" 
                  accept=".png,.jpg,.jpeg,.svg,.webp"/>

                </div>
              </div>

              
              <div className="flex gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-full ${color} transition-all duration-200 hover:scale-105 ${
                      selectedColor === index 
                        ? "ring-2 ring-white/70 scale-105" 
                        : "hover:ring-1 hover:ring-white/40"
                    }`}
                    onClick={() => setSelectedColor(index)}
                  />
                ))}
              </div>
              
              <p className={`text-sm text-center max-w-xs leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Choose an avatar color or upload your own profile picture
              </p>
            </div>

            {/* Form Section - Better typography hierarchy */}
            <div className="lg:col-span-3 p-12">
              <div className="max-w-md space-y-8">
                
                {/* Section title with better hierarchy */}
                <div className="space-y-2">
                  <h2 className={`text-xl font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Personal Information</h2>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Complete your profile to get started</p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className={`block text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Email Address</label>
                    <Input 
                      type="email" 
                      disabled 
                      value={userInfo?.email || ''} 
                      className={`h-12 rounded-lg text-base transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 border-gray-700 text-gray-400' 
                          : 'bg-gray-100 border-gray-300 text-gray-500'
                      }`}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className={`block text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>First Name</label>
                    <Input 
                      type="text" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      placeholder="Enter your first name"
                      className={`h-12 rounded-lg text-base transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800/30 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500 focus:bg-gray-800/50' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white'
                      }`}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className={`block text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Last Name</label>
                    <Input 
                      type="text" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      placeholder="Enter your last name"
                      className={`h-12 rounded-lg text-base transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800/30 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500 focus:bg-gray-800/50' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className={`w-full h-14 font-medium text-base hover:scale-102 rounded-lg transition-all duration-300 tracking-wide ${
                      isDarkMode 
                        ? 'bg-slate-300 text-gray-900 hover:bg-gray-100 active:bg-gray-200' 
                        : 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700'
                    }`}
                    onClick={saveChanges}
                  >
                    Complete Profile
                  </Button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Profile
