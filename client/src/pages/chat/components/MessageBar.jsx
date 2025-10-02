import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { RiEmojiStickerLine } from 'react-icons/ri'
import EmojiPicker from 'emoji-picker-react'

const MessageBar = () => {

  const emojiRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState("")

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Handle send message logic here
      setMessage("")
      setEmojiPickerOpen(false)
    }
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if(emojiRef.current && !emojiRef.current.contains(e.target)){
        // Additional check for emoji picker elements
        const emojiPickerElement = document.querySelector('.EmojiPickerReact');
        if (!emojiPickerElement || !emojiPickerElement.contains(e.target)) {
          setEmojiPickerOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-6 mb-4 gap-4'>

      <div className='flex-1 flex bg-[#2a2b33] rounded-2xl items-center gap-2 pr-2 border border-gray-700/50 hover:border-gray-600/50 transition-colors duration-200'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text" 
          className='flex-1 p-4 bg-transparent rounded-2xl focus:outline-none text-white placeholder-gray-400' 
          placeholder="Type a message..." 
        />
        
        <button 
          className='text-gray-400 hover:text-gray-300 focus:outline-none transition-colors duration-200 p-4 rounded-full hover:bg-gray-700/30'
        >
          <GrAttachment className='text-xl' />
        </button>
        
        <div className="relative" ref={emojiRef}>
          <button 
            className='text-gray-400 hover:text-gray-300 focus:outline-none transition-colors duration-200 p-4 rounded-full hover:bg-gray-700/30'
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          >
            <RiEmojiStickerLine className='text-xl' />
          </button>
          
          {emojiPickerOpen && (
            <div className='absolute bottom-14 right-0 z-50'>
              <EmojiPicker 
                onEmojiClick={handleAddEmoji}
                theme="dark"
                width={350}
                height={400}
                autoFocusSearch={false}
              />
            </div>
          )}
        </div>
      </div>
      <button className='bg-slate-600 rounded-lg flex items-center justify-center p-5 hover:bg-slate-500 focus:bg-slate-500  focus:border-none focus:outline-none
          text-white duration-300 transition-all'
          onClick={handleSendMessage}>
          <IoSend className='text-xl' />
        </button>
    </div>
  )
}

export default MessageBar
