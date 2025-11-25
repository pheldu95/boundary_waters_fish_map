import { useEffect, useState } from 'react'
import './App.css'
import type { FishSpecies } from './lib/types';
import NavBar from './components/NavBar';
import DeleteButton from './components/buttons/DeleteButton';

function App() {
  const [fishSpecies, setFishSpecies] = useState<FishSpecies[]>([]);

  useEffect(() => {
    fetch('/api/fish_species')
      .then(response => response.json())
      .then(data => setFishSpecies(data.member))
      .catch(error => console.error('Error fetching fish species:', error));
  }, []);

  return (
    <>
      <NavBar />
      <h1 className="text-3xl font-bold text-blue-600 bg-yellow-200 p-4 rounded-lg">Boundary Waters Fish Map</h1>
      <ul>
        {fishSpecies.map((species) => (
          <li key={species.id}>
            {species.name}
            <div className='max-w-small'>
              <DeleteButton/>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
