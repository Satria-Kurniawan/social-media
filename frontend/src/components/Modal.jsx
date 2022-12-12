import { createPortal } from "react-dom"

import { FaTimes } from "react-icons/fa"

function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return createPortal(
    <>
      <div className="bg-gray-500 opacity-50 fixed top-0 left-0 right-0 bottom-0 z-50" />
      <div className="bg-light border min-w-[25rem] w-auto rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex justify-between items-center py-3 px-5">
          <h1 className="font-semibold text-xl">{title}</h1>
          <button onClick={onClose}>
            <FaTimes size={20} className="text-red-500" />
          </button>
        </div>
        <div className="w-full bg-gray-300 h-[1.5px]" />
        <main className="py-3 px-5">{children}</main>
      </div>
    </>,

    document.getElementById("modal")
  )
}

export default Modal
