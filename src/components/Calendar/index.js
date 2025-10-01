import { useEffect, useState } from 'react';

function Calendar () {
  const [current, setCurrent] = useState(new Date());
  const [dates, setDates] = useState([])
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  useEffect(() => {
  }, []);

  useEffect(() => {
    const _calendar = new Array(35).fill({}).map((_, i) => {
      const date = new Date(current.getFullYear(), current.getMonth(), i - (current.getDay()) + 1)
      return {
        date,
        day: date.getDay(),
        month: date.getMonth() + 1,
        key: `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,
      }
    })

    setDates(_calendar)
  }, [current])

  return <div className="grid grid-rows-[auto_1fr] gap-4">
    <div className="">
      <h2 className="text-xl font-bold">{months[current.getMonth()]}</h2>
      {/* <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1))}> prev </button> */}
      {/* <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1))}> next </button> */}
    </div>
    <div className="grid grid-rows-[auto_1fr]">
      <div className="h-10 md:h-20 grid grid-cols-7 border border-neutral-200 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
        { weekDays.map(d => <div key={d} className="font-bold flex items-center justify-center">{d}</div>) }
      </div>
      <div className="h-auto grid grid-cols-7 border border-neutral-200 dark:border-neutral-700">
        {
          dates.map(((d, i) => (
            <div key={`${d.key}`} className={`flex items-center justify-center cursor-pointer hover:bg-blue-200 ${d.day === 0 ? 'text-red-400' : ''} ${d.month !== (current.getMonth() + 1) ? 'text-neutral-400 dark:text-neutral-500' : ''} ${d.date?.toDateString() === new Date().toDateString() ? 'bg-blue-500 text-white hover:bg-blue-600' : ''} h-full`}>
              {d.date.getDate()}
            </div>
          )))
        }
      </div>
    </div>
  </div>
}

export default Calendar;