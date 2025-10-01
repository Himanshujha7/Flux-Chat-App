import React from 'react'
import { motion } from 'framer-motion'

const ChatAnimation = () => {
  return (
    <div className="relative w-80 h-80">
      
      {/* Floating Message Bubbles */}
      <motion.div
        className="absolute top-16 left-8 w-16 h-10 bg-purple-500/20 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-32 right-12 w-20 h-12 bg-blue-500/20 rounded-full"
        animate={{ 
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute bottom-24 left-16 w-14 h-8 bg-green-500/20 rounded-full"
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-24 h-24 border-2 border-purple-400/30 rounded-full"></div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </motion.div>


    </div>
  )
}

export default ChatAnimation