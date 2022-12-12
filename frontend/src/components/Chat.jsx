function Chat() {
  return (
    <div className="w-full">
      <div className="h-full mx-auto bg-light p-5 flex flex-col gap-y-3">
        <div>
          <div className="flex items-center gap-x-3">
            <img
              src="/persons/fb_profile.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="rounded-full bg-gray-200 py-1 px-3">
              What's up bro!
            </span>
          </div>
          <p className="text-sm text-gray-400">5 hours ago</p>
        </div>
        <div>
          <div className="flex items-center gap-x-3">
            <img
              src="/persons/fb_profile.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="rounded-full bg-gray-200 py-1 px-3">
              How are you?
            </span>
          </div>
          <p className="text-sm text-gray-400">5 hours ago</p>
        </div>
        <div className="ml-auto">
          <div className="flex items-center gap-x-3">
            <img
              src="/persons/fb_profile.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="rounded-full bg-primary text-white py-1 px-3">
              Was good bro
            </span>
          </div>
          <p className="text-sm text-gray-400 text-end">5 hours ago</p>
        </div>
        <div className="ml-auto">
          <div className="flex items-center gap-x-3">
            <img
              src="/persons/fb_profile.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="rounded-full bg-primary text-white py-1 px-3">
              How about you?
            </span>
          </div>
          <p className="text-sm text-gray-400 text-end">5 hours ago</p>
        </div>
      </div>
    </div>
  )
}

export default Chat
