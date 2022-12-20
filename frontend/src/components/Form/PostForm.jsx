import { useEffect, useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

import { MdTagFaces } from "react-icons/md"

function PostForm({ file, caption, setCaption, location, setLocation }) {
  const { account } = useContext(AuthContext)

  const [fileDataURL, setFileDataURL] = useState(null)
  const captionMaxLength = 2000

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader()

      fileReader.onload = (e) => {
        setFileDataURL(e.target.result)
      }

      fileReader.readAsDataURL(file)
    }
  }, [file])

  return (
    <div className="flex gap-x-3">
      <div>
        <img src={fileDataURL} alt="" className="max-w-[20rem]" />
      </div>
      <div className="w-full flex flex-col justify-between p-3">
        <div className="w-full">
          <div className="flex items-center gap-x-3 mb-3">
            <img
              src={
                account.profilePict
                  ? process.env.REACT_APP_API_BASE_URL +
                    "/profilePictures/" +
                    account.profilePict
                  : "/persons/blank_avatar.png"
              }
              className="rounded-full w-8 h-8"
              alt="Profile"
            />
            <span className="font-semibold">{account.name}</span>
          </div>
          <textarea
            placeholder="Tulis keterangan..."
            className="bg-light resize-none focus:outline-none"
            cols="30"
            onChange={(e) =>
              setCaption((current) => (current = e.target.value))
            }
            maxLength={captionMaxLength}
            value={caption}
          ></textarea>
        </div>
        <div className="flex justify-between">
          <MdTagFaces size={25} className="text-gray-400" />
          {caption.length}/{captionMaxLength}
        </div>
      </div>
    </div>
  )
}

export default PostForm
