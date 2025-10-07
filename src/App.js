import './App.css';
import { SunIcon, MoonIcon, PlusIcon } from '@primer/octicons-react';

import { useEffect, useState } from 'react';

// components
import Card from './components/Card';
import Calendar from './components/Calendar';
import Alert from './components/Alert'
import Popup from './components/Popup';
import DateTimePicker from './components/Input/DateTime';
import TextArea from './components/Input/TextArea';
import Input from './components/Input/Input';

// TODO: data source/handling
import data from './data'

function App() {
  const [mode, setMode] = useState('light')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [displayData, setDisplayData] = useState(data)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [note, setNote] = useState({
    'title': '',
    'content': '',
    'date': (selectedDate ?? new Date()).toLocaleDateString('en-US'),
    'time': (selectedDate ?? new Date()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  })

  useEffect(() => {
    const _mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setMode(_mode)
    if (_mode) {
      document.documentElement.classList.add('dark')
    }
    // sort data
    dataUpdated()
  }, [])

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])


  useEffect(() => {
    setNote({
      ...note,
      date: (selectedDate ?? new Date()).toLocaleDateString('en-US'),
      time: (new Date()).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    })

    dataUpdated()
  }, [selectedDate])

  useEffect(() => {
    localStorage.setItem('journal-data', JSON.stringify(data.data))
  }, [displayData])

  function dataUpdated () {

    if (!selectedDate) {
      setDisplayData({
        data: data.data.sort((a, b) => new Date(b.date) - new Date(a.date))
      })
      return
    }
    setDisplayData({
      data: data.data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(d => new Date(d.date).toDateString() === selectedDate?.toDateString())
    })
  }

  return (
    <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white h-full p-10">
      {/* components */}
      <Popup
        show={showPopup}
        callback={(type) => {
          if (type === 'confirm') {
            console.log(note, 'before add note')
            data.updateData(note.date, note.title, note.content, note.time)
          }

          setDisplayData({
            data: data.data
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .filter(d => new Date(d.date).toDateString() === selectedDate.toDateString())
          })
          // type confirm, or close
          setShowPopup(!showPopup)
        }}
        buttons={[
          { text: 'Add', type: 'confirm'},
          { text: 'Cancel', type: 'close'}
        ]}
        content={
          <>
            <DateTimePicker
              value={selectedDate}
              callback={(date) => {
                console.log(date)
                setNote({
                  ...note,
                  date: date.toLocaleDateString('en-US'),
                  time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                })
              }}
            />
            <Input placeholder="Title" callback={(e) => {
              setNote({
                ...note,
                title: e
              })
            }}/>
            <TextArea placeholder="Write your note here..." callback={(e) => {
              console.log(e)
              setNote({
                ...note,
                content: e
              })
            }} />
          </>
        }
      />
      <Alert
        message={alertMessage}
        type="confirmation"
        show={showAlert}
        callback={(type) => {
          if (type === 'confirm') {
            data.deleteNote(displayData.data[0]?.date)
            dataUpdated();
          }
          setShowAlert(false)
        }}
      />

      <button className="absolute top-4 right-4 z-11" onClick={() => {
        setMode(mode === 'dark' ? 'light' : 'dark')
      }}>
        {mode === 'dark' ? <SunIcon/> : <MoonIcon/>}
      </button>

      <div className="text-center text-3xl font-bold py-5 pb-10">
        Journal
      </div>

      <div className="grid grid-rows-[40%_1fr] md:grid-rows-1 md:grid-cols-[55%_1fr] gap-10 h-3/4 overflow-auto md:overflow-hidden">
        <Calendar
          active={selectedDate}
          data={data.data.map(d => {
            return { date: d.date}
          })}
          callback={(d) => {
            const _data = data.data.filter(_d => new Date(_d.date).toDateString() === d.date.toDateString())
            console.log(d, _data)
            setSelectedDate(d.date)
          }}
        />

        <div className="md:max-h-full md:overflow-y-auto px-4">
          <div className="header flex justify-between items-center pr-2 mb-4">
            <div>
              <span className="text-lg font-bold mr-2">Notes</span>
              <button className="bg-neutral-200 mr-2 dark:bg-neutral-800 text-xs font-bold uppercase px-2 py-1"
                onClick={(() => setSelectedDate(null) )}
              >All</button>
              <button className="bg-neutral-200 mr-2 dark:bg-neutral-800 text-xs font-bold uppercase px-2 py-1"
                onClick={(() => setSelectedDate(new Date()) )}
              >Today</button>
            </div>
            <button className="" onClick={() => setShowPopup(true)}><PlusIcon size={12}/></button>
          </div>

          { !displayData.data.length && <p className="text-sm text-neutral-500 dark:text-neutral-400">No notes for this date. Click on a date with a star to see notes, or click on any date to add a new note.</p> }
          
          { displayData.data.map((d, i) =>
            <Card
              key={i}
              title={d.title}
              content={
                d.content || d.items?.map((item, _i) => <div key={_i}>
                  <div className="border-b border-neutral-300 dark:border-neutral-700 mb-2 pb-2">
                    <span className="font-bold text-[10px]">{item.time}</span>
                    <p>{item.content}</p>
                  </div>
                </div>)
              }
              date={d.date}
              callback={(type) => {
                if (type === 'delete') {
                  setShowAlert(true)
                  setAlertMessage('Are you sure you want to delete this note?')
                }
            }}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
