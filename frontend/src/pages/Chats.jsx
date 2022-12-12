import { MdSearch } from "react-icons/md"

import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar/Sidebar"
import SidebarItem from "../components/Sidebar/SidebarItem"
import Chat from "../components/Chat"

function ChatsPage() {
  const conversations = [
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
  ]

  const onlineUsers = [
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
  ]

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
            <SidebarItem key={i} menu={cs} />
          ))}
        </Sidebar>
        <Chat />
        <Sidebar background={"#FDFDFD"} additional={"border-x"}>
          <h1 className="text-xl font-semibold mb-3">Teman Online</h1>
          {onlineUsers.map((menu, i) => (
            <SidebarItem key={i} menu={menu} online={true} />
          ))}
        </Sidebar>
      </div>
    </>
  )
}

export default ChatsPage
