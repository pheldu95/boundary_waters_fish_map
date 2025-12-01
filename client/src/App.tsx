import './App.css'
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import CaughtFishTable from './features/CaughtFish/CaughtFishTable';
import MapPage from './features/Map/MapPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-brownt text-center">
      <NavBar />
      <MapPage />
      <CaughtFishTable />
      <Footer />
    </div>
  )
}

export default App
