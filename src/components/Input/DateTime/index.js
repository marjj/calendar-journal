function DateTimePicker({ value, callback }) {
  const currTime = `${(new Date()).getHours()}:${(new Date()).getMinutes() < 10 ? `0${(new Date()).getMinutes()}` : (new Date()).getMinutes()}`
  const month = (value.getMonth() + 1) < 10 ? `0${(value.getMonth() + 1)}` : (value.getMonth() + 1)
  const day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()

  const val = (`${value.getFullYear()}-${month}-${day} ${currTime}`)

  return (
    <div className="bg-neutral-200 dark:bg-neutral-700 text-xs mb-4 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 max-w-64 w-auto">
      <input
        type="datetime-local"
        className="w-full p-2 focus:outline-none bg-transparent focus:border-neutral-500 dark:focus:border-neutral-100"
        defaultValue={val}
        onChange={(e) => {
          callback(new Date(e.target.value))
        }}
      />
    </div>
  )
}
export default DateTimePicker;