import barkSound from './src/assets/bark.mp3';



//Play bark
  export function playBark() {
    const audio = new Audio(barkSound);
    audio.volume = 0.2;
    audio.play();

    audio.play().catch(error => {
        console.error("Bark sound has failed")
    })
  }

//Adds 1 when pet is clicked
   export async function handlePetCount(setCount) {
    setCount(prevCount => prevCount + 1);
  }

//Reset stats
    export async function handleReset(setCount, setBreedCount) {

      setCount(count => 0);
      setBreedCount(breedCount => 0);
    }