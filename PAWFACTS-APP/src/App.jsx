import { useState, useEffect } from "react";
import "./App.css";
import barkSound from "./assets/bark.mp3";

import {
    initialize,
    getRandomBreed,
    saveBreeds,
} from "./info.js";

import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

function App() {
  const [count, setCount] = useState(0)
  const [breedCount, setBreedCount] = useState(0);
  const [currentBreed, setCurrentBreed] = useState(0);
  const [breeds, setBreeds] = useState([]);
  const [loadedBreeds, setloadedBreeds] = useState([]);
  

   async function handlePetCount() {
    
    setCount(count => count + 1);
  }

  async function handleReset() {
    
    setCount(count => 0);
    setBreedCount(breedCount => 0);
  }
  
  function handleNextBreed() {
    const randomBreed = getRandomBreed(loadedBreeds);
    setCurrentBreed(randomBreed);
    setBreedCount(breedCount => breedCount + 1);
  }

  function playBark() {
    const audio = new Audio(barkSound);
    audio.volume = 0.2;
    audio.play();
  }


  useEffect(() => {
    async function initializeApp() {
        const breedsData = await initialize();

        setloadedBreeds(breedsData);

        const randomBreed = getRandomBreed(breedsData);

        setCurrentBreed(randomBreed);
    }

    initializeApp();
  }, []);

  return (
    <>
      <section id="center">
        <div>
          <h1>Your Breed</h1>
          <h1>{currentBreed?.name ?? "Loading breed..."}</h1>
        </div>

        <div className='Fact'>{currentBreed?.description ?? "..."}</div>
        <div className="Counters">
          <p> Pet Count: {count} </p>
          <p> Amount of Breeds Seen: {breedCount} </p>
        </div>
        
        <p>ID: {currentBreed.id?? ''}</p>

        <div className="button-container">
          <button onClick={() => { 
            handlePetCount();
            playBark();
          }}>
            Pet Dog
          </button>
          <button onClick={handleReset}> Reset Stats</button>
          <button
            onClick={handleNextBreed}
            disabled={loadedBreeds.length === 0}
          >
          Next Breed
        </button>
        </div>
      </section>  
    </>
  )
}

export default App
