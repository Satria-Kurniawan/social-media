import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useSocket } from "../context/SocketContext"
import axios from "axios"

import { MdSearch } from "react-icons/md"

import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar/Sidebar"
import SidebarItem from "../components/Sidebar/SidebarItem"
import Chat from "../components/Chat"

function ChatsPage() {
  const { account } = useContext(AuthContext)
  const socket = useSocket()

  const [followings, setFollowings] = useState([])

  useEffect(() => {
    axios
      .get("/api/accounts/followings")
      .then((response) => setFollowings(response.data.followings))
      .catch((error) => console.log(error))
  }, [])

  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    socket.emit("user-connected", account._id)
    socket.on("get-online-users", (users) => {
      setOnlineUsers(
        followings.filter((fUser) =>
          users.some(
            (oUser) =>
              oUser.userId === fUser.userId && oUser.userId !== account._id
          )
        )
      )
    })

    return () => {
      socket.off("get-online-users")
    }
  }, [socket, account, followings])

  const comparisonResult = followings.map((obj1) => {
    const obj2 = onlineUsers.find((o) => o.userId === obj1.userId)

    if (obj2) {
      // Both objects have the same ID
      if (obj1.userId === obj2.userId) {
        return { ...obj1, ...{ status: "online" } }
      } else {
        return { ...obj1, ...{ status: "offline" } }
      }
    } else {
      // Object with the same ID not found in array2
      return { ...obj1, ...{ status: "offline" } }
    }
  })

  const [conversations, setConversations] = useState([])

  useEffect(() => {
    axios
      .get(`/api/conversations/${account._id}`)
      .then((response) => setConversations(response.data))
      .then((eror) => console.log(eror))
  }, [account])

  const [selectedConversation, setSelectedConversation] = useState(null)
  const [arrivalMessage, setArrivalMessage] = useState(null)

  useEffect(() => {
    socket.on("getMessage", (msg) =>
      setArrivalMessage({
        senderId: msg.senderId,
        text: msg.text,
        createdAt: Date.now(),
      })
    )
  }, [socket, selectedConversation])

  return (
    <>
      <Topbar />
      <div className="flex justify-between">
        <Sidebar background={"#FDFDFD"} additional={"border-x"}>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MdSearch size={20} />
            </div>

            <input
              type="text"
              placeholder="Cari percakapan..."
              className="w-full rounded-full bg-gray-100 py-1.5 px-3 pl-10 focus:outline-primary"
            />
          </div>
          {conversations.map((cs, i) => (
            <div key={i} onClick={() => setSelectedConversation(cs)}>
              <SidebarItem
                item={{
                  userId: cs.members.find((userId) => userId !== account._id),
                }}
                isUser={true}
              />
            </div>
          ))}
        </Sidebar>
        <Chat
          socket={socket}
          sender={account}
          selectedConversation={selectedConversation}
          arrivalMessage={arrivalMessage}
        />
        <Sidebar background={"#FDFDFD"} additional={"border-x"}>
          <h1 className="text-xl font-semibold mb-3">Mengikuti</h1>
          {comparisonResult.map((user, i) =>
            user.status === "online" ? (
              <div key={i} onClick={() => setSelectedConversation(user)}>
                <SidebarItem
                  item={user}
                  online={true}
                  isUser={true}
                  isFollowing={true}
                />
              </div>
            ) : (
              <div key={i} onClick={() => setSelectedConversation(user)}>
                <SidebarItem
                  item={user}
                  online={false}
                  isUser={true}
                  isFollowing={true}
                />
              </div>
            )
          )}
        </Sidebar>
      </div>
    </>
  )
}

export default ChatsPage
