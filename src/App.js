import './App.css';

import Card from './components/Card';
import Calendar from './components/Calendar';

import data from './data'

function App() {
  return (
    <div className="app-container grid grid-rows-[40%_1fr] md:grid-rows-1 md:grid-cols-[2fr_1fr] gap-4 p-4 h-[100vh] overflow-auto md:overflow-hidden">
      <Calendar />
      <div className="md:max-h-full md:overflow-y-scroll">
        <h2 className="text-lg font-bold mb-4">Notes</h2>
        { data.data.map((d, i) => <Card key={i} title={d.title} content={d.content} />) }
      </div>
    </div>
  );
}

export default App;
