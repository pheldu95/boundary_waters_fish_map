import { useEffect, useState } from 'react'
import './App.css'
import type { FishSpecies } from './lib/types';

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
      <h1>Boundary Waters Fish Map</h1>
      <ul>
        {fishSpecies.map((species) => (
          <li key={species.id}>{species.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
