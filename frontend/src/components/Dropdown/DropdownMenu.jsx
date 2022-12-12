import { useRef } from "react"
import { useEffect } from "react"

function DropdownMenu({ children, open, menuRef, close }) {
  const dropdownRef = useRef()

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        !dropdownRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      )
        close()
    }
    document.addEventListener("mousedown", clickOutside)

    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }
  }, [])

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-16 right-5 min-w-[12rem] rounded-lg bg-white border shadow-md p-3 flex flex-col gap-y-2 ${
        open ? "opacity-100" : "opacity-0 translate-x-5 pointer-events-none"
      } duration-300`}
    >
      {children}
    </div>
  )
}

export default DropdownMenu
