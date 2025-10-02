function TextArea ({ placeholder, callback}) {
  const focusClass = 'focus:outline-none focus:border focus:!border-black focus:dark:!border-white'
  return (
    <textarea
      placeholder={placeholder}
      onChange={(e) => callback(e.target.value)}
      className={`w-full p-2 h-32 mb-4 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 ${focusClass}`}>
    </textarea>
  )
}

export default TextArea;