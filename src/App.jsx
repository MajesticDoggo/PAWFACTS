import { useState, useEffect } from "react";
import "./App.css";
import { playBark, handlePetCount, handleReset } from "../buttons.jsx";

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
  const [breedCount, setBreedCount] = useState(0);
  const [currentBreed, setCurrentBreed] = useState(0);
  const [breeds, setBreeds] = useState([]);
  const [loadedBreeds, setloadedBreeds] = useState([]);
  const [breedImage, setBreedImage] = useState([null]); 
  const [imageLoading, setImageLoading] = useState(true);
  
 

 
  
  //Next breed button
  function handleNextBreed() {
    const randomBreed = getRandomBreed(loadedBreeds);
    setCurrentBreed(randomBreed);
    setBreedCount(breedCount => breedCount + 1);
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
            handlePetCount(setCount);
            playBark();
          }}>
            Pet Dog
          </button>
          <button onClick={()=> handleReset(setCount, setBreedCount)}> Reset Stats</button>
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

