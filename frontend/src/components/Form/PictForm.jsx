import { useState, useEffect } from "react"
import { MdClose, MdOutlinePhotoLibrary, MdUpload } from "react-icons/md"

function PictForm({ file, onChange, remove }) {
  const [fileDataURL, setFileDataURL] = useState(null)

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader()

      fileReader.onload = (e) => {
        setFileDataURL(e.target.result)
      }

      fileReader.readAsDataURL(file)
    }
  }, [file])

  const removeFile = () => {
    remove()
    setFileDataURL(null)
  }

  return (
    <div className="h-80 flex justify-center items-center">
      {fileDataURL ? (
        <div className="relative">
          <img src={fileDataURL} className="max-h-[16rem]" />
          <div
            onClick={removeFile}
            className="absolute bottom-2 right-2 rounded-full p-2 bg-[#222] text-white opacity-90 cursor-pointer"
          >
            <MdClose size={20} />
          </div>
        </div>
      ) : (
        <div>
          <MdOutlinePhotoLibrary size={80} className="mx-auto mb-5" />
          <p className="text-xl text-gray-500 mb-5">
            Seret foto dan video disini
          </p>
          <label htmlFor="file" className="flex justify-center cursor-pointer">
            <span className="rounded-md bg-primary py-1.5 px-3 text-white font-semibold">
              Pilih dari komputer
            </span>
            <input
              onChange={onChange}
              id="file"
              type="file"
              className="hidden"
              required
            />
          </label>
        </div>
      )}
    </div>
  )
}

export default PictForm
