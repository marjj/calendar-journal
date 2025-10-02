import './App.css';
import { SunIcon, MoonIcon } from '@primer/octicons-react';

import { useEffect, useState } from 'react';

// components
import Card from './components/Card';
import Calendar from './components/Calendar';
import Alert from './components/Alert'

// TODO: data source/handling
import data from './data'

function App() {
  const [mode, setMode] = useState('light')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    const _mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setMode(_mode)
    if (_mode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  return (
    <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white h-full p-10">
      <button className="absolute top-4 right-4 z-11" onClick={() => {
        setMode(mode === 'dark' ? 'light' : 'dark')
      }}>
        {mode === 'dark' ? <SunIcon/> : <MoonIcon/>}
      </button>
      <Alert message={alertMessage} type="confirmation" show={showAlert} callback={(type) => { setShowAlert(false) }}/>
      <div className="text-center text-3xl font-bold py-5 pb-10">
        Journal
      </div>
      <div className="grid grid-rows-[40%_1fr] md:grid-rows-1 md:grid-cols-[55%_1fr] gap-10 h-3/4 overflow-auto md:overflow-hidden">
        <Calendar data={data.data.map(d => {
          return { date: d.date}
        })}/>
        <div className="md:max-h-full md:overflow-y-scroll">
          <h2 className="text-lg font-bold mb-4">Notes</h2>
          { data.data.map((d, i) =>
            <Card key={i} title={d.title} content={d.content} date={d.date} callback={(type) => {
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
