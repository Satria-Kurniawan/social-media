import { useEffect } from "react"
import { format } from "timeago.js"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../features/post/postsActions"

import { FaRegHeart, FaRegComment } from "react-icons/fa"
import { MdBookmarkBorder } from "react-icons/md"
import { BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs"
import { IoPaperPlaneOutline } from "react-icons/io5"

function Feed() {
  const dispatch = useDispatch()
  const { posts, loading, error, message } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <div id="feed" className="h-screen overflow-auto">
      <div className="mx-auto rounded-xl bg-light border py-5 px-5 w-[35rem] my-3 flex gap-x-3">
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/persons/fb_profile.jpg"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Kurniawan</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/persons/fb_profile.jpg"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Kurniawan</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/persons/fb_profile.jpg"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Kurniawan</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/persons/fb_profile.jpg"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Kurniawan</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/persons/fb_profile.jpg"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Kurniawan</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/persons/fb_profile.jpg"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Kurniawan</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/persons/fb_profile.jpg"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Kurniawan</h1>
        </div>
      </div>
      {/* <div className="mx-auto rounded-xl bg-light border py-3 px-5 w-[35rem] my-3">
        <div className="flex items-center gap-x-3">
          <img
            src="/persons/fb_profile.jpg"
            className="rounded-full w-10 h-10"
            alt="Profile"
          />
          <input
            type="text"
            placeholder="Apa yang anda pikirkan, Satria?"
            className="w-full rounded-full bg-gray-100 py-1.5 px-3 pl-10 focus:outline-primary"
          />
        </div>
        <hr className="border-t border-gray-200 my-3" />
        <div className="grid grid-cols-2">
          <div className="inline-flex gap-x-3 pl-10">
            <FaVideo size={25} className="text-red-400" />
            <span className="font-semibold text-gray-500">
              Video Siaran Langsung
            </span>
          </div>
          <div className="inline-flex gap-x-3 pl-10">
            <MdPhotoLibrary size={25} className="text-green-400" />
            <span className="font-semibold text-gray-500">Foto/Video</span>
          </div>
        </div>
      </div> */}

      {loading ? (
        <div>Loading...</div>
      ) : (
        posts.map((post, i) => (
          <div
            key={i}
            className="mx-auto rounded-xl bg-light border w-[35rem] my-3"
          >
            <div className="flex items-center gap-x-3 py-3 px-5">
              <img
                src={
                  post.user.profilePict
                    ? process.env.REACT_APP_API_BASE_URL +
                      "/profilePictures/" +
                      post.user.profilePict
                    : "/persons/blank_avatar.png"
                }
                className="rounded-full w-10 h-10"
                alt="Profile"
              />
              <div className="w-full flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-x-2">
                    <h1 className="font-semibold">{post.user.name}</h1>
                    <BsFillCheckCircleFill
                      size={15}
                      className="text-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <p className="text-sm text-gray-500">{post.location}</p>
                    {/* <IoEarthSharp size={15} className="text-gray-500" /> */}
                  </div>
                </div>
                <div>
                  <BsThreeDots size={25} />
                </div>
              </div>
            </div>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}/postPictures/${post.picture}`}
              alt="Content"
              className="w-full"
            />
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-x-5">
                  <FaRegHeart size={25} />
                  <FaRegComment size={25} />
                  <IoPaperPlaneOutline size={25} />
                </div>
                <div>
                  <MdBookmarkBorder size={30} />
                </div>
              </div>
              <div className="flex items-center mb-3">
                <img
                  src={"/persons/fb_profile.jpg"}
                  className="rounded-full w-7 h-7 z-10"
                  alt="Menu"
                />
                <img
                  src={"/persons/fb_profile.jpg"}
                  className="rounded-full w-7 h-7 -ml-2"
                  alt="Menu"
                />
                <p className="ml-3">
                  Disukai oleh <span className="font-semibold">Ronaldo</span>{" "}
                  dan
                  <span className="font-semibold">7120 lainnya</span>
                </p>
              </div>
              <p className="mb-2">
                <span className="font-semibold">{post.user.name} </span>
                {post.caption}
              </p>
              <p className="text-gray-400 mb-2">Lihat semua 1,249 komentar</p>
              <p className="text-xs text-gray-400">
                {format(post.createdAt).toUpperCase()}
                <span className="text-black ml-3">Lihat terjemahan</span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Feed
