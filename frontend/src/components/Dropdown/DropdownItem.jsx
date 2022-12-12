import { useNavigate } from "react-router-dom"

function DropdownItem({ icon, name, to, action }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => (action ? action() : navigate(to))}
      className="rounded-lg py-1 px-2 hover:bg-primary group cursor-pointer"
    >
      <div className="flex items-center gap-x-5 font-semibold">
        <span className="rounded-full bg-gray-200 p-1 w-9 h-9 flex justify-center items-center">
          {icon}
        </span>
        <span className="group-hover:text-white">{name}</span>
      </div>
    </div>
  )
}

export default DropdownItem
