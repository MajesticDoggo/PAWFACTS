import { useState, useEffect } from "react";
import "./App.css";
import barkSound from "./assets/bark.mp3";

import {
    initialize,
    getRandomBreed,
    saveBreeds,
    getBreedImage
} from "./info.js";

import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

function App() {
  const [count, setCount] = useState(0)
  const [breedCount, setBreedCount] = useState(null);
  const [currentBreed, setCurrentBreed] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [loadedBreeds, setloadedBreeds] = useState([]);
  const [breedImage, setBreedImage] = useState([null]); 
  const [imageLoading, setImageLoading] = useState(true);
  
  //Adds 1 when pet is clicked
   async function handlePetCount() {
    
    setCount(count => count + 1);
  }

  //Reset stats
  async function handleReset() {
    
    setCount(count => 0);
    setBreedCount(breedCount => 0);
  }
  
  //Next breed button
  function handleNextBreed() {
    const randomBreed = getRandomBreed(loadedBreeds);
    setCurrentBreed(randomBreed);
    setBreedCount(breedCount => breedCount + 1);
  }

  //Play bark
  function playBark() {
    const audio = new Audio(barkSound);
    audio.volume = 0.2;
    audio.play();
  }


  //Get the breeds then grabs a random one from the data and sets to use for display
  useEffect(() => {
    async function initializeApp() {
        const breedsData = await initialize();

        setloadedBreeds(breedsData);

        const randomBreed = getRandomBreed(breedsData);

        setCurrentBreed(randomBreed);
      }

    initializeApp();
  }, []);

  useEffect(() => {
    async function fetchImage() {
        if (!currentBreed) return;

        setImageLoading(true);
        setBreedImage(null);

        try {
            const image = await getBreedImage(currentBreed.id);
            setBreedImage(image);
        } catch (error) {
            console.error("Error fetching image:", error);
            setBreedImage(null);
        } finally {
            setImageLoading(false);
        }
    }

    fetchImage();
}, [currentBreed]);

  return (
    <>
      <section id="center">
        {/* A loading section for the user */}
        <div>
          <h1>Your Breed</h1>
          <h1>{currentBreed?.name ?? "Loading breed..."}</h1>
        </div>

        {/* Image */}
        <div>
           {imageLoading ? (
            <p>Loading image...</p>
            ) : breedImage ? (
              <img src={breedImage} alt="Dog breed" />
            ) : (
              <p>No image available for this breed.</p>
            )}

        </div>
        
        {/* Description */}
        <div className='Fact'>{currentBreed?.description ?? "..."}</div>
        <div className="Counters">
          <p> Pet Count: {count} </p>
          <p> Amount of Breeds Seen: {breedCount} </p>
        </div>
        
        {/* DOG ID */}
        <p>ID: {currentBreed?.id ?? ''}</p>
        
        {/* PET, RESET, NEXT Buttons */}
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

