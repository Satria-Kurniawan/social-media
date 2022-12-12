function Sidebar({ children, background, additional }) {
  return (
    <aside
      id="sidebar"
      className={`w-full max-w-xs h-screen sticky top-0 overflow-auto p-5 ${additional}`}
      style={{ background: background }}
    >
      {children}
    </aside>
  )
}

export default Sidebar
