import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { useDispatch } from "react-redux"
import { likeOrDislikePost } from "../../../features/posts/postsActions"
import { format } from "timeago.js"

import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa"
import { MdBookmarkBorder } from "react-icons/md"
import { BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs"
import { IoPaperPlaneOutline } from "react-icons/io5"
import { useState } from "react"

function Feed({ post }) {
  const { account } = useContext(AuthContext)
  const dispatch = useDispatch()

  const [postLikes, setPostLikes] = useState(post.likes)

  const userHasLikedPost = post.likes.some(
    (like) => like.userId === account._id
  )

  const onLikeOrDislikePost = (postId) => {
    dispatch(likeOrDislikePost(postId))

    if (userHasLikedPost) {
      setPostLikes(post.likes.filter((like) => like.userId !== account._id))
    } else {
      setPostLikes((current) => [
        ...current,
        {
          userId: account._id,
          userName: account.name,
          userPict: account.profilePict,
        },
      ])
    }
  }

  const Likes = () => {
    return postLikes.some((like) => like.userId === account._id) ? (
      <FaHeart
        onClick={() => onLikeOrDislikePost(post._id)}
        size={25}
        className="text-red-500"
      />
    ) : (
      <FaRegHeart onClick={() => onLikeOrDislikePost(post._id)} size={25} />
    )
  }

  return (
    <div className="rounded-xl bg-light border w-[35rem] m-3">
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
              <BsFillCheckCircleFill size={15} className="text-blue-500" />
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
            <Likes />
            <FaRegComment size={25} />
            <IoPaperPlaneOutline size={25} />
          </div>
          <div>
            <MdBookmarkBorder size={30} />
          </div>
        </div>
        {postLikes.length > 0 && (
          <div className="flex items-center mb-3">
            <img
              src={
                postLikes[0].userPict
                  ? process.env.REACT_APP_API_BASE_URL +
                    "/profilePictures/" +
                    postLikes[0].userPict
                  : "/persons/blank_avatar.png"
              }
              className="rounded-full w-7 h-7 z-10"
              alt="Profile"
            />
            {postLikes.length > 1 && (
              <img
                src={
                  postLikes[1].userPict
                    ? process.env.REACT_APP_API_BASE_URL +
                      "/profilePictures/" +
                      postLikes[1].userPict
                    : "/persons/blank_avatar.png"
                }
                className="rounded-full w-7 h-7 z-10 -ml-2"
                alt="Profile"
              />
            )}
            <p className="ml-3">
              Disukai oleh{" "}
              <span className="font-semibold">{postLikes[0]?.userName}</span>{" "}
              {postLikes.length > 1 && (
                <>
                  <span>dan </span>
                  <span className="font-semibold">
                    {postLikes.length - 1} lainnya
                  </span>
                </>
              )}
            </p>
          </div>
        )}
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
  )
}

export default Feed
