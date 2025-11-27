import './App.css'
import NavBar from './components/NavBar';
import CaughtFishTable from './features/CaughtFish/CaughtFishTable';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-brownt text-center">
      <NavBar />
      <CaughtFishTable />
    </div>
  )
}

export default App
