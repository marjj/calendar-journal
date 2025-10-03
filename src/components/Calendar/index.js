import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, NorthStarIcon } from '@primer/octicons-react'

function Calendar ({ data, active, callback }) {
  const d = new Date()
  const [current, setCurrent] = useState(new Date(d.getFullYear(), d.getMonth()));
  const [dates, setDates] = useState([])
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  useEffect(() => {
    const _calendar = new Array(35).fill({}).map((_, i) => {
      const dayOffset = i - (current.getDay()) + 1
      const date = new Date(current.getFullYear(), current.getMonth(), dayOffset)
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
    <div className="flex items-center justify-between">
      <div className="w-1/2 text-xl font-bold">
        {months[current.getMonth()]}
      </div>
      <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1))}> <ChevronLeftIcon/> </button>
      <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1))}> <ChevronRightIcon/> </button>
    </div>
    <div className="grid grid-rows-[auto_1fr]">
      <div className="h-auto py-2 grid grid-cols-7 border border-neutral-200 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
        { weekDays.map(d => <div key={d} className="font-bold flex items-center justify-center">{d}</div>) }
      </div>
      <div className="h-auto grid grid-cols-7 border border-neutral-200 dark:border-neutral-700">
        {
          dates.map((d, i) => {
            const activeClass = d.date?.toDateString() === new Date().toDateString() ? 'bg-neutral-200 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600' : ''
            const sundayClass = d.day === 0 ? 'text-red-400' : ''
            const inactiveMonthClass = d.month !== (current.getMonth() + 1) ? 'text-neutral-400 dark:text-neutral-500' : ''
            const isActive = active ? (d.date?.toDateString() === new Date(active).toDateString()) : false
            const activeSelectedClass = isActive ? 'bg-neutral-400 text-white dark:bg-neutral-400 dark:text-white' : ''
            return (
              <div key={`${d.key}`} onClick={() => callback(d) } className={`relative flex items-center justify-center cursor-pointer hover:bg-neutral-400 hover:text-gray-100 dark:hover:bg-neutral-100 dark:hover:text-gray-500 h-full ${sundayClass} ${inactiveMonthClass} ${activeClass} ${activeSelectedClass}`}>
                {d.date.getDate()}

                { data.find(n =>
                  new Date(n.date).toDateString() === d.date.toDateString()
                ) && <span className="absolute bottom-2 text-cyan-400"> <NorthStarIcon size={12}/> </span> }
              </div>
            )
          })
        }
      </div>
    </div>
  </div>
}

export default Calendar;