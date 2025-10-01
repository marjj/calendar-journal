import './App.css';
import { SunIcon, MoonIcon } from '@primer/octicons-react';

import { useEffect, useState } from 'react';

// components
import Card from './components/Card';
import Calendar from './components/Calendar';

// TODO: data source/handling
import data from './data'

function App() {
  const [mode, setMode] = useState('light')

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
      <button className="absolute top-4 right-4" onClick={() => {
        setMode(mode === 'dark' ? 'light' : 'dark')
      }}>
        {mode === 'dark' ? <SunIcon/> : <MoonIcon/>}
      </button>
      <div className="text-center text-3xl font-bold py-5 pb-10">
        Journal
      </div>
      <div className="grid grid-rows-[40%_1fr] md:grid-rows-1 md:grid-cols-[2fr_1fr] gap-10 h-3/4 overflow-auto md:overflow-hidden">
        <Calendar/>
        <div className="md:max-h-full md:overflow-y-scroll">
          <h2 className="text-lg font-bold mb-4">Notes</h2>
          { data.data.map((d, i) => <Card key={i} title={d.title} content={d.content} date={d.date} />) }
        </div>
      </div>
    </div>
  );
}

export default App;
