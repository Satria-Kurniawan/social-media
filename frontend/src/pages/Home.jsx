import { useState } from "react"

import { FaChevronDown, FaLayerGroup } from "react-icons/fa"
import { MdBookmarks } from "react-icons/md"
import { IoMdChatbubbles, IoMdThumbsUp } from "react-icons/io"
import { IoPeopleCircleSharp, IoPersonCircleSharp } from "react-icons/io5"
import { BsFillCollectionPlayFill, BsPlusCircleFill } from "react-icons/bs"

import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar/Sidebar"
import SidebarItem from "../components/Sidebar/SidebarItem"
import Feed from "../components/Feed"

function Home() {
  const [showMore, setShowMore] = useState(false)

  const firstMenusLeft = [
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
    { name: "Buat", icon: <BsPlusCircleFill size={25} /> },
    { name: "Feeds", icon: <FaLayerGroup size={25} /> },
    { name: "Chats", icon: <IoMdChatbubbles size={25} /> },
    { name: "Vidio", icon: <BsFillCollectionPlayFill size={25} /> },
    { name: "Teman", icon: <IoPersonCircleSharp size={30} /> },
    { name: "Grup", icon: <IoPeopleCircleSharp size={30} /> },
    { name: "Disukai", icon: <IoMdThumbsUp size={25} /> },
    { name: "Tersimpan", icon: <MdBookmarks size={25} /> },
  ]

  const secondMenusLeft = [
    { name: "Neymar", foto: "/persons/fb_profile.jpg" },
    { name: "Lewandowski", foto: "/persons/fb_profile.jpg" },
    { name: "Ronaldo", foto: "/persons/fb_profile.jpg" },
    { name: "Messi", foto: "/persons/fb_profile.jpg" },
    { name: "Mbapee", foto: "/persons/fb_profile.jpg" },
  ]

  const moreMenus = !showMore ? firstMenusLeft?.slice(0, 6) : firstMenusLeft

  const firstMenusRight = [
    { name: "Neymar", foto: "/persons/fb_profile.jpg" },
    { name: "Lewandowski", foto: "/persons/fb_profile.jpg" },
    { name: "Messi", foto: "/persons/fb_profile.jpg" },
  ]

  return (
    <>
      <Topbar />
      <div className="w-full flex justify-between">
        <Sidebar background={"#FDFDFD"} additional={"border-x"}>
          {moreMenus.map((menu, i) => (
            <SidebarItem key={i} menu={menu} />
          ))}
          {moreMenus && (
            <li
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-x-3 mb-4 cursor-pointer"
            >
              <div className="rounded-full w-8 h-8 p-2 bg-gray-200 flex justify-center items-center">
                <FaChevronDown className={`${showMore && "rotate-180"}`} />
              </div>
              <span className="font-semibold">
                {!showMore ? "Lihat Lainya" : "Lihat Lebih Sedikit"}
              </span>
            </li>
          )}
          <hr className="border-t border-gray-200 mb-4" />
          <h1 className="text-xl font-semibold mb-3">Teman Anda</h1>
          {secondMenusLeft.map((menu, i) => (
            <SidebarItem key={i} menu={menu} />
          ))}
        </Sidebar>
        <Feed />
        <Sidebar>
          <h1 className="text-xl font-semibold mb-3">Saran Teman</h1>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-x-3">
              <img
                src={"/persons/fb_profile.jpg"}
                className="rounded-full w-8 h-8"
                alt="Menu"
              />
              <span>Gavi</span>
            </div>
            <span className="text-primary font-semibold text-sm">Ikuti</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-x-3">
              <img
                src={"/persons/fb_profile.jpg"}
                className="rounded-full w-8 h-8"
                alt="Menu"
              />
              <span>Pedri</span>
            </div>
            <span className="text-primary font-semibold text-sm">Ikuti</span>
          </div>
          <hr className="border-t border-gray-200 mb-4" />
          <h1 className="text-xl font-semibold mb-3">Teman Online</h1>
          {firstMenusRight.map((menu, i) => (
            <SidebarItem key={i} menu={menu} online={true} />
          ))}
        </Sidebar>
      </div>
    </>
  )
}

export default Home
