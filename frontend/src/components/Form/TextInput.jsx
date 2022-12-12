function TextInput({ onChange, ...inputProps }) {
  return (
    <div className="mb-4">
      <input
        {...inputProps}
        onChange={onChange}
        className="w-full rounded-sm bg-gray-100 border py-3 px-4 focus:outline-primary"
      />
    </div>
  )
}

export default TextInput
