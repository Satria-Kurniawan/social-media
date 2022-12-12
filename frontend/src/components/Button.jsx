function Button({
  text,
  backgroundColor,
  hoverColor,
  icon,
  disabled,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full relative inline-flex items-center justify-center text-white p-4 px-6 py-2.5 overflow-hidden font-medium shadow-md transition duration-300 ease-out border rounded-md group`}
      style={{ backgroundColor: backgroundColor }}
      disabled={disabled}
    >
      <span
        className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full ${
          !disabled && "group-hover:translate-x-0"
        } ease`}
        style={{ backgroundColor: hoverColor }}
      >
        {icon}
      </span>
      <span
        className={`absolute flex items-center justify-center w-full h-full transition-all duration-300 transform ${
          !disabled && "group-hover:translate-x-full"
        } ease`}
      >
        {text}
      </span>
      <span className="relative invisible">{text}</span>
    </button>
  )
}

export default Button
