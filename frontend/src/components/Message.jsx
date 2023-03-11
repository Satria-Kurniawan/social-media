import ReactTimeAgo from "react-time-ago"

const Message = ({ message, sender }) => {
  return (
    <div className={`${message.senderId !== sender._id ? "ml-auto" : ""}`}>
      <div className="flex items-center gap-x-3">
        <img
          src={
            message.senderPict
              ? process.env.REACT_APP_API_BASE_URL +
                "/profilePictures/" +
                message.senderPict
              : "/persons/blank_avatar.png"
          }
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="rounded-full bg-gray-200 py-1 px-3">
          {message.text}
        </span>
      </div>
      <p className="text-sm text-gray-400">
        <ReactTimeAgo
          date={Date.parse(message.createdAt) || message.createdAt}
          locale="en-US"
        />
      </p>
    </div>
  )
}

export default Message
