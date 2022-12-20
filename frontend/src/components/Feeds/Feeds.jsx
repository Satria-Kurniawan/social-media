import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../features/posts/postsActions"

import Feed from "./Feed/Feed"

function Feeds() {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <div id="feed" className="h-screen overflow-auto">
      <div className="rounded-xl bg-light border py-5 px-5 w-[35rem] m-3 flex justify-around gap-x-3">
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/icons/Logo_Social_Elite.png"
              alt=""
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Dummy</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/icons/Logo_Social_Elite.png"
              alt=""
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Dummy</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              alt=""
              src="/icons/Logo_Social_Elite.png"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Dummy</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/icons/Logo_Social_Elite.png"
              alt=""
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Dummy</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              alt=""
              src="/icons/Logo_Social_Elite.png"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Dummy</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              alt=""
              src="/icons/Logo_Social_Elite.png"
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Dummy</h1>
        </div>
        <div>
          <div className="w-14 h-14 rounded-full bg-light border-2 border-primary flex">
            <img
              src="/icons/Logo_Social_Elite.png"
              alt=""
              className="w-12 h-12 rounded-full m-auto"
            />
          </div>
          <h1 className="text-sm mt-1">Dummy</h1>
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
        posts.map((post, i) => <Feed key={i} post={post} />)
      )}
    </div>
  )
}

export default Feeds
