import './App.css'
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import CaughtFishTable from './features/CaughtFish/CaughtFishTable';
import Map from './features/Map/MapComponent';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-brownt text-center">
      <NavBar />
      <Map />
      <CaughtFishTable />
      <Footer />
    </div>
  )
}

export default App
