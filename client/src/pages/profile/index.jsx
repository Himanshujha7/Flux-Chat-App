import { useState } from "react";
import { useAppStore } from "../../store"
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "../../components/ui/input";
import { colors } from "../../lib/utils";

const Profile = () => {
  const navigate = useNavigate();
  const {userInfo} = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);


  const saveChanges = async () => {};

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer"/>

        </div>
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {
                image ? <AvatarImage src={image} 
                alt = "profile"
                className="object-cover w-full h-full bg-black"/> :
                <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl font-bold flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {
                    firstName? firstName.split("").shift()
                    : userInfo.email.split("").shift()
                  }
                </div>
              }
            </Avatar>
            {
              hovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 ring-fuchsia-50 rounded-full transition-all duration-200">
                  {
                    image ? <FaTrash  className="text-white text-3xl cursor-pointer"/> : <FaPlus className="text-white text-3xl cursor-pointer"/>
                  }
                </div>
              )}

          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input placeholder = "Email" 
              type="email" 
              disabled value={userInfo.email} 
              className="rounded-lg p-6 bg-[#2c2e3a] border-none text-gray-400"/>
            </div>
            <div className="w-full">
              <Input 
              placeholder = "First Name" 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="rounded-lg p-6 bg-[#2c2e3a] border-1 border-gray-700"/>
            </div>
            <div className="w-full">
              <Input placeholder = "Second Name" 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="rounded-lg p-6 bg-[#2c2e3a] border-1 border-gray-700"/>
            </div>
            <div className="w-full gap-5 flex ">
              {
                colors.map((color, index) =>  <div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300`}></div>)
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Profile
