import React, { createContext, useContext, useEffect } from "react"
import io from "socket.io-client"

const SocketContext = createContext()

export const SocketProvider = ({ url, options, children }) => {
  const socket = io(url, options)

  // useEffect(() => {
  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [socket])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
