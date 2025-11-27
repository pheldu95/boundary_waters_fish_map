import './App.css'
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import CaughtFishTable from './features/CaughtFish/CaughtFishTable';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-brownt text-center">
      <NavBar />
      <CaughtFishTable />
      <Footer />
    </div>
  )
}

export default App
