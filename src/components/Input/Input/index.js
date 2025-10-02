function Input ({ placeholder}) {
  const focusClass = 'focus:outline-none focus:border focus:!border-black focus:dark:!border-white'

  return (
    <input type="text" placeholder={placeholder} className={`w-full p-2 mb-4 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 ${focusClass}`}/>
  )
}
export default Input;