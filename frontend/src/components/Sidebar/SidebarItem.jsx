function SidebarItem({ menu, online }) {
  return (
    <ul>
      <li className="font-semibold text-gray-500">{menu.title}</li>
      <li className="flex items-center gap-x-3 mb-4 cursor-pointer">
        <div className="relative">
          {menu.foto ? (
            <img src={menu.foto} className="rounded-full w-8 h-8" alt="Menu" />
          ) : (
            <div className="text-primary w-8 h-8">{menu.icon}</div>
          )}

          {online && (
            <div className="absolute bottom-0 right-0 rounded-full w-2 h-2 bg-green-500"></div>
          )}
        </div>
        <span className="font-semibold">{menu.name}</span>
      </li>
    </ul>
  )
}

export default SidebarItem
