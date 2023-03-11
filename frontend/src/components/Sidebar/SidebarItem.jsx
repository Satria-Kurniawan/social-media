import { useEffect, useState } from "react"
import axios from "axios"

function SidebarItem({ item, isUser, isDiscover, isFollowing, online }) {
  const [isFollowed, setIsFollowed] = useState(!isFollowing ? false : true)

  const follow = async () => {
    try {
      setIsFollowed(!isFollowed)
      await axios.patch(`/api/accounts/follow/${item.userId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const [user, setUser] = useState(null)

  useEffect(() => {
    if (item.userId) {
      axios
        .get(`/api/accounts/user/${item.userId}`)
        .then((response) => setUser(response.data))
        .then((eror) => console.log(eror))
    }
  }, [item.userId])

  if (isUser) {
    return (
      <ul>
        <li className="flex justify-between mb-4 cursor-pointer">
          <div className="flex items-center gap-x-3">
            <div className="relative">
              <img
                src={
                  user && user.profilePict
                    ? process.env.REACT_APP_API_BASE_URL +
                      "/profilePictures/" +
                      user.profilePict
                    : "/persons/blank_avatar.png"
                }
                className="rounded-full w-8 h-8"
                alt="Profile"
              />
              {online && (
                <div className="absolute bottom-0 right-0 rounded-full w-2 h-2 bg-green-500"></div>
              )}
            </div>
            <span className="font-semibold">{user && user.name}</span>
          </div>
          {(isDiscover || isFollowing) && (
            <span
              onClick={follow}
              className="text-primary text-sm font-semibold"
            >
              {isFollowed ? (
                <span className="text-red-500">Unfollow</span>
              ) : (
                <span className="text-primary">Follow</span>
              )}
            </span>
          )}
        </li>
      </ul>
    )
  }
  return (
    <ul>
      <li className="font-semibold text-gray-500">{item.title}</li>
      <li className="flex items-center gap-x-3 mb-4 cursor-pointer">
        <div className="relative">
          {item.foto ? (
            <img src={item.foto} className="rounded-full w-8 h-8" alt="item" />
          ) : (
            <div className="text-primary w-8 h-8">{item.icon}</div>
          )}

          {online && (
            <div className="absolute bottom-0 right-0 rounded-full w-2 h-2 bg-green-500"></div>
          )}
        </div>
        <span className="font-semibold">{item.name}</span>
      </li>
    </ul>
  )
}

export default SidebarItem
