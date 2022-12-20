import { useState, useEffect } from "react"
import axios from "axios"

import { FaChevronDown, FaHeart, FaLayerGroup } from "react-icons/fa"
import { MdBookmarks } from "react-icons/md"
import { IoMdChatbubbles } from "react-icons/io"
import { IoPeopleCircleSharp, IoPersonCircleSharp } from "react-icons/io5"
import { BsFillCollectionPlayFill } from "react-icons/bs"

import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar/Sidebar"
import SidebarItem from "../components/Sidebar/SidebarItem"
import Feeds from "../components/Feeds/Feeds"

function Home() {
  const [showMore, setShowMore] = useState(true)

  const firstMenusLeft = [
    { name: "Satria", foto: "/persons/fb_profile.jpg" },
    // { name: "Buat", icon: <BsPlusCircleFill size={25} /> },
    { name: "Feeds", icon: <FaLayerGroup size={25} /> },
    { name: "Chats", icon: <IoMdChatbubbles size={25} /> },
    { name: "Vidio", icon: <BsFillCollectionPlayFill size={25} /> },
    { name: "Teman", icon: <IoPersonCircleSharp size={25} /> },
    { name: "Grup", icon: <IoPeopleCircleSharp size={25} /> },
    { name: "Disukai", icon: <FaHeart size={25} /> },
    { name: "Tersimpan", icon: <MdBookmarks size={25} /> },
  ]

  const moreMenus = !showMore ? firstMenusLeft?.slice(0, 6) : firstMenusLeft

  const firstMenusRight = [
    { name: "Neymar", foto: "/persons/blank_avatar.png" },
    { name: "Lewandowski", foto: "/persons/blank_avatar.png" },
    { name: "Messi", foto: "/persons/blank_avatar.png" },
  ]

  const [discoverPeople, setDiscoverPeople] = useState([])
  const [folowings, setFollowings] = useState([])

  useEffect(() => {
    axios
      .get("/api/accounts/discover")
      .then((response) => setDiscoverPeople(response.data.discover))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    axios
      .get("/api/accounts/followings")
      .then((response) => setFollowings(response.data.followings))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <Topbar />
      <div className="w-full flex justify-between">
        <Sidebar background={"#FDFDFD"} additional={"border-x"}>
          {moreMenus.map((menu, i) => (
            <SidebarItem key={i} item={menu} />
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
          {folowings.length > 0 && (
            <>
              <h1 className="text-xl font-semibold mb-3">Mengikuti</h1>
              {folowings?.map((following, i) => (
                <SidebarItem
                  key={i}
                  item={following}
                  isUser={true}
                  isFollowing={true}
                />
              ))}
            </>
          )}
        </Sidebar>
        <Feeds />
        <Sidebar>
          {discoverPeople.length > 0 && (
            <>
              <h1 className="text-xl font-semibold mb-3">Temukan Orang</h1>
              {discoverPeople.map((poeple, i) => (
                <SidebarItem
                  key={i}
                  item={poeple}
                  isUser={true}
                  isDiscover={true}
                />
              ))}
              <hr className="border-t border-gray-200 mb-4" />
            </>
          )}
          <h1 className="text-xl font-semibold mb-3">Sedang Online</h1>
          {firstMenusRight.map((menu, i) => (
            <SidebarItem key={i} item={menu} online={true} />
          ))}
        </Sidebar>
      </div>
    </>
  )
}

export default Home
